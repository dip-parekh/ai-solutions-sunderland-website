
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  published_at: string;
  image_url?: string;
}

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setArticles(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching articles",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-4">News & Articles</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Stay up to date with the latest trends, insights, and announcements from AI-Solutions.
          Discover how artificial intelligence is transforming businesses across industries.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main feature article */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {articles[0].image_url ? (
                  <img 
                    src={articles[0].image_url} 
                    alt={articles[0].title} 
                    className="w-full h-80 object-cover" 
                  />
                ) : (
                  <div className="w-full h-80 bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-4xl font-bold">AI-Solutions</span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded">{articles[0].category}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(articles[0].published_at).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>By {articles[0].author}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">{articles[0].title}</h2>
                  <p className="text-gray-600 mb-4">{articles[0].excerpt}</p>
                  
                  <button className="text-blue-600 font-medium hover:underline">
                    Read More
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sidebar articles */}
            <div className="space-y-6">
              {articles.slice(1, 4).map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row lg:flex-col">
                  <div className="sm:w-1/3 lg:w-full h-48">
                    {article.image_url ? (
                      <img 
                        src={article.image_url} 
                        alt={article.title} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-2xl font-bold">{article.title.substring(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 sm:w-2/3 lg:w-full">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium py-0.5 px-1.5 rounded">{article.category}</span>
                      <span className="mx-1">•</span>
                      <span>{new Date(article.published_at).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="font-bold mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{article.excerpt}</p>
                    
                    <button className="text-blue-600 text-sm font-medium hover:underline">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* More articles */}
            {articles.length > 4 && (
              <div className="lg:col-span-3 mt-8">
                <h2 className="text-2xl font-bold mb-6">More Articles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.slice(4).map((article) => (
                    <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-48">
                        {article.image_url ? (
                          <img 
                            src={article.image_url} 
                            alt={article.title} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 text-2xl font-bold">{article.title.substring(0, 2).toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium py-0.5 px-1.5 rounded">{article.category}</span>
                          <span className="mx-1">•</span>
                          <span>{new Date(article.published_at).toLocaleDateString()}</span>
                        </div>
                        
                        <h3 className="font-bold mb-2">{article.title}</h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{article.excerpt}</p>
                        
                        <button className="text-blue-600 text-sm font-medium hover:underline">
                          Read More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No articles available yet</h3>
            <p className="text-gray-600">Check back soon for our latest articles and news!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default News;
