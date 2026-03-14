import { Router } from 'express';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../controllers/cart.controller';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { addCartItemSchema, updateCartItemSchema } from '../schemas/cart.schema';

const router = Router();

router.use(authMiddleware);
router.get('/', getCart);
router.post('/', validate(addCartItemSchema), addToCart);
router.put('/:itemId', validate(updateCartItemSchema), updateCartItem);
router.delete('/:itemId', removeCartItem);
router.delete('/', clearCart);

export default router;
