import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( 'exercises' )
export class RoutineExerciseEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    block_id: number

    @Column()
    exercise_name: string

}