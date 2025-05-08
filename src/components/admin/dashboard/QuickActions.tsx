
import { Link } from "react-router-dom";
import { Calendar, FileText, FolderOpen, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const QuickActions = () => {
  const actions = [
    {
      title: 'Add Project',
      icon: FolderOpen,
      path: '/admin/projects/new',
      primary: true
    },
    {
      title: 'New Testimonial',
      icon: Star,
      path: '/admin/testimonials/new',
      primary: false
    },
    {
      title: 'Write Article',
      icon: FileText,
      path: '/admin/articles/new',
      primary: false
    },
    {
      title: 'Create Event',
      icon: Calendar,
      path: '/admin/events/new',
      primary: false
    },
    {
      title: 'View Inquiries',
      icon: MessageSquare,
      path: '/admin/inquiries',
      primary: false
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((action, index) => (
          <Button 
            key={index}
            asChild 
            className="h-auto py-6 flex flex-col"
            variant={action.primary ? "default" : "outline"}
          >
            <Link to={action.path}>
              <action.icon className="h-6 w-6 mb-2" />
              <span>{action.title}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
