import { Router } from 'express';
import { getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../controllers/address.controller';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { addressSchema } from '../schemas/address.schema';

const router = Router();

router.use(authMiddleware);
router.get('/', getAddresses);
router.post('/', validate(addressSchema), addAddress);
router.put('/:id', validate(addressSchema), updateAddress);
router.delete('/:id', deleteAddress);
router.patch('/:id/default', setDefaultAddress);

export default router;
