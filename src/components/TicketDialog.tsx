import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import TicketHeader from "./ticket/TicketHeader";
import TicketDescription from "./ticket/TicketDescription";
import TicketMetadata from "./ticket/TicketMetadata";
import TicketStatus from "./ticket/TicketStatus";
import TicketAssignee from "./ticket/TicketAssignee";
import TicketMuteControls from "./ticket/TicketMuteControls";

interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "To Do" | "In Progress" | "Done" | "Muted";
type Assignee = {
  id: string;
  name: string;
  email: string;
  initials: string;
} | null;

const TicketDialog = ({ isOpen, onClose }: TicketDialogProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [muteDuration, setMuteDuration] = useState<string>("");
  const [muteEndTime, setMuteEndTime] = useState<Date | null>(null);
  const [status, setStatus] = useState<Status>("In Progress");
  const [assignee, setAssignee] = useState<Assignee>({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    initials: "JD"
  });

  const handleMute = (duration: string) => {
    if (duration) {
      setIsMuted(true);
      setMuteDuration(duration);
      const now = new Date();
      const endTime = new Date(now.getTime() + parseInt(duration) * 60 * 60 * 1000);
      setMuteEndTime(endTime);
      setStatus("Muted");
      setAssignee(null);
    }
  };

  const handleUnmute = () => {
    setIsMuted(false);
    setMuteDuration("");
    setMuteEndTime(null);
    setStatus("Unacknowledged"); // Changed from "To Do" to "Unacknowledged"
  };

  const statusOptions: Status[] = ["To Do", "In Progress", "Done", "Muted"];
  const assigneeOptions: Assignee[] = [
    { id: "1", name: "John Doe", email: "john.doe@example.com", initials: "JD" },
    { id: "2", name: "Jane Smith", email: "jane.smith@example.com", initials: "JS" },
    { id: "3", name: "Bob Wilson", email: "bob.wilson@example.com", initials: "BW" }
  ];

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "To Do":
        return "bg-alarm-card text-alarm-muted border-alarm-muted/20";
      case "In Progress":
        return "bg-alarm-card text-alarm-accent border-alarm-accent/20";
      case "Done":
        return "bg-alarm-card text-alarm-warning border-alarm-warning/20";
      case "Muted":
        return "bg-alarm-card text-alarm-muted border-alarm-muted/20";
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="ticket-popup-overlay" />
        <Dialog.Content className="ticket-popup-content">
          <TicketHeader
            ticketId="TICKET-123"
            status={status}
            title="Implement new authentication flow"
            isMuted={isMuted}
            getStatusColor={getStatusColor}
          />

          <div className="space-y-6">
            <TicketDescription
              description="We need to implement a new authentication flow that includes social login options and improved security measures. This should follow the latest design specifications and security best practices."
            />

            <TicketMetadata />

            <TicketStatus
              status={status}
              isMuted={isMuted}
              onStatusChange={(value) => setStatus(value as Status)}
              statusOptions={statusOptions}
            />

            <TicketAssignee
              assignee={assignee}
              isMuted={isMuted}
              onAssigneeChange={(value) => {
                const newAssignee = assigneeOptions.find((a) => a.id === value);
                setAssignee(newAssignee || null);
              }}
              assigneeOptions={assigneeOptions}
            />

            <TicketMuteControls
              isMuted={isMuted}
              muteEndTime={muteEndTime}
              onMute={handleMute}
              onUnmute={handleUnmute}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TicketDialog;