import { Body, Controller, Req, Get, Post, UseGuards } from '@nestjs/common'

import { UsersService } from './users.service'
import { UsersDto } from './dto/users.dto'
import { LocalAuthGuard } from 'src/auth/local-auth.guard'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ProfileRO, UserRO } from './users.interface'


@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @UseGuards( LocalAuthGuard )
    @Post( 'login' )
    async login( @Body() userData: UsersDto ): Promise<UserRO> {
        return this.usersService.loginRequest( userData )
    }

    @UseGuards( JwtAuthGuard )
    @Get( 'profile' )
    getProfile( @Req() req ): Promise<ProfileRO> {
        return req.user
    }

    @Post( 'create' )
    async create( @Body() userData: UsersDto ) {
        return this.usersService.create( userData )
    }

    @Post( 'test' )
    async test( @Body() data: any ): Promise<string> {
        return `${data.test} // request success!`
    }

    @Get( 'get' )
    public async getTest(): Promise<string> {
        return 'get test success'
    }
}