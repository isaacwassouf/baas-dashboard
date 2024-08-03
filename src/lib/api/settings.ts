import { API } from '$lib/api';

export const toggleMFA = async (): Promise<void> => {
  try {
    const response = await API.patch(`/api/auth/mfa/toggle`);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch SMTP config');
  }
};
