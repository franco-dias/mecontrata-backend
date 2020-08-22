import { Router } from 'express';

import userRouter from './user.routes';
import sessionRouter from './session.routes';
import announcementRouter from './announcement.routes';
import categoryRouter from './category.routes';

const router = Router();

router.get('/', (_, res) => res.json({ ok: true }));

router.use('/user', userRouter);

router.use('/session', sessionRouter);

router.use('/ad', announcementRouter);

router.use('/category', categoryRouter);

export default router;
