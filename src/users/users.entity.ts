import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm'

import { IsEmail } from 'class-validator'
import * as argon2 from 'argon2'

@Entity( 'users' )
export class UsersEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    @IsEmail()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash( this.password )
    }
}