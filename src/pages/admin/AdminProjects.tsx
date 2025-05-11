
import React from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Project } from '@/types/database';
import { Card } from '@/components/ui/card';

const AdminProjects: React.FC = () => {
  const { items: projects, isLoading } = useAdminContent<Project>('projects');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <Card className="p-6">
        <p className="text-center text-gray-500">
          Projects management coming soon. Currently {projects.length} projects in the database.
        </p>
      </Card>
    </div>
  );
};

export default AdminProjects;
