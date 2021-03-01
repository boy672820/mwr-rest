import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { UsersDto } from './dto/users.dto';
import { UsersEntity } from './users.entity';
import { UserRO } from './users.interface'


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository( UsersEntity )
        private readonly repository: Repository<UsersEntity>,
        private readonly jwtService: JwtService
    ) {}

    /**
     * Return JWT.
     * @param userData UsersDto
     */
    async loginRequest( { email }: UsersDto ): Promise<UserRO> {
        const refresh_token = await this.jwtService.sign( { email: email, refresh: true }  )
        const access_token = await this.jwtService.sign( { email: email, refresh_token: refresh_token } )

        // Update user token.
        await this.repository.update(
            { email: email },
            { token: refresh_token }
        )

        return {
            user: {
                email: email,
                token: access_token,
                refresh_token: refresh_token
            }
        }
    }

    /**
     * Get refresh token.
     * @param email string
     */
    async getRefreshToken( email ): Promise<UserRO> {
        const payload = { email: email, refresh: true }
        
        const refresh_token = await this.jwtService.sign( payload )
        const access_token = await this.jwtService.sign( { email: email, refresh_token: refresh_token } )

        // Update user token.
        this.repository.update(
            { email: email },
            { token: refresh_token }
        )

        return {
            user: {
                email: email,
                token: access_token,
                refresh_token: refresh_token
            }
        }
    }

    /**
     * Get access token when user refresh page.
     * @param refresh_token string
     */
    async getAccessToken( refresh_token: string ): Promise<UserRO> {
        // Get user private email.
        const user = await this.repository.findOne( { token: refresh_token } )

        if ( ! user ) throw new HttpException( { message: '인증 정보가 일치하지 않습니다. 다시 로그인 해주세요.' }, HttpStatus.BAD_REQUEST )

        // Create Refresh token & access token.
        const new_refresh = await this.jwtService.sign( { email: user.email, refresh: true } )
        const access_token = await this.jwtService.sign( { email: user.email, refresh_token: new_refresh } )

        // Update token from user.
        this.repository.update(
            { email: user.email },
            { token: new_refresh }
        )

        return { // Return UserRo.
            user: {
                email: user.email,
                token: access_token,
                refresh_token: new_refresh
            }
        }
    }

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

    /**
     * Validate access token.
     * @param email User email.
     * @param refresh_token User refresh token.
     */
    async validateAccessToken( email: string, refresh_token: string ): Promise<UsersEntity> {
        const user = await this.repository.findOne( { email: email, token: refresh_token } )

        return user
    }
}
