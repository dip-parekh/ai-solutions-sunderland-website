
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ContentTable } from '@/components/admin/ContentTable';
import { ContentForm, FormField } from '@/components/admin/ContentForm';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Project } from '@/types/database';
import { Badge } from '@/components/ui/badge';

const ProjectsAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  
  const { 
    items: projects, 
    isLoading, 
    fetchItems, 
    createItem, 
    updateItem, 
    deleteItem,
    toggleFeatured
  } = useAdminContent<Project>('projects');

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenForm = (project?: Project) => {
    setEditingProject(project || { is_featured: false });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleChange = (name: string, value: any) => {
    setEditingProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingProject?.id) {
        await updateItem(editingProject.id, editingProject);
      } else {
        await createItem(editingProject as Partial<Project>);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
  };

  const formFields: FormField[] = [
    { name: 'title', label: 'Project Title', type: 'text', required: true },
    { name: 'client_name', label: 'Client Name', type: 'text' },
    { name: 'industry', label: 'Industry', type: 'text', required: true },
    { name: 'description', label: 'Overview', type: 'textarea', required: true },
    { name: 'challenge', label: 'Challenge', type: 'textarea' },
    { name: 'solution', label: 'Solution', type: 'textarea' },
    { name: 'results', label: 'Results', type: 'textarea' },
    { name: 'image_url', label: 'Project Image', type: 'image' },
    { name: 'is_featured', label: 'Featured Project', type: 'switch' },
  ];

  const headers = ['Title', 'Client', 'Industry', 'Featured'];

  const getRowContent = (project: Project) => [
    <div className="font-medium">{project.title}</div>,
    project.client_name || '-',
    project.industry,
    project.is_featured ? 
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Featured</Badge> : 
      '-'
  ];

  return (
    <AdminLayout title="Projects">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      
      <ContentTable
        items={projects}
        isLoading={isLoading}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
        onToggleFeatured={toggleFeatured}
        getRowContent={getRowContent}
        headers={headers}
        emptyMessage="No projects found. Add your first project to get started!"
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-3xl">
          <ContentForm
            title={editingProject?.id ? "Edit Project" : "Add New Project"}
            fields={formFields}
            values={editingProject || {}}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitLabel={editingProject?.id ? "Update" : "Create"}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ProjectsAdmin;
