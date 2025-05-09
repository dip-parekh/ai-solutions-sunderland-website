
import { BarChart2 } from "lucide-react";
import { Inquiry } from "@/types/database";

interface ActivityChartProps {
  data?: Inquiry[];
  isLoading: boolean;
}

export const ActivityChart = ({ data = [], isLoading }: ActivityChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
          Inquiry Analytics
        </h2>
      </div>
      
      <div className="h-64 flex items-center justify-center">
        <div className="text-center text-gray-500">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Simple bar chart */}
              <div className="flex items-end justify-around h-40 space-x-2">
                {[0.6, 0.9, 0.4, 0.7, 0.5, 0.3, 0.8].map((height, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div 
                      className="bg-blue-500 rounded-t w-8" 
                      style={{ height: `${height * 100}%` }}
                    ></div>
                    <div className="text-xs mt-1">{`D${i+1}`}</div>
                  </div>
                ))}
              </div>
              <p>Daily Inquiry Trend</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
