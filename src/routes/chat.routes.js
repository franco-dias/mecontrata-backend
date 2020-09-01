import { Router } from 'express';

import ensureAuth from '../middlewares/ensureAuth';

import RoomController from '../mongoose/controllers/RoomController';
import MessageController from '../mongoose/controllers/MessageController';

const routes = Router();

routes.use(ensureAuth);

routes.post('/room', RoomController.store);

routes.get('/room/:roomId', RoomController.index);
routes.get('/room', RoomController.list);

routes.get('/message/room/:roomId', MessageController.list);
routes.put('/message/room/:roomId', MessageController.update);

routes.post('/message', MessageController.store);

export default routes;
