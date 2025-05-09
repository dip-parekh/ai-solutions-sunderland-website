
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCards } from "./StatsCards";
import { ActivityChart } from "./ActivityChart";
import { RecentActivity } from "./RecentActivity";
import { Inquiry } from "@/types/database";

export interface AdminStatisticsProps {
  inquiries: Inquiry[];
  isLoading?: boolean;
}

export const AdminStatistics = ({ inquiries, isLoading = false }: AdminStatisticsProps) => {
  // Count inquiries by status
  const newCount = inquiries.filter(inq => inq.status === 'new').length;
  const inProgressCount = inquiries.filter(inq => inq.status === 'in progress').length;
  const completedCount = inquiries.filter(inq => inq.status === 'completed').length;
  
  const statsData = [
    {
      title: "New Inquiries",
      value: newCount,
      change: "+5%",
      icon: "MessageSquare"
    },
    {
      title: "In Progress",
      value: inProgressCount,
      change: "+2%",
      icon: "Clock"
    },
    {
      title: "Completed",
      value: completedCount,
      change: "+12%",
      icon: "CheckCircle"
    },
    {
      title: "Total Inquiries",
      value: inquiries.length,
      change: "+8%",
      icon: "Users"
    },
  ];

  // Get only recent inquiries for the activity chart
  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatsCards stats={statsData} isLoading={isLoading} />
      
      <Card className="col-span-full lg:col-span-3">
        <CardHeader>
          <CardTitle>Inquiries Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityChart data={inquiries} isLoading={isLoading} />
        </CardContent>
      </Card>
      
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity inquiries={recentInquiries} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
};
