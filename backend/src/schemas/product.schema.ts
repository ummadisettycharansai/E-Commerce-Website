import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  salePrice: z.number().positive().optional(),
  categoryId: z.string(),
  brand: z.string(),
  sizes: z.array(z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL'])),
  colors: z.array(z.enum(['BLACK', 'WHITE', 'NAVY', 'GREY', 'BLUE', 'RED', 'GREEN', 'BROWN', 'BEIGE', 'OLIVE'])),
  stock: z.number().int().min(0),
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateProductSchema = createProductSchema.partial();
