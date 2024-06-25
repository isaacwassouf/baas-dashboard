export interface TableDetails {
  tableName: string;
  tableSize: number;
  tableCount: number;
  tableComment: string;
  createTime: string;
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
