import {Strategy, StrategyOptions} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import passport from 'passport';
import { ResourceService } from '../services';
import { IUser } from 'interfaces';
import { HttpException } from '../exceptions';
import '../config/dotenv';

const opt: StrategyOptions = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secret'
}

export default new Strategy(opt,
    async function(jwt_payload, done) {
    try {
        
        const user: IUser | null = await ResourceService.getByUsername(jwt_payload.username);
        if(user){
            return done(null, user);
        }
        else{
            throw new HttpException(401, 'Authentication failed');
        }
        
    } catch (err) {
        return done(err, false);
    }
});