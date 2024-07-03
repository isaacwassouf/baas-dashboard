export interface LogEntry {
  service: string;
  message: string;
  createdAt: string;
  level: string;
  metaData: string;
}

export interface LogsList {
  logs: LogEntry[];
}

export enum Window {
  ALL_TIME,
  YESTERDAY,
  TODAY,
  LAST_WEEK,
  LAST_MONTH,
  LAST_THREE_MONTHS
}
