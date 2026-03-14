import { Router } from 'express';
import { getDashboard, getAllOrders, getAllUsers, updateUserRole } from '../controllers/admin.controller';
import { authMiddleware } from '../middleware/auth';
import { adminMiddleware } from '../middleware/admin';

const router = Router();

router.use(authMiddleware, adminMiddleware);
router.get('/dashboard', getDashboard);
router.get('/orders', getAllOrders);
router.get('/users', getAllUsers);
router.patch('/users/:id', updateUserRole);

export default router;
