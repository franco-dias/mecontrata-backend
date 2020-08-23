import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const routes = Router();

routes.get('/:id', CategoryController.index);

routes.get('/', CategoryController.list);
// routes.post('/', CategoryController.store);

routes.post('/', CategoryController.store);

export default routes;
