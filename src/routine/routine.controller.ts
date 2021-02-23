import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RoutineService } from './routine.service';
import { RoutineBlockDTO } from './dto/routine.block.dto';
import { RoutineDateDTO } from './dto/routine.date.dto';
import { RoutineEntity } from './entities/routine.entity';
import { RoutineBlockEntity } from './entities/routine.block.entity';
import { RoutineExerciseEntity } from './entities/routine.exercise.entity';


@Controller( 'routine' )
export class RoutineController {

    constructor(
        private readonly routineService: RoutineService
    ) {}

    @Get( 'exercises/:block_id' )
    async getExercises( @Param() { block_id } ): Promise<any> {
        return this.routineService.getExercises( block_id )
    }

    @Get( 'active-routine/:user_email' )
    async getActiveRoutine( @Param() { user_email } ): Promise<RoutineEntity> {
        return this.routineService.getActiveRoutine( user_email )
    }

    @Get( 'dates/:routine_id' )
    async getRoutineDates( @Param() { routine_id } ): Promise<any> {
        return this.routineService.getRoutineDates( routine_id )
    }

    @Post( 'block' )
    async createBlock( @Body() data: RoutineBlockDTO ): Promise<RoutineBlockEntity> {
        return this.routineService.createBlock( data )
    }

    @Get( 'now-date' )
    async nowDate(): Promise<RoutineDateDTO> {
        return this.routineService.nowDate()
    }

}
