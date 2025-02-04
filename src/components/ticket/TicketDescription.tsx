interface TicketDescriptionProps {
  description: string;
}

const TicketDescription = ({ description }: TicketDescriptionProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground mb-2">Description</h3>
      <p className="text-sm text-alarm-muted">{description}</p>
    </div>
  );
};

export default TicketDescription;