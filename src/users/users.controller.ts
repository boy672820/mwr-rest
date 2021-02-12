import { Body, Controller, Req, Get, Post, Headers, UseGuards } from '@nestjs/common'

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

    @Post( 'create' )
    async create( @Body() userData: UsersDto ) {
        return this.usersService.create( userData )
    }

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

    @UseGuards( JwtAuthGuard )
    @Post( 'refresh' )
    refreshToken( @Body() body ): Promise<UserRO> {
        return this.usersService.getRefreshToken( body.email )
    }

    @Post( 'get-access-token' )
    getAccessToken( @Headers() headers ) {
        return this.usersService.getAccessToken( headers.authorization )
    }
}