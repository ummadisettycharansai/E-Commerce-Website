import { Router } from 'express';
import { createPaymentIntent, stripeWebhook } from '../controllers/payment.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/intent', authMiddleware, createPaymentIntent);
router.post('/webhook', stripeWebhook);

export default router;
