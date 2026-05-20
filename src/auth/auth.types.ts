export interface UserResponse {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

export interface AuthResponse {
  accessToken: string;
  user: UserResponse;
}
