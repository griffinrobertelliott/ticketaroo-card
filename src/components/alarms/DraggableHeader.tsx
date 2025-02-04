import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DraggableHeaderProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const DraggableHeader = ({ id, children, className, onClick }: DraggableHeaderProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    touchAction: 'none',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableHead
      ref={setNodeRef}
      style={style}
      className={cn("select-none", className)}
      onClick={onClick}
      {...attributes}
      {...listeners}
    >
      {children}
    </TableHead>
  );
};

export default DraggableHeader;