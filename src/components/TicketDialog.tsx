import * as Dialog from "@radix-ui/react-dialog";
import { X, AlertCircle, Clock, BellOff } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "To Do" | "In Progress" | "Done";
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
      setAssignee(null);
    }
  };

  const handleUnmute = () => {
    setIsMuted(false);
    setMuteDuration("");
    setMuteEndTime(null);
  };

  const statusOptions: Status[] = ["To Do", "In Progress", "Done"];
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
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="ticket-popup-overlay" />
        <Dialog.Content className="ticket-popup-content">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-alarm-muted">TICKET-123</span>
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
                Implement new authentication flow
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-alarm-muted hover:text-foreground">
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Description</h3>
              <p className="text-sm text-alarm-muted">
                We need to implement a new authentication flow that includes social login options
                and improved security measures. This should follow the latest design specifications
                and security best practices.
              </p>
            </div>

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

            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Status</h3>
              {!isMuted ? (
                <Select.Root value={status} onValueChange={(value: Status) => setStatus(value)}>
                  <Select.Trigger className="inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-alarm-muted/20 bg-alarm-card hover:bg-alarm-card/80 text-foreground h-9 px-4 py-2 w-[200px]">
                    <Select.Value>{status}</Select.Value>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-alarm-card rounded-md shadow-lg border border-alarm-muted/20">
                      <Select.Viewport className="p-1">
                        {statusOptions.map((option) => (
                          <Select.Item
                            key={option}
                            value={option}
                            className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-alarm-muted/10 text-foreground"
                          >
                            <Select.ItemText>{option}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              ) : (
                <div className="text-sm text-alarm-muted">{status}</div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Assignee</h3>
              {!isMuted ? (
                <Select.Root
                  value={assignee?.id}
                  onValueChange={(value) => {
                    const newAssignee = assigneeOptions.find((a) => a.id === value);
                    setAssignee(newAssignee || null);
                  }}
                >
                  <Select.Trigger className="inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-alarm-muted/20 bg-alarm-card hover:bg-alarm-card/80 text-foreground h-9 px-4 py-2 w-[200px]">
                    <div className="flex items-center gap-2">
                      {assignee && (
                        <div className="h-6 w-6 rounded-full bg-alarm-accent/10 flex items-center justify-center">
                          <span className="text-xs text-alarm-accent font-medium">
                            {assignee.initials}
                          </span>
                        </div>
                      )}
                      <Select.Value>{assignee?.name || 'Unassigned'}</Select.Value>
                    </div>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-alarm-card rounded-md shadow-lg border border-alarm-muted/20">
                      <Select.Viewport className="p-1">
                        {assigneeOptions.map((option) => (
                          <Select.Item
                            key={option.id}
                            value={option.id}
                            className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-alarm-muted/10 text-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-alarm-accent/10 flex items-center justify-center">
                                <span className="text-xs text-alarm-accent font-medium">
                                  {option.initials}
                                </span>
                              </div>
                              <Select.ItemText>{option.name}</Select.ItemText>
                            </div>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              ) : (
                <div className="text-sm text-alarm-muted">Unassigned (Muted)</div>
              )}
            </div>

            <div className="border-t border-alarm-muted/20 pt-4">
              {!isMuted ? (
                <div className="flex items-center gap-2">
                  <Select.Root onValueChange={handleMute}>
                    <Select.Trigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-alarm-muted/20 bg-alarm-card hover:bg-alarm-card/80 text-foreground h-9 px-4 py-2">
                      <Select.Value placeholder="Mute for..." />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-alarm-card rounded-md shadow-lg border border-alarm-muted/20">
                        <Select.Viewport className="p-1">
                          <Select.Item value="1" className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-alarm-muted/10 text-foreground">
                            <Select.ItemText>1 hour</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="4" className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-alarm-muted/10 text-foreground">
                            <Select.ItemText>4 hours</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="24" className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-alarm-muted/10 text-foreground">
                            <Select.ItemText>24 hours</Select.ItemText>
                          </Select.Item>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-alarm-muted">
                    <BellOff className="h-4 w-4" />
                    <span>
                      Muted until {muteEndTime?.toLocaleString()}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUnmute}
                    className="text-sm border-alarm-muted/20 bg-alarm-card hover:bg-alarm-card/80 text-foreground"
                  >
                    Unmute
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TicketDialog;