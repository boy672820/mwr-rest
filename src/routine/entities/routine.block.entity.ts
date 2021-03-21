import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {RoutineExerciseEntity} from './routine.exercise.entity'

@Entity('blocks')
export class RoutineBlockEntity {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    routine_id: number

    @Column()
    block_title: string

    @OneToMany((type) => RoutineExerciseEntity, (exercise) => exercise.block)
    exercises: RoutineExerciseEntity[]
}
