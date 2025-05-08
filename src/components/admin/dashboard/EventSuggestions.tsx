
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";

export const EventSuggestions = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Users size={20} className="mr-2 text-blue-600" />
        Recent Team Activity
      </h2>
      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Users size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Sarah assigned 3 new inquiries to team members</p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Calendar size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium">James responded to Tech Corporation inquiry</p>
            <p className="text-xs text-gray-500">5 hours ago</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Calendar size={16} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Emma created a proposal for Healthcare Systems</p>
            <p className="text-xs text-gray-500">Yesterday</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            <Calendar size={16} className="text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Michael scheduled a demo with Finance Group</p>
            <p className="text-xs text-gray-500">2 days ago</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
            <Calendar size={16} className="text-teal-600" />
          </div>
          <div>
            <p className="text-sm font-medium">System update completed successfully</p>
            <p className="text-xs text-gray-500">3 days ago</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button variant="outline" className="w-full">View All Activity</Button>
      </div>
    </div>
  );
};
