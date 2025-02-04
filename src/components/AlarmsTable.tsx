import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import TicketDialog from "./TicketDialog";
import { Clock, MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react";

interface Alarm {
  id: string;
  device: string;
  status: "Unacknowledged" | "Acknowledged" | "In Progress" | "Resolved" | "Muted";
  description: string;
  assignedTo: string | null;
  urgent: boolean;
  timeElapsed: string;
  severity: "Warning" | "Critical" | "Info";
}

type SortField = keyof Alarm;
type SortDirection = "asc" | "desc";
type StatusFilter = "all-active" | "muted" | "unacknowledged" | "acknowledged" | "resolved";

// Mock data - replace with real data later
const mockAlarms: Alarm[] = [
  {
    id: "AL-001",
    device: "Spot-1",
    status: "Unacknowledged",
    description: "robot is stuck",
    assignedTo: null,
    urgent: true,
    timeElapsed: "144h 15m 56s",
    severity: "Warning"
  },
  {
    id: "AL-002",
    device: "Spot-2",
    status: "Acknowledged",
    description: "battery low",
    assignedTo: "John Doe",
    urgent: false,
    timeElapsed: "2h 30m 15s",
    severity: "Info"
  },
  {
    id: "AL-003",
    device: "Atlas-1",
    status: "Unacknowledged",
    description: "connection lost",
    assignedTo: null,
    urgent: true,
    timeElapsed: "48h 20m 10s",
    severity: "Critical"
  }
];

const AlarmsTable = () => {
  const [selectedAlarmId, setSelectedAlarmId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("status");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all-active");

  const handleRowClick = (alarmId: string) => {
    setSelectedAlarmId(alarmId);
  };

  const handleCloseDialog = () => {
    setSelectedAlarmId(null);
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  const getSeverityColor = (severity: Alarm["severity"]) => {
    switch (severity) {
      case "Warning":
        return "text-alarm-warning";
      case "Critical":
        return "text-alarm-urgent";
      case "Info":
        return "text-alarm-accent";
    }
  };

  const getStatusColor = (status: Alarm["status"]) => {
    switch (status) {
      case "Unacknowledged":
        return "text-alarm-warning";
      case "Acknowledged":
        return "text-alarm-accent";
      case "In Progress":
        return "text-blue-400";
      case "Resolved":
        return "text-green-400";
    }
  };

  const filteredAlarms = mockAlarms.filter((alarm) => {
    switch (statusFilter) {
      case "all-active":
        return ["Unacknowledged", "Acknowledged"].includes(alarm.status);
      case "muted":
        return alarm.status === "Muted";
      case "unacknowledged":
        return alarm.status === "Unacknowledged";
      case "acknowledged":
        return alarm.status === "Acknowledged";
      case "resolved":
        return alarm.status === "Resolved";
      default:
        return true;
    }
  });

  const sortedAlarms = [...filteredAlarms].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === "asc" ? 1 : -1;
    
    if (aValue < bValue) return -1 * direction;
    if (aValue > bValue) return 1 * direction;
    return 0;
  });

  const FilterPill = ({ label, value }: { label: string; value: StatusFilter }) => (
    <button
      onClick={() => setStatusFilter(value)}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        statusFilter === value
          ? "bg-alarm-accent text-alarm-background"
          : "bg-alarm-card hover:bg-alarm-card/80 text-alarm-muted"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full space-y-6">
      <div className="flex gap-3 overflow-x-auto pb-2">
        <FilterPill label="All Active" value="all-active" />
        <FilterPill label="Muted" value="muted" />
        <FilterPill label="Unacknowledged" value="unacknowledged" />
        <FilterPill label="Acknowledged" value="acknowledged" />
        <FilterPill label="Resolved" value="resolved" />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-alarm-card hover:bg-transparent">
            <TableHead 
              className="text-alarm-muted cursor-pointer"
              onClick={() => handleSort("device")}
            >
              <div className="flex items-center">
                Device {getSortIcon("device")}
              </div>
            </TableHead>
            <TableHead 
              className="text-alarm-muted cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status {getSortIcon("status")}
              </div>
            </TableHead>
            <TableHead 
              className="text-alarm-muted cursor-pointer"
              onClick={() => handleSort("description")}
            >
              <div className="flex items-center">
                Description {getSortIcon("description")}
              </div>
            </TableHead>
            <TableHead className="text-alarm-muted">Assigned To</TableHead>
            <TableHead className="text-alarm-muted">Urgent</TableHead>
            <TableHead 
              className="text-alarm-muted cursor-pointer"
              onClick={() => handleSort("timeElapsed")}
            >
              <div className="flex items-center">
                Time Elapsed {getSortIcon("timeElapsed")}
              </div>
            </TableHead>
            <TableHead 
              className="text-alarm-muted cursor-pointer"
              onClick={() => handleSort("severity")}
            >
              <div className="flex items-center">
                Severity {getSortIcon("severity")}
              </div>
            </TableHead>
            <TableHead className="text-alarm-muted text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAlarms.map((alarm) => (
            <TableRow
              key={alarm.id}
              onClick={() => handleRowClick(alarm.id)}
              className="cursor-pointer border-b border-alarm-card hover:bg-alarm-card/50"
            >
              <TableCell className="font-medium text-foreground">
                {alarm.device}
              </TableCell>
              <TableCell className={getStatusColor(alarm.status)}>
                {alarm.status}
              </TableCell>
              <TableCell className="text-alarm-muted">
                {alarm.description}
              </TableCell>
              <TableCell>
                {alarm.assignedTo ? (
                  <span className="text-alarm-muted">{alarm.assignedTo}</span>
                ) : (
                  <button className="px-2 py-1 text-sm text-alarm-accent hover:bg-alarm-card rounded">
                    ASSIGN
                  </button>
                )}
              </TableCell>
              <TableCell>
                {alarm.urgent && (
                  <div className="w-6 h-6 rounded bg-alarm-urgent/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-alarm-urgent" />
                  </div>
                )}
              </TableCell>
              <TableCell className="text-alarm-muted">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {alarm.timeElapsed}
                </div>
              </TableCell>
              <TableCell className={getSeverityColor(alarm.severity)}>
                {alarm.severity}
              </TableCell>
              <TableCell className="text-right">
                <button className="p-2 hover:bg-alarm-card rounded">
                  <MoreHorizontal className="w-4 h-4 text-alarm-muted" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TicketDialog
        isOpen={selectedAlarmId !== null}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default AlarmsTable;