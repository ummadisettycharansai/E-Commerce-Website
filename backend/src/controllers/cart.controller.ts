import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getCart = async (req: AuthRequest, res: Response) => {
  const items = await prisma.cartItem.findMany({
    where: { userId: req.user!.id },
  });
  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } }, select: { id: true, name: true, slug: true, price: true, salePrice: true, images: true, stock: true } });
  const result = items.map((i) => ({ ...i, product: products.find((p) => p.id === i.productId)! }));
  res.json(result);
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  const { productId, quantity, size, color } = req.body;
  const existing = await prisma.cartItem.findFirst({ where: { userId: req.user!.id, productId, size, color } });
  if (existing) {
    const item = await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + quantity } });
    return res.json(item);
  }
  const item = await prisma.cartItem.create({ data: { userId: req.user!.id, productId, quantity, size, color } });
  res.status(201).json(item);
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  const item = await prisma.cartItem.findFirst({ where: { id: req.params.itemId, userId: req.user!.id } });
  if (!item) return res.status(404).json({ message: 'Cart item not found' });
  const updated = await prisma.cartItem.update({ where: { id: item.id }, data: { quantity: req.body.quantity } });
  res.json(updated);
};

export const removeCartItem = async (req: AuthRequest, res: Response) => {
  await prisma.cartItem.deleteMany({ where: { id: req.params.itemId, userId: req.user!.id } });
  res.json({ message: 'Item removed' });
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  await prisma.cartItem.deleteMany({ where: { userId: req.user!.id } });
  res.json({ message: 'Cart cleared' });
};
