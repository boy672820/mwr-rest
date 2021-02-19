import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CreateController } from './create.controller'
import { CreateService } from './create.service'
import { CreateExerciseEntity } from './entities/create.exercise.entity'
import { CreateSetEntity } from './entities/create.sets.entity'


@Module({
  imports: [
    TypeOrmModule.forFeature( [ CreateExerciseEntity, CreateSetEntity ] ),
  ],
  controllers: [CreateController],
  providers: [CreateService]
})
export class CreateModule {}
