export interface AuthProvider {
  id: number;
  name: string;
  active: boolean;
  clientId: string;
  clientSecret: string;
}

export interface AuthProvidersList {
  authProviders: AuthProvider[];
}
