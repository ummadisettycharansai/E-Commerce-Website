import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import prisma from '../config/database';

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ message: 'Invalid or expired token' });

  const user = await prisma.user.findUnique({ where: { id: (payload as any).id }, select: { id: true, email: true, role: true } });
  if (!user) return res.status(401).json({ message: 'User not found' });

  req.user = user;
  next();
};
