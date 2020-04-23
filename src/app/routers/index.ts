import { router as todoRouter } from './todo';
import { router as userRouter } from './user';
import { Router } from 'express';

export const router: Router = Router({ mergeParams: true });
router.use(todoRouter);
router.use(userRouter);