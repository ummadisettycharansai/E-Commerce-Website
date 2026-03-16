import { Request, Response } from 'express';
import prisma from '../config/database';
import { slugify, paginate } from '../utils/helpers';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../config/s3';
import { v4 as uuid } from 'uuid';

export const getProducts = async (req: Request, res: Response) => {
  const { category, brand, size, color, minPrice, maxPrice, sort, search, page = '1', limit = '12', featured } = req.query as any;

  const where: any = { isActive: true };
  if (category) where.category = { slug: category };
  if (brand) where.brand = { in: brand.split(',') };
  if (size) where.sizes = { hasSome: size.split(',') };
  if (color) where.colors = { hasSome: color.split(',') };
  if (minPrice || maxPrice) where.price = { gte: minPrice ? +minPrice : undefined, lte: maxPrice ? +maxPrice : undefined };
  if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { brand: { contains: search, mode: 'insensitive' } }];
  if (featured === 'true') where.isFeatured = true;

  const orderBy: any =
    sort === 'price_asc' ? { price: 'asc' } :
    sort === 'price_desc' ? { price: 'desc' } :
    sort === 'rating' ? { rating: 'desc' } :
    sort === 'newest' ? { createdAt: 'desc' } :
    { createdAt: 'desc' };

  const { skip, take } = paginate(+page, +limit);
  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip, take, include: { category: { select: { name: true, slug: true } } } }),
    prisma.product.count({ where }),
  ]);

  res.json({ products, total, page: +page, pages: Math.ceil(total / take) });
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: { category: true, reviews: { include: { user: { select: { name: true } } }, orderBy: { createdAt: 'desc' }, take: 10 } },
  });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const slug = slugify(req.body.name);
  const product = await prisma.product.create({ data: { ...req.body, slug } });
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.update({ where: { id: req.params.id }, data: req.body });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await prisma.product.update({ where: { id: req.params.id }, data: { isActive: false } });
  res.json({ message: 'Product deactivated' });
};

export const uploadImages = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files?.length) return res.status(400).json({ message: 'No files uploaded' });

  const urls = await Promise.all(
    files.map(async (file) => {
      const key = `products/${uuid()}-${file.originalname}`;
      await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }));
      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    })
  );

  // Since images is now a native String[] in PostgreSQL, we can use the push operator
  await prisma.product.update({
    where: { id: req.params.id },
    data: { images: { push: urls } },
  });

  res.json({ urls });
};
