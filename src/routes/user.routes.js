import { Router } from 'express';
import UserController from '../controllers/UserController';
import uploader from '../config/multer';

const routes = Router();

routes.post('/', uploader.single('avatar'), UserController.store);

export default routes;
