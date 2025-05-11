
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { 
  LayoutDashboard, 
  Calendar, 
  FolderKanban, 
  MessageSquare, 
  Users, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminSidebar: React.FC = () => {
  const { signOut } = useAdminAuth();

  const navItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard className="mr-2 h-5 w-5" />, label: 'Dashboard' },
    { to: '/admin/events', icon: <Calendar className="mr-2 h-5 w-5" />, label: 'Events' },
    { to: '/admin/projects', icon: <FolderKanban className="mr-2 h-5 w-5" />, label: 'Projects' },
    { to: '/admin/testimonials', icon: <Users className="mr-2 h-5 w-5" />, label: 'Testimonials' },
    { to: '/admin/inquiries', icon: <MessageSquare className="mr-2 h-5 w-5" />, label: 'Inquiries' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col h-screen">
      <div className="mb-8 p-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink 
                to={item.to} 
                className={({ isActive }) => 
                  `flex items-center rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-primary' : 'text-gray-700 dark:text-gray-200'}`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-700 dark:text-gray-200" 
          onClick={signOut}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
