import { Request, Response } from 'express';
import prisma from '../config/database';
import { paginate } from '../utils/helpers';

export const getDashboard = async (_req: Request, res: Response) => {
  const [totalRevenue, totalOrders, totalUsers, topProducts, recentOrders, ordersByStatus] = await Promise.all([
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELLED' } } }),
    prisma.order.count(),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    }),
    prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true, email: true } } } }),
    prisma.order.groupBy({ by: ['status'], _count: true }),
  ]);

  const topProductDetails = await prisma.product.findMany({
    where: { id: { in: topProducts.map((p) => p.productId) } },
    select: { id: true, name: true, images: true, price: true },
  });

  res.json({
    revenue: totalRevenue._sum.total ?? 0,
    orders: totalOrders,
    users: totalUsers,
    topProducts: topProducts.map((tp) => ({
      ...topProductDetails.find((p) => p.id === tp.productId),
      sold: tp._sum.quantity,
    })),
    recentOrders,
    ordersByStatus,
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const { page = '1', limit = '20', status } = req.query as any;
  const where = status ? { status } : {};
  const { skip, take } = paginate(+page, +limit);
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where, skip, take, orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } }, items: true },
    }),
    prisma.order.count({ where }),
  ]);
  res.json({ orders, total, page: +page, pages: Math.ceil(total / take) });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const { page = '1', limit = '20' } = req.query as any;
  const { skip, take } = paginate(+page, +limit);
  const [users, total] = await Promise.all([
    prisma.user.findMany({ skip, take, orderBy: { createdAt: 'desc' }, select: { id: true, email: true, name: true, role: true, createdAt: true, _count: { select: { orders: true } } } }),
    prisma.user.count(),
  ]);
  res.json({ users, total, page: +page, pages: Math.ceil(total / take) });
};

export const updateUserRole = async (req: Request, res: Response) => {
  const user = await prisma.user.update({ where: { id: req.params.id }, data: { role: req.body.role } });
  res.json({ id: user.id, email: user.email, role: user.role });
};
