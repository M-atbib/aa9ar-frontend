// Basic user interface with name and email
export interface User {
  id: string;
  full_name: string;
  email: string;
  status: "ACTIVE" | "ONBOARDING";
  last_login: string;
  auth_type: string;
  roles: {
    name: string;
    permissions: string[];
  }[];
}

// Data required for user registration
export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// Data required for user login
export interface LoginData {
  email: string;
  password: string;
}

// Data required for token refresh
export interface RefreshTokenData {
  refresh_token: string;
}

// Role interface defining user permissions
export interface Role {
  name: string;
  permissions: string[];
}

// Extended user details including id, status and roles
export interface UserDetails extends User {
  id: string;
  status: "ACTIVE" | "ONBOARDING";
  roles: Role[];
}

// Response structure for successful registration and login
export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: UserDetails;
}

// Response structure for successful login
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: UserDetails;
}
