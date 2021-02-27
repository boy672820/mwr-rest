import { IsNotEmpty } from 'class-validator'

export class RoutineUpdateExerciseDTO {

    @IsNotEmpty()
    readonly ID: number

    @IsNotEmpty()
    readonly exercise_name: string

}