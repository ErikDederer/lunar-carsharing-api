import z from 'zod';

export const CreateCarSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce.number().min(1900).max(new Date().getFullYear()),
  fuelType: z.enum(['petrol', 'diesel', 'electric', 'hybrid']),
  transmission: z.enum(['manual', 'automatic']),
  description: z.string().optional(),
  pricePerDay: z.coerce.number().positive(),
  deposit: z.coerce.number().nonnegative(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  address: z.string().min(1),
});

export type CreateCarDto = z.infer<typeof CreateCarSchema>;
