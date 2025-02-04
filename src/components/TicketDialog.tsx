import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import TicketHeader from "./ticket/TicketHeader";
import TicketDescription from "./ticket/TicketDescription";
import TicketMetadata from "./ticket/TicketMetadata";
import TicketStatus from "./ticket/TicketStatus";
import TicketAssignee from "./ticket/TicketAssignee";
import TicketMuteControls from "./ticket/TicketMuteControls";
import { Alarm } from "@/types/alarm";

interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  alarm?: Alarm;
  onAlarmUpdate: (alarm: Alarm) => void;
}

type Status = "Unacknowledged" | "To Do" | "In Progress" | "Done" | "Muted";
type Assignee = {
  id: string;
  name: string;
  email: string;
  initials: string;
} | null;

const TicketDialog = ({ isOpen, onClose, alarm, onAlarmUpdate }: TicketDialogProps) => {
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

  useEffect(() => {
    if (alarm) {
      setIsMuted(alarm.status === "Muted");
      setStatus(alarm.status as Status);
      setAssignee(alarm.assignedTo ? {
        id: "1", // This is mock data - in real app we'd have proper IDs
        name: alarm.assignedTo,
        email: `${alarm.assignedTo.toLowerCase().replace(" ", ".")}@example.com`,
        initials: alarm.assignedTo.split(" ").map(n => n[0]).join("")
      } : null);
    }
  }, [alarm]);

  const handleMute = (duration: string) => {
    if (duration && alarm) {
      setIsMuted(true);
      setMuteDuration(duration);
      const now = new Date();
      const endTime = new Date(now.getTime() + parseInt(duration) * 60 * 60 * 1000);
      setMuteEndTime(endTime);
      setStatus("Muted");
      setAssignee(null);

      onAlarmUpdate({
        ...alarm,
        status: "Muted",
        assignedTo: null
      });
    }
  };

  const handleUnmute = () => {
    if (alarm) {
      setIsMuted(false);
      setMuteDuration("");
      setMuteEndTime(null);
      setStatus("Unacknowledged");
      
      onAlarmUpdate({
        ...alarm,
        status: "Unacknowledged",
        assignedTo: null
      });
    }
  };

  const statusOptions: Status[] = ["To Do", "In Progress", "Done", "Muted", "Unacknowledged"];
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
      case "Unacknowledged":
        return "bg-alarm-card text-alarm-muted border-alarm-muted/20";
    }
  };

  if (!alarm) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="ticket-popup-overlay" />
        <Dialog.Content className="ticket-popup-content">
          <TicketHeader
            ticketId={alarm.id}
            status={status}
            title={alarm.description}
            isMuted={isMuted}
            getStatusColor={getStatusColor}
          />

          <div className="space-y-6">
            <TicketDescription
              description={alarm.description}
            />

            <TicketMetadata />

            <TicketStatus
              status={status}
              isMuted={isMuted}
              onStatusChange={(value) => {
                setStatus(value as Status);
                onAlarmUpdate({
                  ...alarm,
                  status: value as Alarm["status"]
                });
              }}
              statusOptions={statusOptions}
            />

            <TicketAssignee
              assignee={assignee}
              isMuted={isMuted}
              onAssigneeChange={(value) => {
                const newAssignee = assigneeOptions.find((a) => a.id === value);
                setAssignee(newAssignee || null);
                onAlarmUpdate({
                  ...alarm,
                  assignedTo: newAssignee?.name || null
                });
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