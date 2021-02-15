import {Strategy} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import passport from 'passport';
import { ResourceService } from 'services';
import { IUser } from 'interfaces';
import { HttpException } from '../exceptions';
const opts = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,

}

passport.use(new Strategy(opts,async function(jwt_payload, done) {
    try {
        const user: IUser | null = await ResourceService.getByUsername(jwt_payload.username);
        if(user){
            const validPasswd = user.isValidPassword()
            if(!validPasswd) throw new HttpException(401, 'Authentication failed');
            return done(null, user);
        }
        else{
            throw new HttpException(401, 'Authentication failed');
        }
        
    } catch (err) {
        return done(err, false);
    }
}));