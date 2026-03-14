import { Response, Request } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { paginate } from '../utils/helpers';

const orderInclude = {
  items: { include: { product: { select: { name: true, images: true, slug: true } } } },
  address: true,
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  const { page = '1', limit = '10' } = req.query as any;
  const where = req.user!.role === 'ADMIN' ? {} : { userId: req.user!.id };
  const { skip, take } = paginate(+page, +limit);
  const [orders, total] = await Promise.all([
    prisma.order.findMany({ where, include: orderInclude, orderBy: { createdAt: 'desc' }, skip, take }),
    prisma.order.count({ where }),
  ]);
  res.json({ orders, total, page: +page, pages: Math.ceil(total / take) });
};

export const getOrder = async (req: AuthRequest, res: Response) => {
  const order = await prisma.order.findUnique({ where: { id: req.params.id }, include: orderInclude });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (req.user!.role !== 'ADMIN' && order.userId !== req.user!.id)
    return res.status(403).json({ message: 'Forbidden' });
  res.json(order);
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  const { addressId, items, stripePayId } = req.body;
  const products = await prisma.product.findMany({ where: { id: { in: items.map((i: any) => i.productId) } } });
  const total = items.reduce((sum: number, item: any) => {
    const p = products.find((p) => p.id === item.productId)!;
    return sum + (p.salePrice ?? p.price) * item.quantity;
  }, 0);
  const order = await prisma.order.create({
    data: {
      userId: req.user!.id, addressId, total, stripePayId,
      items: { create: items.map((item: any) => {
        const p = products.find((p) => p.id === item.productId)!;
        return { productId: item.productId, quantity: item.quantity, size: item.size, color: item.color, price: p.salePrice ?? p.price };
      })},
    },
    include: orderInclude,
  });
  await prisma.cartItem.deleteMany({ where: { userId: req.user!.id } });
  res.status(201).json(order);
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  const order = await prisma.order.update({ where: { id: req.params.id }, data: { status: req.body.status } });
  res.json(order);
};

export const cancelOrder = async (req: AuthRequest, res: Response) => {
  const order = await prisma.order.findUnique({ where: { id: req.params.id } });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.userId !== req.user!.id && req.user!.role !== 'ADMIN')
    return res.status(403).json({ message: 'Forbidden' });
  if (!['PENDING', 'CONFIRMED'].includes(order.status))
    return res.status(400).json({ message: 'Order cannot be cancelled' });
  const updated = await prisma.order.update({ where: { id: order.id }, data: { status: 'CANCELLED' } });
  res.json(updated);
};
