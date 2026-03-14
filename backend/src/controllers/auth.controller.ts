import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import prisma from '../config/database';
import { signToken } from '../utils/jwt';
import { sendPasswordResetEmail } from '../utils/email';
import { AuthRequest } from '../middleware/auth';

const resetTokens = new Map<string, { userId: string; expires: Date }>();

export const register = async (req: Request, res: Response) => {
  const { email, password, name, phone } = req.body;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Email already registered' });
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed, name, phone } });
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
};

export const logout = (_req: Request, res: Response) => res.json({ message: 'Logged out' });

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, email: true, name: true, phone: true, role: true, createdAt: true },
  });
  res.json(user);
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.json({ message: 'If that email exists, a reset link was sent.' });
  const token = crypto.randomBytes(32).toString('hex');
  resetTokens.set(token, { userId: user.id, expires: new Date(Date.now() + 3600000) });
  await sendPasswordResetEmail(email, token);
  res.json({ message: 'If that email exists, a reset link was sent.' });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  const entry = resetTokens.get(token);
  if (!entry || entry.expires < new Date()) return res.status(400).json({ message: 'Invalid or expired token' });
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.update({ where: { id: entry.userId }, data: { password: hashed } });
  resetTokens.delete(token);
  res.json({ message: 'Password reset successful' });
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user || !(await bcrypt.compare(currentPassword, user.password)))
    return res.status(400).json({ message: 'Current password is incorrect' });
  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });
  res.json({ message: 'Password changed successfully' });
};
