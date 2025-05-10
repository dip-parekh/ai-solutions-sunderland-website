
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from "lucide-react";
import { Inquiry } from "@/types/database";

interface ActivityChartProps {
  data?: Inquiry[];
  isLoading: boolean;
  dateRange?: { from: Date; to: Date };
}

export const ActivityChart = ({ data = [], isLoading, dateRange }: ActivityChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (data.length > 0) {
      const processedData = processDailyData(data, dateRange);
      setChartData(processedData);
    } else {
      // Default data when no inquiries
      setChartData([
        { date: 'Mon', count: 0 },
        { date: 'Tue', count: 0 },
        { date: 'Wed', count: 0 },
        { date: 'Thu', count: 0 },
        { date: 'Fri', count: 0 },
        { date: 'Sat', count: 0 },
        { date: 'Sun', count: 0 },
      ]);
    }
  }, [data, dateRange]);

  const processDailyData = (inquiries: Inquiry[], range?: { from: Date; to: Date }) => {
    // Get date range for filtering
    const fromDate = range?.from || new Date(new Date().setDate(new Date().getDate() - 7));
    const toDate = range?.to || new Date();

    // Filter inquiries by date range
    const filteredInquiries = inquiries.filter(inquiry => {
      const inquiryDate = new Date(inquiry.date || inquiry.created_at || '');
      return inquiryDate >= fromDate && inquiryDate <= toDate;
    });

    // Group by day of week
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dailyCounts = days.map(day => ({ date: day, count: 0 }));

    filteredInquiries.forEach(inquiry => {
      const inquiryDate = new Date(inquiry.date || inquiry.created_at || '');
      const dayOfWeek = inquiryDate.getDay();
      dailyCounts[dayOfWeek].count += 1;
    });

    // Reorder to start with Monday
    const reordered = [...dailyCounts.slice(1), dailyCounts[0]];
    return reordered;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
          Inquiry Analytics
        </h2>
      </div>
      
      <div className="h-64">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [`${value} inquiries`, 'Count']} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
