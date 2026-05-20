import { createZodDto } from 'nestjs-zod';
import z from 'zod';

function hasAllCharTypes(password: string): boolean {
  return (
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password)
  );
}

const bsiPasswordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters long')
  .refine(hasAllCharTypes, {
    message:
      'Password must contain uppercase letter, lowercase letter, digit and special character',
  })
  .meta({ example: 'P@ssw0rd!123' });

export const RegisterSchema = z.object({
  email: z.email().meta({ example: 'max.mustermann@example.com' }),
  password: bsiPasswordSchema,
});

export const LoginSchema = z.object({
  email: z.email().meta({ example: 'max.mustermann@example.com' }),
  password: z.string().min(1),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}

export class LoginDto extends createZodDto(LoginSchema) {}
