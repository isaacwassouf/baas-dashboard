import { API } from '$lib/api';
import type { TableViewResponse } from '$lib/types/contents';

export const listContent = async (tableName: string): Promise<TableViewResponse | undefined> => {
  try {
    const response = await API.post<TableViewResponse>(`/api/contents/tables/${tableName}`);

    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject('Failed to fetch tables');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch tables');
  }
};
