import { IsNotEmpty } from 'class-validator'

export class RoutineDateDTO {

    @IsNotEmpty()
    readonly year: number

    @IsNotEmpty()
    readonly month: number

    @IsNotEmpty()
    readonly date: number

}