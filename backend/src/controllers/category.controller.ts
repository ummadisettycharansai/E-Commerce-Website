import { Request, Response } from 'express';
import prisma from '../config/database';
import { slugify } from '../utils/helpers';

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany({ include: { _count: { select: { products: true } } } });
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, image } = req.body;
  const category = await prisma.category.create({ data: { name, slug: slugify(name), image } });
  res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const category = await prisma.category.update({ where: { id: req.params.id }, data: req.body });
  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ message: 'Category deleted' });
};
