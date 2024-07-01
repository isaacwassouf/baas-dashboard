import { API } from '$lib/api';
import type { AuthProvidersList } from '$lib/types/auth';

export const listAuthProviders = async (): Promise<AuthProvidersList | undefined> => {
  try {
    const response = await API.get('/api/auth/providers');

    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject('Failed to fetch auth providers');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch auth providers');
  }
};

export const enableAuthProvider = async (authProviderId: number): Promise<void> => {
  try {
    const response = await API.patch(`/api/auth/providers/${authProviderId}/enable`);

    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject('Failed enable auth provider');
  } catch (error) {
    console.error(error);
    throw new Error('Failed enable auth provider');
  }
};

export const disableAuthProvider = async (authProviderId: number): Promise<void> => {
  try {
    const response = await API.patch(`/api/auth/providers/${authProviderId}/disable`);

    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject('Failed enable auth provider');
  } catch (error) {
    console.error(error);
    throw new Error('Failed enable auth provider');
  }
};
