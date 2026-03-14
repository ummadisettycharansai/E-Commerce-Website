import { Request, Response } from 'express';
import stripe from '../config/stripe';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const createPaymentIntent = async (req: AuthRequest, res: Response) => {
  const { amount } = req.body;
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    metadata: { userId: req.user!.id },
  });
  res.json({ clientSecret: intent.client_secret });
};

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return res.status(400).json({ message: 'Webhook signature verification failed' });
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as any;
    await prisma.order.updateMany({ where: { stripePayId: pi.id }, data: { status: 'CONFIRMED' } });
  }

  res.json({ received: true });
};
