import { Router } from 'express';

import ensureAuth from '../middlewares/ensureAuth';
import AnnouncementController from '../controllers/AnnouncementController';
import uploader from '../config/multer';

const routes = Router();

routes.use(ensureAuth);

routes.post('/', uploader.array('files', 5), AnnouncementController.store);

export default routes;
