export interface AuthProvider {
  id: number;
  name: string;
  active: boolean;
  clientId: string;
  clientSecret: string;
  redirectURI: string;
}

export interface AuthProvidersList {
  authProviders: AuthProvider[];
}

export interface RegisterAdminData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginAdminData {
  email: string;
  password: string;
}

export interface Admin {
  id: number;
  email: string;
  is_admin: boolean;
}

export interface JWTAdminClaims {
  user: Admin;
  exp: number;
  iat: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
  authProvider: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersList {
  users: User[];
}
