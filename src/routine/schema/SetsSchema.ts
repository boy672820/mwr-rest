import {EntitySchema} from 'typeorm'
import {RoutineSetsEntity} from '../entities/routine.sets.entity'

export const SetsSchema = new EntitySchema<RoutineSetsEntity>({
    name: 'RoutineSetsEntity',
    target: RoutineSetsEntity,
    columns: {
        ID: {
            type: Number,
            primary: true,
            generated: true,
        },
        exercise_id: {
            type: Number,
        },
        set_number: {
            type: Number,
        },
        set_weight: {
            type: 'decimal',
        },
        set_reps: {
            type: Number,
        },
        set_max_reps: {
            type: Number,
        },
        set_disable_range: {
            type: Number,
        },
        set_rir: {
            type: Number,
        },
        set_rest: {
            type: Number,
        },
    },
    relations: {
        exercise: {
            type: 'many-to-one',
            target: 'RoutineExerciseEntity', // the name of the PhotoSchema
        },
    },
})
