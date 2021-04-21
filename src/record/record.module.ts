import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {RoutineExerciseEntity} from 'src/routine/entities/routine.exercise.entity'
import {RoutineSetsEntity} from 'src/routine/entities/routine.sets.entity'
import {RecordEntity} from './entities/record.entity'
import {RecordItemEntity} from './entities/record_item.entity'
import {RecordController} from './record.controller'
import {RecordService} from './record.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RecordEntity,
            RecordItemEntity,
            RoutineExerciseEntity,
            RoutineSetsEntity,
        ]),
    ],
    controllers: [RecordController],
    providers: [RecordService],
})
export class RecordModule {}
