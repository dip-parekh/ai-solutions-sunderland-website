
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InquiryFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const InquiryFilters = ({ statusFilter, setStatusFilter }: InquiryFiltersProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          {statusFilter === 'all' ? 'All Statuses' : `Status: ${statusFilter}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Statuses</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter('new')}>New</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter('in progress')}>In Progress</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Completed</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
