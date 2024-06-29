import { API } from '$lib/api';
import {
  type AddTableDetails,
  type ColumnDetailsList,
  type TableDetailsList,
  type AddForeignKeyDetails,
  type ColumnDetails,
  type AddColumnDetails,
  type NewColumnDetails
} from '$lib/types/schemas';

export const listTables = async (): Promise<TableDetailsList | undefined> => {
  try {
    const response = await API.get<TableDetailsList>('/api/schema/tables');

    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject('Failed to fetch tables');
  } catch (error) {
    console.error(error);
  }
};

export const createTable = async (table: AddTableDetails): Promise<void> => {
  console.log('table', table);
  try {
    const response = await API.post('/table', table);

    if (response.status === 200) {
      return Promise.resolve();
    }

    return Promise.reject('Failed to create table');
  } catch (error) {
    console.error(error);
  }
};

export const dropTable = async (tableName: string): Promise<void> => {
  try {
    const response = await API.delete(`/api/schema/tables/${tableName}`);

    if (response.status === 200) {
      return Promise.resolve();
    }

    return Promise.reject('Failed to drop table');
  } catch (error) {
    console.error(error);
    Promise.reject('Failed to drop table');
  }
};

export const listColumns = async (tableName: string): Promise<ColumnDetailsList | undefined> => {
  try {
    const response = await API.get<ColumnDetailsList>(`/api/schema/tables/${tableName}/columns/`);

    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject('Failed to fetch columns');
  } catch (error) {
    console.error(error);
    Promise.reject('Failed to drop table');
  }
};

export const addColumn = async (
  tableName: string,
  newColumnDetails: NewColumnDetails
): Promise<void> => {
  try {
    const response = await API.post(`/api/schema/tables/${tableName}/columns`, newColumnDetails);

    if (response.status === 200) {
      return Promise.resolve();
    }

    return Promise.reject('Failed to add foreign key');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add foreign key');
  }
};

export const dropColumn = async (tableName: string, columnName: string): Promise<void> => {
  try {
    const response = await API.delete(`/api/schema/tables/${tableName}/columns/${columnName}`);

    if (response.status === 200) {
      return Promise.resolve();
    }

    return Promise.reject('Failed to drop column');
  } catch (error) {
    console.error(error);
    Promise.reject('Failed to drop column');
  }
};

export const addForeignKey = async (addForeignKeyDetails: AddForeignKeyDetails): Promise<void> => {
  try {
    const response = await API.post(
      `/api/schema/tables/${addForeignKeyDetails.tableName}/foreign-keys`,
      addForeignKeyDetails
    );

    if (response.status === 200) {
      return Promise.resolve();
    }

    return Promise.reject('Failed to add foreign key');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add foreign key');
  }
};

export const dropForeignKey = async (tableName: string, foreignKeyName: string): Promise<void> => {
  try {
    const response = await API.delete(
      `/api/schema/tables/${tableName}/foreign-keys/${foreignKeyName}`
    );

    if (response.status === 200) {
      return Promise.resolve();
    }

    return Promise.reject('Failed to drop foreign key');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add foreign key');
  }
};
