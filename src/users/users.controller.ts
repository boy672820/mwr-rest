import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { UsersService } from './users.service'
import { UsersDto } from './dto/users.dto'
import { LocalAuthGuard } from 'src/auth/local-auth.guard'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'


@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @UseGuards( LocalAuthGuard )
    @Post( 'login' )
    async login( @Body() userData: UsersDto ) {
        return this.usersService.loginRequest( userData )
    }

    @UseGuards( JwtAuthGuard )
    @Get( 'profile' )
    getProfile( @Body() userData: UsersDto ) {
        return 'Success auth.'
    }

    @Post( 'create' )
    async create( @Body() userData: UsersDto ) {
        return this.usersService.create( userData )
    }
}