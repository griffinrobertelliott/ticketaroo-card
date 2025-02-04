import { TableCell, TableRow } from "@/components/ui/table";
import { Clock, MoreHorizontal } from "lucide-react";
import { Alarm } from "@/types/alarm";
import { Column } from "../AlarmsTable";

interface AlarmRowProps {
  alarm: Alarm;
  columns: Column[];
  onClick: (id: string) => void;
  getSeverityColor: (severity: Alarm["severity"]) => string;
  getStatusColor: (status: Alarm["status"]) => string;
}

const AlarmRow = ({ alarm, columns, onClick, getSeverityColor, getStatusColor }: AlarmRowProps) => {
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
            {alarm.assignedTo ? (
              <span className="text-alarm-muted">{alarm.assignedTo}</span>
            ) : (
              <button className="px-2 py-1 text-sm text-alarm-accent hover:bg-alarm-card rounded">
                ASSIGN
              </button>
            )}
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