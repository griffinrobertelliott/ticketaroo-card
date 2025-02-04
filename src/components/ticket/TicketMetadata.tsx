import { AlertCircle, Clock } from "lucide-react";

const TicketMetadata = () => {
  return (
    <div className="flex gap-8">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Priority</h3>
        <div className="flex items-center gap-1 text-alarm-warning">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">High</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Created</h3>
        <div className="flex items-center gap-1 text-alarm-muted">
          <Clock className="h-4 w-4" />
          <span className="text-sm">2 days ago</span>
        </div>
      </div>
    </div>
  );
};

export default TicketMetadata;