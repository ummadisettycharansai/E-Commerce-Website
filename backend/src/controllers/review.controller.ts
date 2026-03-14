import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getReviews = async (req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({
    where: { productId: req.params.id },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(reviews);
};

export const addReview = async (req: AuthRequest, res: Response) => {
  const { rating, comment } = req.body;
  const productId = req.params.id;
  const existing = await prisma.review.findFirst({ where: { userId: req.user!.id, productId } });
  if (existing) return res.status(409).json({ message: 'You already reviewed this product' });

  const review = await prisma.review.create({
    data: { userId: req.user!.id, productId, rating, comment },
    include: { user: { select: { name: true } } },
  });

  const agg = await prisma.review.aggregate({ where: { productId }, _avg: { rating: true }, _count: true });
  await prisma.product.update({
    where: { id: productId },
    data: { rating: agg._avg.rating ?? 0, reviewCount: agg._count },
  });

  res.status(201).json(review);
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  const review = await prisma.review.findUnique({ where: { id: req.params.id } });
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (review.userId !== req.user!.id && req.user!.role !== 'ADMIN')
    return res.status(403).json({ message: 'Forbidden' });
  await prisma.review.delete({ where: { id: review.id } });
  res.json({ message: 'Review deleted' });
};
