import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Clock, MoreHorizontal } from "lucide-react";
import { Alarm } from "@/types/alarm";
import { Column } from "../AlarmsTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AlarmRowProps {
  alarm: Alarm;
  columns: Column[];
  onClick: (id: string) => void;
  getSeverityColor: (severity: Alarm["severity"]) => string;
  getStatusColor: (status: Alarm["status"]) => string;
  onAlarmUpdate?: (alarm: Alarm) => void;
}

const assigneeOptions = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", initials: "JD" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com", initials: "JS" },
  { id: "3", name: "Bob Wilson", email: "bob.wilson@example.com", initials: "BW" }
];

const AlarmRow = ({ 
  alarm, 
  columns, 
  onClick, 
  getSeverityColor, 
  getStatusColor,
  onAlarmUpdate 
}: AlarmRowProps) => {
  const handleAssign = (assigneeName: string | null) => {
    if (onAlarmUpdate) {
      onAlarmUpdate({
        ...alarm,
        assignedTo: assigneeName
      });
    }
  };

  const renderCell = (columnId: string) => {
    switch (columnId) {
      case 'device':
        return <TableCell className="font-medium text-foreground">{alarm.device}</TableCell>;
      case 'status':
        return <TableCell className={getStatusColor(alarm.status)}>{alarm.status}</TableCell>;
      case 'description':
        return <TableCell className="text-alarm-muted">{alarm.description}</TableCell>;
      case 'assignedTo':
        return (
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger className="px-2 py-1 text-sm text-alarm-accent hover:bg-alarm-card rounded">
                {alarm.assignedTo ? alarm.assignedTo : 'ASSIGN'}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-alarm-card border border-alarm-muted/20">
                {alarm.assignedTo ? (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAssign(null);
                    }}
                    className="flex items-center gap-2 hover:bg-alarm-muted/10 text-alarm-warning"
                  >
                    Unassign
                  </DropdownMenuItem>
                ) : (
                  assigneeOptions.map((assignee) => (
                    <DropdownMenuItem
                      key={assignee.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAssign(assignee.name);
                      }}
                      className="flex items-center gap-2 hover:bg-alarm-muted/10"
                    >
                      <div className="h-6 w-6 rounded-full bg-alarm-accent/10 flex items-center justify-center">
                        <span className="text-xs text-alarm-accent font-medium">
                          {assignee.initials}
                        </span>
                      </div>
                      <span className="text-foreground">{assignee.name}</span>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        );
      case 'urgent':
        return (
          <TableCell>
            {alarm.urgent && (
              <div className="w-6 h-6 rounded bg-alarm-urgent/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-alarm-urgent" />
              </div>
            )}
          </TableCell>
        );
      case 'timeElapsed':
        return (
          <TableCell className="text-alarm-muted">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {alarm.timeElapsed}
            </div>
          </TableCell>
        );
      case 'severity':
        return <TableCell className={getSeverityColor(alarm.severity)}>{alarm.severity}</TableCell>;
      case 'actions':
        return (
          <TableCell className="text-right">
            <button className="p-2 hover:bg-alarm-card rounded">
              <MoreHorizontal className="w-4 h-4 text-alarm-muted" />
            </button>
          </TableCell>
        );
      default:
        return <TableCell />;
    }
  };

  return (
    <TableRow
      onClick={() => onClick(alarm.id)}
      className="cursor-pointer border-b border-alarm-card hover:bg-alarm-card/50"
    >
      {columns.map((column) => (
        <React.Fragment key={column.id}>
          {renderCell(column.id)}
        </React.Fragment>
      ))}
    </TableRow>
  );
};

export default AlarmRow;
