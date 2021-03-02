import { Router } from 'express';
import userRouter from './user.route';
/**
 * @module routers/auth
 */
const router = Router();
const prefix: string = '/api';
/**
 * @namespace userRouter
 */
router.use(`${prefix}/auth`, userRouter);

export default router;
