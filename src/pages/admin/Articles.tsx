
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ContentTable } from '@/components/admin/ContentTable';
import { ContentForm, FormField } from '@/components/admin/ContentForm';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Article } from '@/types/database';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const ArticlesAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  
  const { 
    items: articles, 
    isLoading, 
    fetchItems, 
    createItem, 
    updateItem, 
    deleteItem
  } = useAdminContent<Article>('articles');

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenForm = (article?: Article) => {
    setEditingArticle(article || { 
      is_published: false,
      published_at: new Date().toISOString(),
      tags: []
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingArticle(null);
  };

  const handleChange = (name: string, value: any) => {
    setEditingArticle(prev => {
      if (name === 'is_published' && value === true && !prev?.published_at) {
        return { ...prev, [name]: value, published_at: new Date().toISOString() };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingArticle?.id) {
        await updateItem(editingArticle.id, editingArticle);
      } else {
        await createItem(editingArticle as Partial<Article>);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
  };

  const formFields: FormField[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'author', label: 'Author', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
    { name: 'content', label: 'Content', type: 'textarea', required: true },
    { name: 'image_url', label: 'Featured Image', type: 'image' },
    { name: 'is_published', label: 'Published', type: 'switch' },
    { name: 'published_at', label: 'Publish Date', type: 'date' }
  ];

  const headers = ['Title', 'Author', 'Category', 'Published', 'Date'];

  const getRowContent = (article: Article) => [
    <div className="font-medium">{article.title}</div>,
    article.author,
    article.category || '-',
    article.is_published ? 
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Published</Badge> : 
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Draft</Badge>,
    article.published_at ? format(new Date(article.published_at), 'MMM d, yyyy') : '-'
  ];

  return (
    <AdminLayout title="Articles">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Articles & News</h1>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" /> Add Article
        </Button>
      </div>
      
      <ContentTable
        items={articles}
        isLoading={isLoading}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
        getRowContent={getRowContent}
        headers={headers}
        emptyMessage="No articles found. Add your first article to get started!"
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-4xl">
          <ContentForm
            title={editingArticle?.id ? "Edit Article" : "Add New Article"}
            fields={formFields}
            values={editingArticle || {}}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitLabel={editingArticle?.id ? "Update" : "Create"}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ArticlesAdmin;
