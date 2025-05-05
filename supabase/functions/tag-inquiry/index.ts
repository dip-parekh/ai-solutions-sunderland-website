
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.10.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// These would be replaced with your Supabase URL and anon key in the environment
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

interface InquiryData {
  id: number;
  name: string;
  email: string;
  company?: string;
  jobTitle?: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { inquiry } = await req.json();
    
    if (!inquiry) {
      throw new Error("Inquiry data is required");
    }

    // Type check the inquiry
    const typedInquiry = inquiry as InquiryData;
    
    // Very simple tag detection algorithm
    // In a real implementation, you might use a more sophisticated NLP approach
    const tags: string[] = [];
    const message = typedInquiry.message.toLowerCase();
    
    // Category detection
    if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('pricing') || message.includes('purchase')) {
      tags.push('sales');
    }
    
    if (message.includes('help') || message.includes('issue') || message.includes('problem') || message.includes('error') || message.includes('fix')) {
      tags.push('support');
    }
    
    if (message.includes('partner') || message.includes('collaboration') || message.includes('work together') || message.includes('partnership')) {
      tags.push('partnership');
    }
    
    if (message.includes('feature') || message.includes('suggestion') || message.includes('feedback') || message.includes('improve')) {
      tags.push('feedback');
    }
    
    // Urgency detection
    if (message.includes('urgent') || message.includes('asap') || message.includes('emergency') || message.includes('immediately')) {
      tags.push('urgent');
    }
    
    // Sentiment analysis (very basic)
    // Count positive and negative words
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'best', 'love', 'appreciate', 'thanks', 'thank you', 'positive', 'happy', 'pleased'];
    const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'disappointed', 'negative', 'unhappy', 'problem', 'issue', 'error', 'broken', 'fail'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (message.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (message.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) {
      tags.push('positive');
    } else if (negativeCount > positiveCount) {
      tags.push('negative');
    } else {
      tags.push('neutral');
    }
    
    // Insert tags into database
    // In a real implementation, you'd first get the tag IDs from the database
    // For this demo, we'll just return the tags
    
    return new Response(JSON.stringify({
      success: true,
      inquiry_id: typedInquiry.id,
      tags,
      message: `Inquiry tagged with: ${tags.join(', ')}`
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('Error in tag-inquiry function:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
});
