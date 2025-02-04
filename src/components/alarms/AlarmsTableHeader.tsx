import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronUp, ChevronDown } from "lucide-react";
import { SortField, Alarm } from "@/types/alarm";

interface AlarmsTableHeaderProps {
  sortField: SortField;
  sortDirection: "asc" | "desc";
  handleSort: (field: SortField) => void;
}

const AlarmsTableHeader = ({ sortField, sortDirection, handleSort }: AlarmsTableHeaderProps) => {
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

  return (
    <TableHeader>
      <TableRow className="border-b border-alarm-card hover:bg-transparent">
        <SortableHeader field="device">Device</SortableHeader>
        <SortableHeader field="status">Status</SortableHeader>
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