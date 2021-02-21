import { IsNotEmpty } from 'class-validator'

export class RoutineBlockDTO {

    @IsNotEmpty()
    readonly routine_id: number

    @IsNotEmpty()
    readonly routine_date: string

    @IsNotEmpty()
    readonly block_title: string

}