import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoutineSetsEntity } from "./routine.sets.entity";

@Entity( 'exercises' )
export class RoutineExerciseEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    block_id: number

    @Column()
    exercise_name: string

    @OneToMany(
        type => RoutineSetsEntity,
        set => set.exercise
    )
    sets: RoutineSetsEntity[]

}