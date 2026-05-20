import { UserResponse } from './auth.types';

export const toUserResponse = (user: UserResponse): UserResponse => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  avatarUrl: user.avatarUrl,
  createdAt: user.createdAt,
});
