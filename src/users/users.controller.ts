import { Body, Controller, Req, Get, Post, Headers, UseGuards, Res } from '@nestjs/common'

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
    async login( @Body() userData: UsersDto, @Res( { passthrough: true } ) response ) {
        const res = await this.usersService.getTokens( userData )

        const cookieOptions = {
            path: '/',
            httpOnly: true,
            maxAge: 1860000
        }
        // Set httpOnly cookie.
        response.setCookie( 'authentication', res.user.cookie, cookieOptions )

        return res
    }

    @UseGuards( JwtAuthGuard )
    @Get( '/authenticate' )
    async authenticate( @Req() req ) {
        return req
    }

    @UseGuards( JwtAuthGuard )
    @Get( 'profile' )
    getProfile( @Req() req ): Promise<ProfileRO> {
        return req.user
    }
}