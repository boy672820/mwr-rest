import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( 'exercises' )
export class CreateExerciseEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    block_id: number

    @Column()
    exercise_name: number

}