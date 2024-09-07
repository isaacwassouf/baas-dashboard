import { API } from '$lib/api';
import type { MFAStatus } from '$lib/types/settings';

export const toggleMFA = async (): Promise<void> => {
  try {
    const response = await API.patch(`/api/auth/mfa/toggle`);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to toggle MFA');
  }
};

export const getMFA = async (): Promise<MFAStatus> => {
  try {
    const response = await API.get(`/api/auth/mfa`);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get MFA status');
  }
};
