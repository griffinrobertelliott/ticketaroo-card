import { TableHeader, TableRow } from "@/components/ui/table";
import { ChevronUp, ChevronDown } from "lucide-react";
import { 
  SortField, 
  StatusFilter, 
  DeviceFilter,
  AssigneeFilter,
  UrgentFilter,
  SeverityFilter 
} from "@/types/alarm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableHeader from './DraggableHeader';
import { useState } from "react";

type ColumnType = 'sortable' | 'filterable' | 'both' | 'none';

interface Column {
  id: string;
  label: string;
  type: ColumnType;
}

interface AlarmsTableHeaderProps {
  sortField: SortField;
  sortDirection: "asc" | "desc";
  handleSort: (field: SortField) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (filter: StatusFilter) => void;
  deviceFilter: DeviceFilter;
  setDeviceFilter: (filter: DeviceFilter) => void;
  assigneeFilter: AssigneeFilter;
  setAssigneeFilter: (filter: AssigneeFilter) => void;
  urgentFilter: UrgentFilter;
  setUrgentFilter: (filter: UrgentFilter) => void;
  severityFilter: SeverityFilter;
  setSeverityFilter: (filter: SeverityFilter) => void;
  devices: string[];
}

const AlarmsTableHeader = ({ 
  sortField, 
  sortDirection, 
  handleSort,
  statusFilter,
  setStatusFilter,
  deviceFilter,
  setDeviceFilter,
  assigneeFilter,
  setAssigneeFilter,
  urgentFilter,
  setUrgentFilter,
  severityFilter,
  setSeverityFilter,
  devices
}: AlarmsTableHeaderProps) => {
  const initialColumns: Column[] = [
    { id: 'device', label: 'Device', type: 'filterable' },
    { id: 'status', label: 'Status', type: 'filterable' },
    { id: 'description', label: 'Description', type: 'sortable' },
    { id: 'assignedTo', label: 'Assigned To', type: 'filterable' },
    { id: 'urgent', label: 'Urgent', type: 'filterable' },
    { id: 'timeElapsed', label: 'Time Elapsed', type: 'sortable' },
    { id: 'severity', label: 'Severity', type: 'filterable' },
    { id: 'actions', label: 'Actions', type: 'none' },
  ];

  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  const isFilterActive = (filter: string) => {
    switch (filter) {
      case 'status':
        return statusFilter !== 'all';
      case 'device':
        return deviceFilter !== 'all';
      case 'assignedTo':
        return assigneeFilter !== 'all';
      case 'urgent':
        return urgentFilter !== 'all';
      case 'severity':
        return severityFilter !== 'all';
      default:
        return false;
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderHeaderContent = (column: Column) => {
    const columnType = column.type;
    
    if (columnType === 'filterable' || columnType === 'both') {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger 
            className={`flex items-center px-2 py-1 rounded-full transition-colors ${
              isFilterActive(column.id)
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            {column.label}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {renderFilterContent(column.id)}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    if (columnType === 'sortable' || columnType === 'both') {
      return (
        <div className="flex items-center cursor-pointer" onClick={() => handleSort(column.id as SortField)}>
          {column.label} {getSortIcon(column.id as SortField)}
        </div>
      );
    }

    return column.label;
  };

  const renderFilterContent = (columnId: string) => {
    switch (columnId) {
      case 'device':
        return (
          <>
            <DropdownMenuItem onClick={() => setDeviceFilter("all")}>
              All Devices
            </DropdownMenuItem>
            {devices.map(device => (
              <DropdownMenuItem key={device} onClick={() => setDeviceFilter(device)}>
                {device}
              </DropdownMenuItem>
            ))}
          </>
        );
      case 'status':
        return (
          <>
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("muted")}>
              Muted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("unacknowledged")}>
              Unacknowledged
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("acknowledged")}>
              Acknowledged
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>
              Resolved
            </DropdownMenuItem>
          </>
        );
      case 'assignedTo':
        return (
          <>
            <DropdownMenuItem onClick={() => setAssigneeFilter("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAssigneeFilter("assigned")}>
              Assigned
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAssigneeFilter("unassigned")}>
              Unassigned
            </DropdownMenuItem>
          </>
        );
      case 'urgent':
        return (
          <>
            <DropdownMenuItem onClick={() => setUrgentFilter("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUrgentFilter("urgent")}>
              Urgent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUrgentFilter("not-urgent")}>
              Not Urgent
            </DropdownMenuItem>
          </>
        );
      case 'severity':
        return (
          <>
            <DropdownMenuItem onClick={() => setSeverityFilter("all")}>
              All Severities
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverityFilter("Warning")}>
              Warning
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverityFilter("Critical")}>
              Critical
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverityFilter("Info")}>
              Info
            </DropdownMenuItem>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <TableHeader>
      <TableRow className="border-b border-alarm-card hover:bg-transparent">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columns}
            strategy={horizontalListSortingStrategy}
          >
            {columns.map((column) => (
              <DraggableHeader
                key={column.id}
                id={column.id}
                className="text-alarm-muted"
              >
                {renderHeaderContent(column)}
              </DraggableHeader>
            ))}
          </SortableContext>
        </DndContext>
      </TableRow>
    </TableHeader>
  );
};

export default AlarmsTableHeader;
