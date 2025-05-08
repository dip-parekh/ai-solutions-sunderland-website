
import { Calendar, FileText, MessageSquare, Settings, Users } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    { 
      title: 'New project added', 
      desc: 'AI Customer Service Portal project was created', 
      time: '2 hours ago',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      title: 'Testimonial received', 
      desc: 'New 5-star review from TechCorp', 
      time: '5 hours ago',
      icon: MessageSquare,
      color: 'bg-green-100 text-green-600'
    },
    { 
      title: 'New article published', 
      desc: 'The Future of AI in Healthcare published', 
      time: 'Yesterday',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      title: 'Event scheduled', 
      desc: 'AI Workshop scheduled for next month', 
      time: '2 days ago',
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600'
    },
    { 
      title: 'System update', 
      desc: 'System update completed successfully', 
      time: '3 days ago',
      icon: Settings,
      color: 'bg-teal-100 text-teal-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          Recent Activity
        </h2>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
              <activity.icon size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.desc}</p>
            </div>
            <div className="text-xs text-gray-500">
              {activity.time}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <button className="w-full border border-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-50 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};
