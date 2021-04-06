import {IsNotEmpty} from 'class-validator'

export class RoutineUpdateSetDTO {
    @IsNotEmpty()
    readonly ID: number

    @IsNotEmpty()
    readonly exercise_id: number

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
