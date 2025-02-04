import { StatusFilter } from "@/types/alarm";

interface FilterPillsProps {
  statusFilter: StatusFilter;
  setStatusFilter: (value: StatusFilter) => void;
}

const FilterPill = ({ label, value, currentFilter, onClick }: { 
  label: string; 
  value: StatusFilter;
  currentFilter: StatusFilter;
  onClick: (value: StatusFilter) => void;
}) => (
  <button
    onClick={() => onClick(value)}
    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
      currentFilter === value
        ? "bg-alarm-accent text-alarm-background"
        : "bg-alarm-card hover:bg-alarm-card/80 text-alarm-muted"
    }`}
  >
    {label}
  </button>
);

const FilterPills = ({ statusFilter, setStatusFilter }: FilterPillsProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      <FilterPill label="All Active" value="all-active" currentFilter={statusFilter} onClick={setStatusFilter} />
      <FilterPill label="Muted" value="muted" currentFilter={statusFilter} onClick={setStatusFilter} />
      <FilterPill label="Unacknowledged" value="unacknowledged" currentFilter={statusFilter} onClick={setStatusFilter} />
      <FilterPill label="Acknowledged" value="acknowledged" currentFilter={statusFilter} onClick={setStatusFilter} />
      <FilterPill label="Resolved" value="resolved" currentFilter={statusFilter} onClick={setStatusFilter} />
    </div>
  );
};

export default FilterPills;