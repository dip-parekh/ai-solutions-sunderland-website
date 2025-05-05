
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  published_at: string | null;
  is_published: boolean;
  image_url?: string;
  created_at: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
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
        .order('created_at', { ascending: false });
        
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

  const filteredArticles = articles.filter(article => {
    // Text search
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category?.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Status filter
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'published' && article.is_published) || 
      (filter === 'draft' && !article.is_published);
      
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout title="Articles">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Articles</h1>
          <Button asChild>
            <Link to="/admin/articles/new">
              <Plus className="h-4 w-4 mr-2" />
              Write New Article
            </Link>
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'published' ? 'default' : 'outline'}
                onClick={() => setFilter('published')}
              >
                Published
              </Button>
              <Button 
                variant={filter === 'draft' ? 'default' : 'outline'}
                onClick={() => setFilter('draft')}
              >
                Drafts
              </Button>
            </div>
          </div>
        </div>

        {/* Articles List */}
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {article.image_url && (
                      <div className="md:w-1/4">
                        <img 
                          src={article.image_url} 
                          alt={article.title} 
                          className="h-48 w-full rounded-md object-cover"
                        />
                      </div>
                    )}
                    <div className={article.image_url ? 'md:w-3/4' : 'w-full'}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{article.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          article.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <span>{article.category || 'Uncategorized'}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {article.published_at 
                            ? new Date(article.published_at).toLocaleDateString() 
                            : new Date(article.created_at).toLocaleDateString() + ' (Draft)'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt || 'No excerpt available.'}</p>
                      
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                        >
                          <Link to={`/admin/articles/edit/${article.id}`}>
                            Edit
                          </Link>
                        </Button>
                        <Button 
                          variant={article.is_published ? 'outline' : 'default'} 
                          size="sm"
                        >
                          {article.is_published ? 'Unpublish' : 'Publish'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No articles found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filter !== 'all' ? 'Try adjusting your search or filters' : 'Get started by writing your first article'}
            </p>
            {!searchTerm && filter === 'all' && (
              <Button asChild>
                <Link to="/admin/articles/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Write New Article
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Articles;
