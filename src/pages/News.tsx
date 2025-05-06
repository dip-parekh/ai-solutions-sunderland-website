
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Article } from '@/types/database';
import { Calendar, User, Tag } from 'lucide-react';

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
        <h1 className="text-4xl font-bold text-center mb-12">News & Articles</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  {article.image_url ? (
                    <img 
                      src={article.image_url} 
                      alt={article.title} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                      <span className="text-blue-600 text-4xl font-bold">{article.title.substring(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  {article.category && (
                    <div className="text-sm text-blue-600 mb-2">{article.category}</div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt || article.content.substring(0, 150) + '...'}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.published_at ? format(new Date(article.published_at), 'MMM d, yyyy') : 'Draft'}
                    </div>
                  </div>
                  
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <button className="text-blue-600 font-medium hover:underline">
                    Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No articles published yet</h3>
            <p className="text-gray-600">Check back soon for our latest news!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default News;
