import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {RoutineController} from './routine.controller'
import {RoutineService} from './routine.service'
import {UsersEntity} from 'src/users/users.entity'
import {RoutineSetsEntity} from './entities/routine.sets.entity'
import {RoutineExerciseEntity} from './entities/routine.exercise.entity'
import {RoutineBlockEntity} from './entities/routine.block.entity'
import {RoutineDateEntity} from './entities/routine.routine_date.entity'
import {RoutineEntity} from './entities/routine.entity'
import {RoutineRecordsEntity} from './entities/routine.record.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsersEntity,
            RoutineEntity,
            RoutineDateEntity,
            RoutineBlockEntity,
            RoutineExerciseEntity,
            RoutineSetsEntity,
            RoutineRecordsEntity,
        ]),
    ],
    controllers: [RoutineController],
    providers: [RoutineService],
})
export class RoutineModule {}
