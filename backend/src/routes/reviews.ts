import { Router } from 'express';
import { deleteReview } from '../controllers/review.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.delete('/:id', authMiddleware, deleteReview);

export default router;
