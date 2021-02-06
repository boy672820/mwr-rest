import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService
    ) {}

    async validateUser( email: string, password: string ): Promise<any> {
        const user = this.usersService.login( email, password )

        if ( user ) return user

        return null
    }
}
