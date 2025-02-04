import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Clock } from "lucide-react";
import { Alarm } from "@/types/alarm";
import { Column } from "../AlarmsTable";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  
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
        return (
          <TableCell className="font-medium text-foreground">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span>{alarm.device}</span>
            </div>
          </TableCell>
        );
      case 'status':
        return (
          <TableCell className={isMobile ? "py-1" : ""}>
            <span className={`${getStatusColor(alarm.status)} inline-flex items-center gap-2 px-3 py-1 rounded-full bg-alarm-card/50`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
              {alarm.status}
            </span>
          </TableCell>
        );
      case 'description':
        return (
          <TableCell className="text-alarm-muted max-w-[300px] truncate hidden md:table-cell">
            {alarm.description}
          </TableCell>
        );
      case 'assignedTo':
        return (
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 text-sm rounded-full hover:bg-alarm-card/70 transition-colors">
                {alarm.assignedTo ? (
                  <span className="text-alarm-accent">{alarm.assignedTo}</span>
                ) : (
                  <span className="text-alarm-muted">ASSIGN</span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dropdown-content-animate bg-alarm-card border border-alarm-muted/20">
                {alarm.assignedTo ? (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAssign(null);
                    }}
                    className="text-alarm-warning hover:bg-alarm-muted/10"
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
          <TableCell className="hidden md:table-cell">
            {alarm.urgent && (
              <div className="w-6 h-6 rounded-full bg-alarm-urgent/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-alarm-urgent animate-pulse" />
              </div>
            )}
          </TableCell>
        );
      case 'timeElapsed':
        return (
          <TableCell className="text-alarm-muted hidden md:table-cell">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {alarm.timeElapsed}
            </div>
          </TableCell>
        );
      case 'severity':
        return (
          <TableCell className="hidden md:table-cell">
            <span className={`${getSeverityColor(alarm.severity)} px-3 py-1 rounded-full bg-alarm-card/50`}>
              {alarm.severity}
            </span>
          </TableCell>
        );
      default:
        return <TableCell />;
    }
  };

  return (
    <TableRow
      onClick={() => onClick(alarm.id)}
      className="table-row-animate cursor-pointer border-b border-alarm-card"
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