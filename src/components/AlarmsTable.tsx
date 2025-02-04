import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import TicketDialog from "./TicketDialog";

interface Alarm {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "In Progress" | "Done";
  createdAt: string;
}

// Mock data - replace with real data later
const mockAlarms: Alarm[] = [
  {
    id: "TICKET-123",
    title: "Implement new authentication flow",
    priority: "High",
    status: "In Progress",
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "TICKET-124",
    title: "Database connection timeout",
    priority: "High",
    status: "To Do",
    createdAt: "2024-02-20T11:30:00Z",
  },
  {
    id: "TICKET-125",
    title: "Update user permissions",
    priority: "Medium",
    status: "Done",
    createdAt: "2024-02-20T09:15:00Z",
  },
];

const AlarmsTable = () => {
  const [selectedAlarmId, setSelectedAlarmId] = useState<string | null>(null);

  const handleRowClick = (alarmId: string) => {
    setSelectedAlarmId(alarmId);
  };

  const handleCloseDialog = () => {
    setSelectedAlarmId(null);
  };

  const getStatusColor = (status: Alarm["status"]) => {
    switch (status) {
      case "To Do":
        return "text-gray-700";
      case "In Progress":
        return "text-blue-700";
      case "Done":
        return "text-green-700";
    }
  };

  const getPriorityColor = (priority: Alarm["priority"]) => {
    switch (priority) {
      case "High":
        return "text-red-700";
      case "Medium":
        return "text-yellow-700";
      case "Low":
        return "text-green-700";
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAlarms.map((alarm) => (
            <TableRow
              key={alarm.id}
              onClick={() => handleRowClick(alarm.id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TableCell className="font-medium">{alarm.id}</TableCell>
              <TableCell>{alarm.title}</TableCell>
              <TableCell className={getPriorityColor(alarm.priority)}>
                {alarm.priority}
              </TableCell>
              <TableCell className={getStatusColor(alarm.status)}>
                {alarm.status}
              </TableCell>
              <TableCell>
                {new Date(alarm.createdAt).toLocaleDateString()}
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