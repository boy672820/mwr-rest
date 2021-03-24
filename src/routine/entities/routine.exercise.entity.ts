import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import {RoutineBlockEntity} from './routine.block.entity'
import {RoutineSetsEntity} from './routine.sets.entity'

@Entity('exercises')
export class RoutineExerciseEntity {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    block_id: number

    @Column()
    exercise_name: string

    @OneToMany(() => RoutineSetsEntity, (set) => set.exercise)
    sets: RoutineSetsEntity[]

    @ManyToOne(() => RoutineBlockEntity, (block) => block.exercises, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'block_id'})
    block: RoutineBlockEntity
}
