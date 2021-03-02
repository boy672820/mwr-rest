import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthService } from './auth.service'

import { jwtConstants } from './constants'

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
    constructor( private authService: AuthService ) {
        super( {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        } )
    }

    async validate( payload: any ) {
        const user = await this.authService.validateAccessToken( payload.email, payload.refresh_token )

        if ( user ) return { email: payload.email }

        else throw new UnauthorizedException()
    }
}
