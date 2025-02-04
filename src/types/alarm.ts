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