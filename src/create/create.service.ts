import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateExerciseEntity } from './entities/create.exercise.entity';
import { CreateSetEntity } from './entities/create.sets.entity';
import { CreateExerciseDTO } from './dto/create.exercise.dto';
import { CreateBlockEntity } from './entities/create.block.entity';
import { CreateRoutineEntity } from './entities/create.routine.entity';


@Injectable()
export class CreateService {

    constructor(
        @InjectRepository( CreateRoutineEntity )
        private readonly routineRepository: Repository<CreateRoutineEntity>,

        @InjectRepository( CreateBlockEntity )
        private readonly blockRepository: Repository<CreateBlockEntity>,

        @InjectRepository( CreateExerciseEntity )
        private readonly exerciseRepository: Repository<CreateExerciseEntity>,

        @InjectRepository( CreateSetEntity )
        private readonly setRepository: Repository<CreateSetEntity>,
    ) {}

    async createDefaultExercise( data: CreateExerciseDTO ): Promise<any> {
        const routine = await this.routineRepository.findOne( {
            user_id: data.user_id,
            routine_active: 1
        } )

        const block = await this.createBlock( routine.ID )

        const createExerciseEntity = new CreateExerciseEntity()
        createExerciseEntity.block_id = block.ID
        createExerciseEntity.exercise_name = data.exercise_name

        console.log( createExerciseEntity )

        // const exercise = await this.exerciseRepository.save( createExerciseEntity )

        return 'exercise'
    }

    async createBlock( routine_id: number ) {
        const createBlockEntity = new CreateBlockEntity()
        createBlockEntity.routine_id = routine_id
        createBlockEntity.block_title = '운동 기록'

        return await this.blockRepository.save( createBlockEntity )
    }

}
