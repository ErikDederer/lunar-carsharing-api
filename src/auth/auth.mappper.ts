import { User } from '@prisma/client';
import { ProfileResponseDto } from './auth.dto';

export const toProfileResponseDto = (user: User): ProfileResponseDto => ({
  id: user.id,
  email: user.email,
});

export const toAdminProfileResponseDto = (user: User) => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
