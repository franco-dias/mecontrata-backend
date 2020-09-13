import { Router } from 'express';

import ensureAuth from '../middlewares/ensureAuth';

import MessageController from '../mongoose/controllers/MessageController';
import MessageVisualizationController from '../mongoose/controllers/MessageVisualizationController';
import NewMessagesController from '../mongoose/controllers/NewMessagesController';

const routes = Router();

routes.use(ensureAuth);

routes.get('/message/room', MessageController.list);
routes.put('/message', MessageVisualizationController.update);
routes.post('/message', MessageController.store);

routes.get('/message/list', NewMessagesController.list);

export default routes;
