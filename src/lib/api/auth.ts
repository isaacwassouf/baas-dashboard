import { API } from '$lib/api';
import type {
  AuthProvider,
  AuthProvidersList,
  LoginAdminData,
  RegisterAdminData
} from '$lib/types/auth';

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

export const setAuthProviderCredentials = async (authProvider: AuthProvider): Promise<void> => {
  try {
    const response = await API.patch(`/api/auth/providers/${authProvider.id}/credentials`, {
      clientId: authProvider.clientId,
      clientSecret: authProvider.clientSecret
    });

    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject('Failed to set auth provider credentials');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to set auth provider credentials');
  }
};

export const registerAdmin = async (data: RegisterAdminData): Promise<void> => {
  try {
    const response = await API.post('/api/auth/admin/register', data);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    return Promise.reject('Failed to register admin');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to register admin');
  }
};

export const loginAdmin = async (data: LoginAdminData): Promise<void> => {
  try {
    const response = await API.post('/api/auth/admin/login', data);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    return Promise.reject('Failed to login admin');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to login admin');
  }
};

export const logoutAdmin = async (): Promise<void> => {
  try {
    const response = await API.post('/api/auth/admin/logout');

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    return Promise.reject('Failed to logout admin');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to logout admin');
  }
};
