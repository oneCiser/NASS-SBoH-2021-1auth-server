import {
    NextFunction, RequestHandler, Response, Request,
  } from 'express';
import { IUser } from 'interfaces';
import { HttpException } from '../exceptions';
import { plainToClass } from 'class-transformer';
import {UserDTO} from '../dtos'

/**
 *
 * Valid of Role
 * @category Middlewares
 * @param {any[]} roles - true if should accept propertys unknow
 * @return {*}  {RequestHandler}
 */
const isRole = (roles:any[]):RequestHandler => (req: Request, res: Response, next: NextFunction) =>
{
    try {
        
        if(!req.user) next(new HttpException(403, 'Forbidden'))
        else{
            const user = <IUser>req['user']
            console.log(user)
            const hasRole = roles.find(role => {
                
                return user.type_user == role})
            
            if(hasRole) next()
            else{
                next(new HttpException(403, 'Forbidden'))
            }
        }
        
    } catch (error) {
        next(new HttpException(error.status || 500, error.message))
    }
}

export {
    isRole
}