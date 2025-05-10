
import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, BarChart, MessageSquare, Image, FileText, Calendar, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminHeaderProps {
  title?: string;
  handleLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title = "Dashboard", handleLogout }) => {
  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
    { name: 'Projects', href: '/admin/projects', icon: Package },
    { name: 'Testimonials', href: '/admin/testimonials', icon: User },
    { name: 'Articles', href: '/admin/articles', icon: FileText },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Gallery', href: '/admin/gallery', icon: Image },
  ];

  const currentPath = window.location.pathname;

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/admin/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-blue-600">Admin Panel</span>
        </Link>

        <nav className="hidden md:flex space-x-4">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <IconComponent className="h-4 w-4 mr-1" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
