import { User } from '@prisma/client';
import { ProfileResponseDto } from './auth.dto';

export const toProfileResponseDto = (user: User): ProfileResponseDto => ({
  id: user.id,
  email: user.email,
  role: user.role,
});

export const toAdminProfileResponseDto = (user: User) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
