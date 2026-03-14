import { Router } from 'express';
import { getOrders, getOrder, createOrder, updateOrderStatus, cancelOrder } from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth';
import { adminMiddleware } from '../middleware/admin';
import { validate } from '../middleware/validate';
import { createOrderSchema, updateOrderStatusSchema } from '../schemas/order.schema';

const router = Router();

router.use(authMiddleware);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', validate(createOrderSchema), createOrder);
router.patch('/:id/status', adminMiddleware, validate(updateOrderStatusSchema), updateOrderStatus);
router.post('/:id/cancel', cancelOrder);

export default router;
