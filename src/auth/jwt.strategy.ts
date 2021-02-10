import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { jwtConstants } from './constants';
import { ProfileRO } from 'src/users/users.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
    constructor() {
        super( {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        } )
    }

    async validate( payload: ProfileRO ) {
        return { email: payload.email }
    }
}
