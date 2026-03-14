import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getWishlist = async (req: AuthRequest, res: Response) => {
  const items = await prisma.wishlistItem.findMany({
    where: { userId: req.user!.id },
    include: { product: { select: { id: true, name: true, slug: true, price: true, salePrice: true, images: true, rating: true } } },
  });
  res.json(items);
};

export const addToWishlist = async (req: AuthRequest, res: Response) => {
  const item = await prisma.wishlistItem.upsert({
    where: { userId_productId: { userId: req.user!.id, productId: req.params.productId } },
    update: {},
    create: { userId: req.user!.id, productId: req.params.productId },
  });
  res.status(201).json(item);
};

export const removeFromWishlist = async (req: AuthRequest, res: Response) => {
  await prisma.wishlistItem.deleteMany({ where: { userId: req.user!.id, productId: req.params.productId } });
  res.json({ message: 'Removed from wishlist' });
};
