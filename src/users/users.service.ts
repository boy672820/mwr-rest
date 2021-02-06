import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { UsersDto } from './dto/users.dto';
import { UsersEntity } from './users.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository( UsersEntity )
        private readonly repository: Repository<UsersEntity>,
        private readonly jwtService: JwtService
    ) {}

    /**
     * Return JWT.
     * @param userData 
     */
    async loginRequest( userData: UsersDto ): Promise<any> {
        const payload = { email: userData.email }

        return {
            access_token: this.jwtService.sign( payload )
        }
    }

    // async fineOne( userData: UsersDto )

    /**
     * Login.
     * @param { email, password } login data.
     */
    async login( email: string, password: string ): Promise<UsersEntity> {
        const user = await this.repository.findOne( { email } )

        if ( user && await argon2.verify( user.password, password ) ) return user

        return null
    }

    /**
     * Sign in.
     * @param userData Sign in data.
     */
    async create( userData: UsersDto ): Promise<UsersEntity> {
        const isEmail = await this.repository.findOne( { email: userData.email } ) // Check duplicate email.

        if ( ! isEmail ) {
            const usersEntity = new UsersEntity()

            usersEntity.email = userData.email
            usersEntity.password = userData.password
    
            return await this.repository.save( usersEntity )
        }
        else {
            const errors = { email: '이미 존재하는 이메일 입니다.' }
            throw new HttpException( { message: '입력 정보 유효성검사 실패', errors }, HttpStatus.BAD_REQUEST )
        }
    }
}
