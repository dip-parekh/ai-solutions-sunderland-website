
import { MessageSquare, FileText, Calendar, Star } from "lucide-react";
import { Inquiry } from "@/types/database";

interface AdminStatisticsProps {
  inquiries: Inquiry[];
}

export const AdminStatistics = ({ inquiries }: AdminStatisticsProps) => {
  const stats = [
    { 
      label: 'Total Inquiries', 
      value: inquiries.length.toString(), 
      icon: MessageSquare, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      label: 'Active Projects', 
      value: '8', 
      icon: FileText, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      label: 'Upcoming Events', 
      value: '3', 
      icon: Calendar, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      label: 'Average Rating', 
      value: '4.9', 
      icon: Star, 
      color: 'bg-amber-100 text-amber-600' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-full`}>
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
