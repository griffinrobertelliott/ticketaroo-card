import * as Select from "@radix-ui/react-select";
import { BellOff } from "lucide-react";
import { Button } from "../ui/button";

interface TicketMuteControlsProps {
  isMuted: boolean;
  muteEndTime: Date | null;
  onMute: (duration: string) => void;
  onUnmute: () => void;
}

const TicketMuteControls = ({ isMuted, muteEndTime, onMute, onUnmute }: TicketMuteControlsProps) => {
  return (
    <div className="border-t border-alarm-muted/20 pt-4">
      {!isMuted ? (
        <div className="flex items-center gap-2">
          <Select.Root onValueChange={onMute}>
            <Select.Trigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-alarm-muted/20 bg-alarm-card hover:bg-alarm-card/80 text-foreground h-9 px-4 py-2">
              <Select.Value placeholder="Mute for..." />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="z-[100] relative bg-alarm-card rounded-md shadow-lg border border-alarm-muted/20">
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
            onClick={onUnmute}
            className="text-sm border-alarm-muted/20 bg-alarm-card hover:bg-alarm-card/80 text-foreground"
          >
            Unmute
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicketMuteControls;