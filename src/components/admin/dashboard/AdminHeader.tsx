
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdminHeaderProps {
  handleLogout?: () => void;
  title?: string;
}

export const AdminHeader = ({ handleLogout, title = "AI-Solutions Admin" }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const defaultLogout = async () => {
    // Store auth state for restoring after page refreshes
    sessionStorage.removeItem('adminAuthenticated');
    
    // Sign out from Supabase Auth if authenticated
    await supabase.auth.signOut();
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/admin');
  };

  const onLogout = handleLogout || defaultLogout;

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <Button variant="outline" onClick={onLogout} className="flex items-center">
          <LogOut size={16} className="mr-2" /> Sign Out
        </Button>
      </div>
    </header>
  );
};
