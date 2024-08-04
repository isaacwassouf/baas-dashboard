export interface TableDetails {
  tableName: string;
  tableSize: number;
  tableCount: number;
  tableComment: string;
  createTime: string;
}

export interface TableDetailsList {
  tablesList: TableDetails[];
}

export interface AddTableDetails {
  tableName: string;
  tableComment: string;
  columns: NewColumnDetails[];
}

export interface ColumnDetails {
  columnName: string;
  columnType: string;
  columnDefault: string;
  isNotNullable: boolean;
  isUnique: boolean;
}

export interface ForeignKeyDetails {
  columnName: string;
  referenceTableName: string;
  referenceColumnName: string;
  onUpdate: string;
  onDelete: string;
}

export interface ColumnDetailsList {
  columnsList: ColumnDetails[];
  foreignKeysList: ForeignKeyDetails[];
}

export interface TableSelectOptionItem {
  value: string;
  label: string;
}

export interface ColumnSelectOptionItem {
  value: string;
  label: string;
}

export interface ReferenialActionSelectOptionItem {
  value: string;
  label: string;
}

export interface AddForeignKeyDetails {
  tableName: string;
  isNotNullable: boolean;
  foriegnKeyDetails: ForeignKeyDetails;
}

export interface ColumnTypeSelectOptionItem {
  value: string;
  label: string;
  root: string;
}

export interface NewColumnDetails extends ColumnDetails {
  columnLength: number;
  columnPrecision: number;
  columnScale: number;
}
