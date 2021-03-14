import { Body, Controller, Req, Get, Post, UseGuards, Res, UnauthorizedException } from '@nestjs/common'

import { UsersService } from './users.service'
import { UsersDto } from './dto/users.dto'
import { LocalAuthGuard } from 'src/auth/local-auth.guard'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserRO } from './users.interface'


@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    /**
     * User create.
     * @param data User DTO
     * @returns 
     */
    @Post( 'create' )
    async create( @Body() data: UsersDto ) {
        return this.usersService.create( data )
    }

    /**
     * User login.
     * @param data User DTO
     * @param response HTTP Response
     * @returns 
     */
    @UseGuards( LocalAuthGuard )
    @Post( 'login' )
    async login( @Body() data: UsersDto, @Res( { passthrough: true } ) response ) {
        const res = await this.usersService.getToken( data.email )

        if ( ! res ) return null

        // Set httpOnly cookie.
        const cookieOptions = {
            path: '/',
            httpOnly: true,
            maxAge: 1860000
        }
        response.setCookie( 'Authentication', res, cookieOptions )

        return true
    }

    /**
     * User authenticate.
     * @param req HTTP Request
     * @param res HTTP Response
     * @returns 
     */
    @UseGuards( JwtAuthGuard )
    @Get( '/authenticate' )
    async authenticate( @Req() req, @Res( { passthrough: true } ) res ) {
        const { email } = req.user

        const token = await this.usersService.getToken( email )

        if ( ! email || ! token ) throw new UnauthorizedException()

        // Set httpOnly cookie.
        const cookieOptions = {
            path: '/',
            httpOnly: true,
            maxAge: 1860000
        }
        res.setCookie( 'Authentication', token, cookieOptions )

        return true
    }

    /**
     * Get user profile.
     * @param req HTTP Request
     * @returns 
     */
    @UseGuards( JwtAuthGuard )
    @Get( '/profile' )
    async getProfile( @Req() req ): Promise<UserRO> {
        const { user } = req

        return {
            ID: user.ID,
            email: user.email
        }
    }

    /**
     * Logout.
     * @param res HTTP Response
     */
    @UseGuards( JwtAuthGuard )
    @Post( '/logout' )
    async logout( @Res( { passthrough: true } ) res ) {
        // Set httpOnly cookie.
        const cookieOptions = {
            path: '/',
            httpOnly: true,
            maxAge: 0
        }
        res.setCookie( 'Authentication', '', cookieOptions )
    }
}