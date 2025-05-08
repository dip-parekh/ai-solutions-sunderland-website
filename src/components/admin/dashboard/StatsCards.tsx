
import { Link } from "react-router-dom";
import { Calendar, FileText, FolderOpen, MessageSquare, Star } from "lucide-react";

interface StatsCardsProps {
  counts: {
    projects: number;
    testimonials: number;
    articles: number;
    events: number;
    inquiries: number;
  };
  isLoading: boolean;
}

export const StatsCards = ({ counts, isLoading }: StatsCardsProps) => {
  const cards = [
    {
      title: 'Projects',
      value: counts.projects,
      icon: FolderOpen,
      color: 'bg-blue-600',
      link: '/admin/projects'
    },
    {
      title: 'Testimonials',
      value: counts.testimonials,
      icon: Star,
      color: 'bg-amber-500',
      link: '/admin/testimonials'
    },
    {
      title: 'Articles',
      value: counts.articles,
      icon: FileText,
      color: 'bg-green-600',
      link: '/admin/articles'
    },
    {
      title: 'Events',
      value: counts.events,
      icon: Calendar,
      color: 'bg-purple-600',
      link: '/admin/events'
    },
    {
      title: 'Inquiries',
      value: counts.inquiries,
      icon: MessageSquare,
      color: 'bg-red-600',
      link: '/admin/inquiries'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card) => (
        <Link to={card.link} key={card.title} className="block">
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
              </div>
              <div className={`${card.color} text-white p-3 rounded-full`}>
                <card.icon size={24} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
