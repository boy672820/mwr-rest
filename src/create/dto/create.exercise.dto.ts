import { IsNotEmpty } from 'class-validator'

export class CreateExerciseDTO {

    @IsNotEmpty()
    readonly exercise_name: string

    @IsNotEmpty()
    readonly set_number: number

    @IsNotEmpty()
    readonly reps: number

    @IsNotEmpty()
    readonly max_reps: number

    @IsNotEmpty()
    readonly disable_range: boolean

    @IsNotEmpty()
    readonly weight: number

    @IsNotEmpty()
    readonly rir: number
}