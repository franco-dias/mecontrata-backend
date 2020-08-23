import { Router } from 'express';

import ensureAuth from '../middlewares/ensureAuth';
import uploader from '../config/multer';
import AnnouncementController from '../controllers/AnnouncementController';
import CategoryAnnouncementController from '../controllers/CategoryAnnouncementController';
import UserAnnouncementController from '../controllers/UserAnnouncementController';
import SearchAnnouncementController from '../controllers/SearchAnnouncementController';

const routes = Router();

routes.get('/:id', AnnouncementController.index);

routes.get('/', AnnouncementController.list);
routes.get('/category/:categoryId', CategoryAnnouncementController.list);
routes.get('/user/:userId?', UserAnnouncementController.list);
routes.get('/search/list', SearchAnnouncementController.list);

routes.use(ensureAuth);
routes.post('/', uploader.array('files', 5), AnnouncementController.store);
routes.delete('/:id', AnnouncementController.delete);

export default routes;
