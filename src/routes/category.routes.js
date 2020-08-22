import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const routes = Router();

routes.get('/', CategoryController.list);
routes.post('/', CategoryController.store);

export default routes;
