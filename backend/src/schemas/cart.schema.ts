import { z } from 'zod';

export const addCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1),
  size: z.string(),
  color: z.string(),
});

export const updateCartItemSchema = z.object({ quantity: z.number().int().min(1) });
