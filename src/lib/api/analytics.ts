import { API } from '$lib/api';
import type { LogsList, Window } from '$lib/types/analytics';

export const listLogs = async (window: Window): Promise<LogsList | undefined> => {
  try {
    const response = await API.get<LogsList>(`/api/analytics/?window=${window}`);

    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject('Failed to fetch logs');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch logs');
  }
};
