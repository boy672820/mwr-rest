import { IsNotEmpty } from 'class-validator'

export class UsersDto {

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}