import { Router } from 'express';
import multer from 'multer';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadImages } from '../controllers/product.controller';
import { getReviews, addReview, deleteReview } from '../controllers/review.controller';
import { authMiddleware } from '../middleware/auth';
import { adminMiddleware } from '../middleware/admin';
import { validate } from '../middleware/validate';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';
import { reviewSchema } from '../schemas/review.schema';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', getProducts);
router.get('/:slug', getProduct);
router.post('/', authMiddleware, adminMiddleware, validate(createProductSchema), createProduct);
router.put('/:id', authMiddleware, adminMiddleware, validate(updateProductSchema), updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);
router.post('/:id/images', authMiddleware, adminMiddleware, upload.array('images', 5), uploadImages);

router.get('/:id/reviews', getReviews);
router.post('/:id/reviews', authMiddleware, validate(reviewSchema), addReview);

export default router;
