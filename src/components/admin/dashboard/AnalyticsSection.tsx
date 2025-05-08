
import { BarChart2 } from "lucide-react";

export const AnalyticsSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">
        <div className="flex items-center">
          <BarChart2 size={20} className="mr-2 text-blue-600" />
          AI-Powered Analytics
        </div>
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Inquiry Distribution by Category</h3>
          <div className="h-36 flex items-center justify-center">
            <div className="w-full flex items-end justify-around space-x-2">
              {[
                { category: 'Sales', percentage: 45, color: 'bg-blue-500' },
                { category: 'Support', percentage: 30, color: 'bg-green-500' },
                { category: 'Partnership', percentage: 25, color: 'bg-purple-500' }
              ].map(item => (
                <div key={item.category} className="flex flex-col items-center">
                  <div 
                    className={`${item.color} w-12 md:w-16 rounded-t`} 
                    style={{ height: `${item.percentage}%` }}
                  ></div>
                  <div className="text-xs mt-1">{item.category}</div>
                  <div className="text-xs font-medium">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Sentiment Analysis</h3>
          <div className="bg-gray-50 p-3 rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Positive</span>
              <span className="text-sm font-medium">65%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
            </div>
            
            <div className="flex items-center justify-between mb-2 mt-4">
              <span className="text-sm">Neutral</span>
              <span className="text-sm font-medium">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: "25%" }}></div>
            </div>
            
            <div className="flex items-center justify-between mb-2 mt-4">
              <span className="text-sm">Negative</span>
              <span className="text-sm font-medium">10%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
