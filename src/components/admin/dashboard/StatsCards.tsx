
import { Link } from "react-router-dom";
import { Calendar, FileText, FolderOpen, MessageSquare, Star } from "lucide-react";

interface StatsCard {
  title: string;
  value: number;
  icon: string;
  change?: string;
  color?: string;
}

export interface StatsCardsProps {
  counts?: {
    projects: number;
    testimonials: number;
    articles: number;
    events: number;
    inquiries: number;
  };
  stats?: StatsCard[];
  isLoading: boolean;
}

export const StatsCards = ({ counts, stats, isLoading = false }: StatsCardsProps) => {
  // Use stats if provided, otherwise build stats from counts
  const displayStats = stats || [
    {
      title: 'Projects',
      value: counts?.projects || 0,
      icon: 'FolderOpen',
      color: 'bg-blue-600',
      link: '/admin/projects'
    },
    {
      title: 'Testimonials',
      value: counts?.testimonials || 0,
      icon: 'Star',
      color: 'bg-amber-500',
      link: '/admin/testimonials'
    },
    {
      title: 'Articles',
      value: counts?.articles || 0,
      icon: 'FileText',
      color: 'bg-green-600',
      link: '/admin/articles'
    },
    {
      title: 'Events',
      value: counts?.events || 0,
      icon: 'Calendar',
      color: 'bg-purple-600',
      link: '/admin/events'
    },
    {
      title: 'Inquiries',
      value: counts?.inquiries || 0,
      icon: 'MessageSquare',
      color: 'bg-red-600',
      link: '/admin/inquiries'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FolderOpen': return <FolderOpen size={24} />;
      case 'Star': return <Star size={24} />;
      case 'FileText': return <FileText size={24} />;
      case 'Calendar': return <Calendar size={24} />;
      case 'MessageSquare': return <MessageSquare size={24} />;
      default: return <MessageSquare size={24} />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {displayStats.map((card) => (
        <Link to={card.link || "#"} key={card.title} className="block">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-3xl font-bold mt-2">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    card.value
                  )}
                </p>
                {card.change && (
                  <p className="text-xs text-green-600 mt-1">{card.change}</p>
                )}
              </div>
              <div className={`${card.color || 'bg-blue-600'} text-white p-3 rounded-full`}>
                {getIcon(card.icon)}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
