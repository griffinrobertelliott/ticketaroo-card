import * as Select from "@radix-ui/react-select";

interface Assignee {
  id: string;
  name: string;
  email: string;
  initials: string;
}

interface TicketAssigneeProps {
  assignee: Assignee | null;
  isMuted: boolean;
  onAssigneeChange: (value: string | null) => void;
  assigneeOptions: Assignee[];
}

const TicketAssignee = ({ assignee, isMuted, onAssigneeChange, assigneeOptions }: TicketAssigneeProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground mb-2">Assignee</h3>
      {!isMuted ? (
        <Select.Root
          value={assignee?.id || ""}
          onValueChange={(value) => onAssigneeChange(value === "unassign" ? null : value)}
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
            <Select.Content className="z-[100] relative bg-alarm-card rounded-md shadow-lg border border-alarm-muted/20">
              <Select.Viewport className="p-1">
                {assignee && (
                  <Select.Item
                    value="unassign"
                    className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-alarm-muted/10 text-alarm-warning"
                  >
                    <Select.ItemText>Unassign</Select.ItemText>
                  </Select.Item>
                )}
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
  );
};

export default TicketAssignee;