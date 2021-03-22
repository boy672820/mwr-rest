import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {RoutineExerciseEntity} from 'src/routine/entities/routine.exercise.entity'
import {RecordEntity} from './entities/record.entity'
import {RecordController} from './record.controller'
import {RecordService} from './record.service'

@Module({
    imports: [TypeOrmModule.forFeature([RecordEntity, RoutineExerciseEntity])],
    controllers: [RecordController],
    providers: [RecordService],
})
export class RecordModule {}
