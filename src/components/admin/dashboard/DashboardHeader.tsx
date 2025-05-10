
import React from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  title: string;
  onExportData?: () => void;
  onDateRangeChange?: (range: { from: Date; to: Date }) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  onExportData,
  onDateRangeChange
}) => {
  const [date, setDate] = React.useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newRange = {
        from: date.from,
        to: date.to,
      };
      
      if (!date.from || date.to) {
        newRange.from = selectedDate;
        newRange.to = selectedDate;
      } else if (selectedDate < date.from) {
        newRange.from = selectedDate;
      } else {
        newRange.to = selectedDate;
      }
      
      setDate(newRange);
      
      if (onDateRangeChange && newRange.from && newRange.to) {
        onDateRangeChange(newRange);
      }
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm border px-3 py-1.5 flex items-center gap-1">
              <Calendar className="h-4 w-4 mr-1" />
              {date.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                "Select date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={date.from}
              selected={{
                from: date.from,
                to: date.to,
              }}
              onSelect={(selectedRange) => {
                if (selectedRange) {
                  const newRange = {
                    from: selectedRange.from || date.from,
                    to: selectedRange.to || selectedRange.from || date.to,
                  };
                  setDate(newRange);
                  if (onDateRangeChange) {
                    onDateRangeChange(newRange);
                  }
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        
        {onExportData && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExportData}
            className="text-sm border px-3 py-1.5 flex items-center gap-1"
          >
            <Download className="h-4 w-4 mr-1" />
            Export Data
          </Button>
        )}
      </div>
    </div>
  );
};
