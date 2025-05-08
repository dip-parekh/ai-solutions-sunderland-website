
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AdminHeaderProps {
  handleLogout: () => void;
}

export const AdminHeader = ({ handleLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">AI-Solutions Admin</h1>
        <Button variant="outline" onClick={handleLogout} className="flex items-center">
          <LogOut size={16} className="mr-2" /> Sign Out
        </Button>
      </div>
    </header>
  );
};
