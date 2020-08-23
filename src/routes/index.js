import { Router } from 'express';

import userRouter from './user.routes';
import sessionRouter from './session.routes';
import announcementRouter from './announcement.routes';
import categoryRouter from './category.routes';
import StatesController from '../controllers/StatesController';

const router = Router();

router.use('/ad', announcementRouter);
router.use('/session', sessionRouter);
router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.get('/states/list', StatesController.list);

router.get('/test', (_, res) => res.status(200).json({ ok: true }));

export default router;
