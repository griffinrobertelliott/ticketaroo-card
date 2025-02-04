import * as Dialog from "@radix-ui/react-dialog";
import { X, BellOff } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface TicketHeaderProps {
  ticketId: string;
  status: string;
  title: string;
  isMuted: boolean;
  getStatusColor: (status: string) => string;
}

const TicketHeader = ({ ticketId, status, title, isMuted, getStatusColor }: TicketHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-alarm-muted">{ticketId}</span>
          <Badge variant="outline" className={getStatusColor(status)}>
            {status}
          </Badge>
          {isMuted && (
            <Badge variant="outline" className="bg-alarm-card text-alarm-warning border-alarm-warning/20">
              <BellOff className="h-3 w-3 mr-1" />
              Muted
            </Badge>
          )}
        </div>
        <Dialog.Title className="text-xl font-semibold text-foreground">
          {title}
        </Dialog.Title>
      </div>
      <Dialog.Close asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-alarm-muted hover:text-foreground">
          <X className="h-4 w-4" />
        </Button>
      </Dialog.Close>
    </div>
  );
};

export default TicketHeader;