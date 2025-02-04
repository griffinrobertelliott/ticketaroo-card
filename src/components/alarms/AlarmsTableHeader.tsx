import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronUp, ChevronDown, Filter } from "lucide-react";
import { SortField, Alarm, StatusFilter } from "@/types/alarm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AlarmsTableHeaderProps {
  sortField: SortField;
  sortDirection: "asc" | "desc";
  handleSort: (field: SortField) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (filter: StatusFilter) => void;
}

const AlarmsTableHeader = ({ 
  sortField, 
  sortDirection, 
  handleSort,
  statusFilter,
  setStatusFilter 
}: AlarmsTableHeaderProps) => {
  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead 
      className="text-alarm-muted cursor-pointer"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center">
        {children} {getSortIcon(field)}
      </div>
    </TableHead>
  );

  const FilterableHeader = ({ children }: { children: React.ReactNode }) => (
    <TableHead className="text-alarm-muted">
      <div className="flex items-center justify-between">
        {children}
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 hover:bg-alarm-card rounded">
            <Filter className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("all-active")}>
              All Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("muted")}>
              Muted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("unacknowledged")}>
              Unacknowledged
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("acknowledged")}>
              Acknowledged
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>
              Resolved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableHead>
  );

  return (
    <TableHeader>
      <TableRow className="border-b border-alarm-card hover:bg-transparent">
        <SortableHeader field="device">Device</SortableHeader>
        <FilterableHeader>Status</FilterableHeader>
        <SortableHeader field="description">Description</SortableHeader>
        <TableHead className="text-alarm-muted">Assigned To</TableHead>
        <TableHead className="text-alarm-muted">Urgent</TableHead>
        <SortableHeader field="timeElapsed">Time Elapsed</SortableHeader>
        <SortableHeader field="severity">Severity</SortableHeader>
        <TableHead className="text-alarm-muted text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default AlarmsTableHeader;