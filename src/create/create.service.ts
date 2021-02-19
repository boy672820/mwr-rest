import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateExerciseEntity } from './entities/create.exercise.entity';
import { CreateSetEntity } from './entities/create.sets.entity';
import { CreateExerciseDTO } from './dto/create.exercise.dto';

@Injectable()
export class CreateService {

    constructor(
        @InjectRepository( CreateExerciseEntity )
        private readonly exerciseRepository: Repository<CreateExerciseEntity>,

        @InjectRepository( CreateSetEntity )
        private readonly setRepository: Repository<CreateSetEntity>,
    ) {}

    async createExercise( data: CreateExerciseDTO ): Promise<any> {
        return 'connect service'
    }

}
