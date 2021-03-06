import { IsNotEmpty } from 'class-validator'

export class RoutineUpdateBlockDTO {

    @IsNotEmpty()
    readonly ID: number

    @IsNotEmpty()
    readonly block_title: string

}