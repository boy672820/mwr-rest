import { Body, Controller, Post } from '@nestjs/common';

import { CreateService } from './create.service';
import { CreateExerciseDTO } from './dto/create.exercise.dto';


@Controller( 'create' )
export class CreateController {

    constructor(
        private readonly createService: CreateService
    ) {}

    @Post( 'exercise' )
    async createExercise( @Body() data: CreateExerciseDTO ): Promise<any> {
        return this.createService.createExercise( data )
    }

}
