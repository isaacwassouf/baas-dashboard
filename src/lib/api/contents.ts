import { API } from '$lib/api';
import type { TableViewResponse } from '$lib/types/contents';

export const getContent = async (): Promise<TableViewResponse | undefined> => {
  try {
    const response = await API.get<TableViewResponse>('/api/contents/tables/comments');

    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject('Failed to fetch tables');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch tables');
  }
};
