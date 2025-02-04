import { Table, TableBody } from "@/components/ui/table";
import { useState } from "react";
import TicketDialog from "./TicketDialog";
import { 
  Alarm, 
  SortField, 
  SortDirection, 
  StatusFilter,
  DeviceFilter,
  AssigneeFilter,
  UrgentFilter,
  SeverityFilter 
} from "@/types/alarm";
import AlarmsTableHeader from "./alarms/AlarmsTableHeader";
import AlarmRow from "./alarms/AlarmRow";

const initialAlarms: Alarm[] = [
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
  const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms);
  const [selectedAlarmId, setSelectedAlarmId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("status");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deviceFilter, setDeviceFilter] = useState<DeviceFilter>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<AssigneeFilter>("all");
  const [urgentFilter, setUrgentFilter] = useState<UrgentFilter>("all");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");

  const selectedAlarm = alarms.find(alarm => alarm.id === selectedAlarmId);

  const handleRowClick = (alarmId: string) => {
    setSelectedAlarmId(alarmId);
  };

  const handleCloseDialog = () => {
    setSelectedAlarmId(null);
  };

  const handleAlarmUpdate = (updatedAlarm: Alarm) => {
    setAlarms(prevAlarms => 
      prevAlarms.map(alarm => 
        alarm.id === updatedAlarm.id ? updatedAlarm : alarm
      )
    );
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

  const filteredAlarms = alarms.filter((alarm) => {
    const matchesStatus = (() => {
      switch (statusFilter) {
        case "all":
          return true;
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
    })();

    const matchesDevice = deviceFilter === "all" || alarm.device === deviceFilter;
    
    const matchesAssignee = (() => {
      switch (assigneeFilter) {
        case "assigned":
          return alarm.assignedTo !== null;
        case "unassigned":
          return alarm.assignedTo === null;
        default:
          return true;
      }
    })();

    const matchesUrgent = (() => {
      switch (urgentFilter) {
        case "urgent":
          return alarm.urgent;
        case "not-urgent":
          return !alarm.urgent;
        default:
          return true;
      }
    })();

    const matchesSeverity = severityFilter === "all" || alarm.severity === severityFilter;

    return matchesStatus && matchesDevice && matchesAssignee && matchesUrgent && matchesSeverity;
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
      <Table>
        <AlarmsTableHeader
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          deviceFilter={deviceFilter}
          setDeviceFilter={setDeviceFilter}
          assigneeFilter={assigneeFilter}
          setAssigneeFilter={setAssigneeFilter}
          urgentFilter={urgentFilter}
          setUrgentFilter={setUrgentFilter}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          devices={Array.from(new Set(alarms.map(alarm => alarm.device)))}
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
        alarm={selectedAlarm}
        onAlarmUpdate={handleAlarmUpdate}
      />
    </div>
  );
};

export default AlarmsTable;