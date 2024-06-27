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

export interface AddColumnDetails {
  uniqueId: string;
  columnName: string;
  columnType: string;
  columnDefault: string;
  isPrimary: boolean;
  isNullable: boolean;
  isUnique: boolean;
}

export interface AddTableDetails {
  tableName: string;
  tableComment: string;
  columns: AddColumnDetails[];
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
