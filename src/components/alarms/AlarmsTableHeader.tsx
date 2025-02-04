import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronUp, ChevronDown } from "lucide-react";
import { 
  SortField, 
  StatusFilter, 
  DeviceFilter,
  AssigneeFilter,
  UrgentFilter,
  SeverityFilter 
} from "@/types/alarm";
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
  deviceFilter: DeviceFilter;
  setDeviceFilter: (filter: DeviceFilter) => void;
  assigneeFilter: AssigneeFilter;
  setAssigneeFilter: (filter: AssigneeFilter) => void;
  urgentFilter: UrgentFilter;
  setUrgentFilter: (filter: UrgentFilter) => void;
  severityFilter: SeverityFilter;
  setSeverityFilter: (filter: SeverityFilter) => void;
  devices: string[];
}

const AlarmsTableHeader = ({ 
  sortField, 
  sortDirection, 
  handleSort,
  statusFilter,
  setStatusFilter,
  deviceFilter,
  setDeviceFilter,
  assigneeFilter,
  setAssigneeFilter,
  urgentFilter,
  setUrgentFilter,
  severityFilter,
  setSeverityFilter,
  devices
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

  const FilterableHeader = ({ 
    children,
    content
  }: { 
    children: React.ReactNode;
    content: React.ReactNode;
  }) => (
    <TableHead className="text-alarm-muted">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center px-2 py-1 rounded-full bg-alarm-card/50 hover:bg-alarm-card transition-colors">
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {content}
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );

  return (
    <TableHeader>
      <TableRow className="border-b border-alarm-card hover:bg-transparent">
        <FilterableHeader content={
          <>
            <DropdownMenuItem onClick={() => setDeviceFilter("all")}>
              All Devices
            </DropdownMenuItem>
            {devices.map(device => (
              <DropdownMenuItem key={device} onClick={() => setDeviceFilter(device)}>
                {device}
              </DropdownMenuItem>
            ))}
          </>
        }>
          Device
        </FilterableHeader>

        <FilterableHeader content={
          <>
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
          </>
        }>
          Status
        </FilterableHeader>

        <SortableHeader field="description">Description</SortableHeader>

        <FilterableHeader content={
          <>
            <DropdownMenuItem onClick={() => setAssigneeFilter("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAssigneeFilter("assigned")}>
              Assigned
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAssigneeFilter("unassigned")}>
              Unassigned
            </DropdownMenuItem>
          </>
        }>
          Assigned To
        </FilterableHeader>

        <FilterableHeader content={
          <>
            <DropdownMenuItem onClick={() => setUrgentFilter("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUrgentFilter("urgent")}>
              Urgent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUrgentFilter("not-urgent")}>
              Not Urgent
            </DropdownMenuItem>
          </>
        }>
          Urgent
        </FilterableHeader>

        <SortableHeader field="timeElapsed">Time Elapsed</SortableHeader>

        <FilterableHeader content={
          <>
            <DropdownMenuItem onClick={() => setSeverityFilter("all")}>
              All Severities
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverityFilter("Warning")}>
              Warning
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverityFilter("Critical")}>
              Critical
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverityFilter("Info")}>
              Info
            </DropdownMenuItem>
          </>
        }>
          Severity
        </FilterableHeader>

        <TableHead className="text-alarm-muted text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default AlarmsTableHeader;