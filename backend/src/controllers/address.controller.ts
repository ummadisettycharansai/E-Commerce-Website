import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getAddresses = async (req: AuthRequest, res: Response) => {
  const addresses = await prisma.address.findMany({ where: { userId: req.user!.id } });
  res.json(addresses);
};

export const addAddress = async (req: AuthRequest, res: Response) => {
  const { isDefault, ...data } = req.body;
  if (isDefault) await prisma.address.updateMany({ where: { userId: req.user!.id }, data: { isDefault: false } });
  const address = await prisma.address.create({ data: { ...data, userId: req.user!.id, isDefault: isDefault ?? false } });
  res.status(201).json(address);
};

export const updateAddress = async (req: AuthRequest, res: Response) => {
  const address = await prisma.address.findFirst({ where: { id: req.params.id, userId: req.user!.id } });
  if (!address) return res.status(404).json({ message: 'Address not found' });
  const updated = await prisma.address.update({ where: { id: address.id }, data: req.body });
  res.json(updated);
};

export const deleteAddress = async (req: AuthRequest, res: Response) => {
  await prisma.address.deleteMany({ where: { id: req.params.id, userId: req.user!.id } });
  res.json({ message: 'Address deleted' });
};

export const setDefaultAddress = async (req: AuthRequest, res: Response) => {
  await prisma.address.updateMany({ where: { userId: req.user!.id }, data: { isDefault: false } });
  const address = await prisma.address.update({ where: { id: req.params.id }, data: { isDefault: true } });
  res.json(address);
};
