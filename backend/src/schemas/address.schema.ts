import { z } from 'zod';

export const addressSchema = z.object({
  line1: z.string().min(5),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(4),
  country: z.string().min(2),
  isDefault: z.boolean().optional(),
});
