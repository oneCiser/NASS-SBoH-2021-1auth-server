import {
  NextFunction, Request, Response, Router,
} from 'express';
import { IRoute, IUser } from '../interfaces';
import { ResourceUserController } from '../controller';
import { 
  isDefinedParamMiddleware, 
  validationMiddleware, 
  isRole,
  isTokenTypeMiddleware
} from '../middlewares';
import { AuthDTO, EmailDTO, UserDTO } from '../dtos';
import passport from 'passport';
import {ROLES,tokenType} from '../utils'

/**
 *
 * Managament the routes of resource
 * @category Routes
 * @class Auth routes
 * @implements {IRoute}
 */
class UserRouter implements IRoute {
  public router = Router();

  public pathIdParam = '/:id';

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {

 

    /**
     * @description send message for restore password
     */
    this.router.post(
      '/forgot',
      validationMiddleware(EmailDTO),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
      .forgotPassword(req, res, next)

    )


    this.router.put(
      '/restore',
      passport.authenticate('jwt',{session:false}),
      isTokenTypeMiddleware([tokenType.Restore]),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
      .restorePassword(req, res, next)
    )

    /**
     * @description create new user
     */
    this.router.post(
      '/',
      validationMiddleware(UserDTO),
      passport.authenticate('jwt',{session:false}),
      isRole([ROLES.Admin]),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
        .create(req, res, next)
    );

    /**
     * @description login user
     */
    this.router.post(
      '/login',
      validationMiddleware(AuthDTO),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
      .login(req, res, next),
    );

    /**
     * @description update user by id
     */
    this.router.put(
      this.pathIdParam,
      isDefinedParamMiddleware(),
      validationMiddleware(UserDTO, true),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
        .updateById(req, res, next),
    );

    /**
     * @description delete user by id
     */
    this.router.delete(
      this.pathIdParam,
      isDefinedParamMiddleware(),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
        .removeById(req, res, next),
    );

  }
}
export default new UserRouter().router;
