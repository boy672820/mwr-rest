import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UsersEntity } from 'src/users/users.entity'
import { AuthService } from './auth.service'

import { jwtConstants } from './constants'

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
    constructor( private authService: AuthService ) {
        super( {
            jwtFromRequest: ExtractJwt.fromExtractors( [
                ( request: Request ) => {
                    return request?.cookies?.Authentication
                }
            ] ),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        } )
    }

    async validate( payload: any ): Promise<UsersEntity> {
        const user = await this.authService.findOneByEmail( payload.email )

        if ( user ) return user

        else throw new UnauthorizedException()
    }
}
