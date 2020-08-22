import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = Router();

router.post('/', CategoryController.store);

export default router;
