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
import { Column } from "../AlarmsTable";
import { Dispatch, SetStateAction } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

interface AlarmsTableHeaderProps {
  columns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
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
  columns,
  setColumns,
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
  const isMobile = useIsMobile();
  
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
      setColumns((prevColumns) => {
        const oldIndex = prevColumns.findIndex((item) => item.id === active.id);
        const newIndex = prevColumns.findIndex((item) => item.id === over.id);
        return arrayMove(prevColumns, oldIndex, newIndex);
      });
    }
  };

  const renderHeaderContent = (column: Column) => {
    if (isMobile && !['device', 'timeElapsed'].includes(column.id)) {
      return null;
    }

    const baseClasses = "flex items-center px-3 py-2 rounded-full transition-all duration-200";
    const activeClasses = "bg-primary text-primary-foreground hover:bg-primary/90";
    const inactiveClasses = "bg-alarm-card hover:bg-alarm-card/90 text-foreground";
    const staticClasses = "text-foreground/70";

    switch (column.type) {
      case 'filterable':
      case 'both':
        return (
          <DropdownMenu>
            <DropdownMenuTrigger 
              className={`${baseClasses} ${
                isFilterActive(column.id)
                  ? activeClasses
                  : inactiveClasses
              }`}
            >
              {column.label}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {renderFilterContent(column.id)}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      case 'sortable':
        return (
          <div 
            className={`${baseClasses} ${inactiveClasses} cursor-pointer`}
            onClick={() => handleSort(column.id as SortField)}
          >
            {column.label} {getSortIcon(column.id as SortField)}
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} ${staticClasses}`}>
            {column.label}
          </div>
        );
    }
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
      <TableRow className="border-b-0 hover:bg-transparent bg-alarm-background/95 backdrop-blur-md shadow-md">
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
                className={`first:pl-4 last:pr-4 py-4 text-foreground font-medium text-sm border-b-2 border-alarm-card/30 ${
                  isMobile && !['device', 'timeElapsed'].includes(column.id) ? 'hidden' : ''
                }`}
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
