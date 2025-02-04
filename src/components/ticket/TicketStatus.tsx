import * as Select from "@radix-ui/react-select";

interface TicketStatusProps {
  status: string;
  isMuted: boolean;
  onStatusChange: (value: string) => void;
  statusOptions: string[];
}

const TicketStatus = ({ status, isMuted, onStatusChange, statusOptions }: TicketStatusProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground mb-2">Status</h3>
      {!isMuted ? (
        <Select.Root value={status} onValueChange={onStatusChange}>
          <Select.Trigger className="inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-alarm-muted/20 bg-alarm-card hover:bg-alarm-card/80 text-foreground h-9 px-4 py-2 w-[200px]">
            <Select.Value>{status}</Select.Value>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-[100] relative bg-alarm-card rounded-md shadow-lg border border-alarm-muted/20">
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
  );
};

export default TicketStatus;