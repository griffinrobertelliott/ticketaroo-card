import { Table, TableBody } from "@/components/ui/table";
import { useState } from "react";
import TicketDialog from "./TicketDialog";
import { Alarm, SortField, SortDirection, StatusFilter } from "@/types/alarm";
import FilterPills from "./alarms/FilterPills";
import AlarmsTableHeader from "./alarms/AlarmsTableHeader";
import AlarmRow from "./alarms/AlarmRow";

// Mock data - replace with real data later
const mockAlarms: Alarm[] = [
  {
    id: "AL-001",
    device: "Spot-1",
    status: "Muted",
    description: "robot is stuck",
    assignedTo: null,
    urgent: false,
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
      case "Muted":
        return "text-alarm-muted";
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

  return (
    <div className="w-full space-y-6">
      <FilterPills 
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <Table>
        <AlarmsTableHeader
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
        />
        <TableBody>
          {sortedAlarms.map((alarm) => (
            <AlarmRow
              key={alarm.id}
              alarm={alarm}
              onClick={handleRowClick}
              getSeverityColor={getSeverityColor}
              getStatusColor={getStatusColor}
            />
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