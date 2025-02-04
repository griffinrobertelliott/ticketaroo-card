import { TableCell, TableRow } from "@/components/ui/table";
import { Clock, MoreHorizontal } from "lucide-react";
import { Alarm } from "@/types/alarm";

interface AlarmRowProps {
  alarm: Alarm;
  onClick: (id: string) => void;
  getSeverityColor: (severity: Alarm["severity"]) => string;
  getStatusColor: (status: Alarm["status"]) => string;
}

const AlarmRow = ({ alarm, onClick, getSeverityColor, getStatusColor }: AlarmRowProps) => {
  return (
    <TableRow
      key={alarm.id}
      onClick={() => onClick(alarm.id)}
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
  );
};

export default AlarmRow;