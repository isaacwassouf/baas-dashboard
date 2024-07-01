export interface TableViewRow {
  [key: string]: any;
  id: number;
  created_at: string;
  updated_at: string;
}

export interface TableViewResponse {
  entities: TableViewRow[];
  page: number;
  perPage: number;
  totalPages: number;
}
