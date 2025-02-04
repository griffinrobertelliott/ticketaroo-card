import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import TicketDialog from "./TicketDialog";
import { Clock, MoreHorizontal } from "lucide-react";

interface Alarm {
  id: string;
  device: string;
  status: "Unacknowledged" | "Acknowledged" | "In Progress" | "Resolved";
  notes: string;
  description: string;
  assignedTo: string | null;
  urgent: boolean;
  timeElapsed: string;
  severity: "Warning" | "Critical" | "Info";
}

// Mock data - replace with real data later
const mockAlarms: Alarm[] = [
  {
    id: "AL-001",
    device: "Spot-1",
    status: "Unacknowledged",
    notes: "Maintenance required",
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
    notes: "Under investigation",
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
    notes: "Critical issue",
    description: "connection lost",
    assignedTo: null,
    urgent: true,
    timeElapsed: "48h 20m 10s",
    severity: "Critical"
  }
];

const AlarmsTable = () => {
  const [selectedAlarmId, setSelectedAlarmId] = useState<string | null>(null);

  const handleRowClick = (alarmId: string) => {
    setSelectedAlarmId(alarmId);
  };

  const handleCloseDialog = () => {
    setSelectedAlarmId(null);
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

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-alarm-card hover:bg-transparent">
            <TableHead className="text-alarm-muted">Device</TableHead>
            <TableHead className="text-alarm-muted">Status</TableHead>
            <TableHead className="text-alarm-muted">Notes</TableHead>
            <TableHead className="text-alarm-muted">Description</TableHead>
            <TableHead className="text-alarm-muted">Assigned To</TableHead>
            <TableHead className="text-alarm-muted">Urgent</TableHead>
            <TableHead className="text-alarm-muted">Time Elapsed</TableHead>
            <TableHead className="text-alarm-muted">Severity</TableHead>
            <TableHead className="text-alarm-muted text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAlarms.map((alarm) => (
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
                {alarm.notes}
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