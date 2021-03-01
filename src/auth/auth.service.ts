import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/users/users.entity';

import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService
    ) {}

    async validateUser( email: string, password: string ): Promise<UsersEntity> {
        const user = await this.usersService.login( email, password )

        if ( user ) return user

        else return null
    }

    async validateAccessToken( email: string, refresh_token: string ): Promise<UsersEntity> {
        const user = await this.usersService.validateAccessToken( email, refresh_token )

        if ( user ) return user

        else return null
    }
}
