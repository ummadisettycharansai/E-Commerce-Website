import { z } from 'zod';

export const createOrderSchema = z.object({
  addressId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().min(1),
    size: z.string(),
    color: z.string(),
  })),
  stripePayId: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']),
});
