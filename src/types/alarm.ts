export interface Alarm {
  id: string;
  device: string;
  status: "Unacknowledged" | "Acknowledged" | "In Progress" | "Resolved" | "Muted";
  description: string;
  assignedTo: string | null;
  urgent: boolean;
  timeElapsed: string;
  severity: "Warning" | "Critical" | "Info";
}

export type SortField = keyof Alarm;
export type SortDirection = "asc" | "desc";
export type StatusFilter = "all-active" | "muted" | "unacknowledged" | "acknowledged" | "resolved";
export type DeviceFilter = string | "all";
export type AssigneeFilter = "all" | "assigned" | "unassigned";
export type UrgentFilter = "all" | "urgent" | "not-urgent";
export type SeverityFilter = "all" | "Warning" | "Critical" | "Info";