import { Router } from 'express';
import userRouter from './user.route';

const router = Router();
const prefix: string = '/api';
/**
 * @name api/auth
 * @category Routes
 * @function
 * @description auth route
 * @memberof module:routers
 * @inner
 * @param {string} path - Express path
 * @param {Router} route - routes of
 */
router.use(`${prefix}/auth`, userRouter);

export default router;
