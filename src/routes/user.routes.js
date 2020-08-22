import { Router } from 'express';
import UserController from '../controllers/UserController';
import uploader from '../config/multer';

const router = Router();

router.get('/:id', UserController.index);

router.get('/', UserController.list);

router.post('/', uploader.single('avatar'), UserController.store);

export default router;
