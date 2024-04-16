export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  name: string;
  token: string;
}
