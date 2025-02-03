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

const TicketDialog = ({ isOpen, onClose }: TicketDialogProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [muteDuration, setMuteDuration] = useState<string>("");
  const [muteEndTime, setMuteEndTime] = useState<Date | null>(null);

  const handleMute = (duration: string) => {
    if (duration) {
      setIsMuted(true);
      setMuteDuration(duration);
      const now = new Date();
      const endTime = new Date(now.getTime() + parseInt(duration) * 60 * 60 * 1000);
      setMuteEndTime(endTime);
    }
  };

  const handleUnmute = () => {
    setIsMuted(false);
    setMuteDuration("");
    setMuteEndTime(null);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="ticket-popup-overlay" />
        <Dialog.Content className="ticket-popup-content">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-muted-foreground">TICKET-123</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  In Progress
                </Badge>
                {isMuted && (
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    <BellOff className="h-3 w-3 mr-1" />
                    Muted
                  </Badge>
                )}
              </div>
              <Dialog.Title className="text-xl font-semibold">
                Implement new authentication flow
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">
                We need to implement a new authentication flow that includes social login options
                and improved security measures. This should follow the latest design specifications
                and security best practices.
              </p>
            </div>

            <div className="flex gap-8">
              <div>
                <h3 className="text-sm font-medium mb-2">Priority</h3>
                <div className="flex items-center gap-1 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">High</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Created</h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">2 days ago</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Assignee</h3>
              <div className={cn("flex items-center gap-2", isMuted && "opacity-50")}>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm text-blue-700 font-medium">JD</span>
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              {!isMuted ? (
                <div className="flex items-center gap-2">
                  <Select.Root onValueChange={handleMute}>
                    <Select.Trigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                      <Select.Value placeholder="Mute for..." />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-white rounded-md shadow-lg border">
                        <Select.Viewport className="p-1">
                          <Select.Item value="1" className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent focus:bg-accent">
                            <Select.ItemText>1 hour</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="4" className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent focus:bg-accent">
                            <Select.ItemText>4 hours</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="24" className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent focus:bg-accent">
                            <Select.ItemText>24 hours</Select.ItemText>
                          </Select.Item>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BellOff className="h-4 w-4" />
                    <span>
                      Muted until {muteEndTime?.toLocaleString()}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUnmute}
                    className="text-sm"
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