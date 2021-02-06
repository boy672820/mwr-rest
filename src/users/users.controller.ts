import { Body, Controller, Request, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { UsersService } from './users.service'
import { UsersDto } from './dto/users.dto'
import { UsersAuthGuard } from '../auth/users-auth.guard'


@Controller('user')
export class UsersController {
    constructor( private readonly usersService: UsersService ) {}

    @UseGuards( UsersAuthGuard )
    @Post( 'login' )
    async login( @Request() req ) {
        return req.user
    }

    @Post( 'create' )
    async create( @Body() userData: UsersDto ) {
        return this.usersService.create( userData )
    }
}