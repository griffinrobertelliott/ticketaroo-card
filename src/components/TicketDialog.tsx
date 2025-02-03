import * as Dialog from "@radix-ui/react-dialog";
import { X, AlertCircle, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TicketDialog = ({ isOpen, onClose }: TicketDialogProps) => {
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
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm text-blue-700 font-medium">JD</span>
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TicketDialog;