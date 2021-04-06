import { IsNotEmpty } from 'class-validator'

export class RoutineExerciseDTO {

    @IsNotEmpty()
    readonly block_id: number

    @IsNotEmpty()
    readonly exercise_name: string

    @IsNotEmpty()
    readonly set_number: number

    @IsNotEmpty()
    readonly set_weight: number

    @IsNotEmpty()
    readonly set_reps: number

    @IsNotEmpty()
    readonly set_max_reps: number

    @IsNotEmpty()
    readonly set_disable_range: boolean

    @IsNotEmpty()
    readonly set_rir: number

    @IsNotEmpty()
    readonly set_rest: number

}