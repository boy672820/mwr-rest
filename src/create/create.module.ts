import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CreateController } from './create.controller'
import { CreateService } from './create.service'
import { CreateBlockEntity } from './entities/create.block.entity'
import { CreateExerciseEntity } from './entities/create.exercise.entity'
import { CreateRoutineEntity } from './entities/create.routine.entity'
import { CreateSetEntity } from './entities/create.sets.entity'


@Module({
  imports: [
    TypeOrmModule.forFeature( [
      CreateRoutineEntity,
      CreateBlockEntity,
      CreateExerciseEntity,
      CreateSetEntity
    ] ),
  ],
  controllers: [CreateController],
  providers: [CreateService]
})
export class CreateModule {}
