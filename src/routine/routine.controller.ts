import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { RoutineService } from './routine.service'

import { RoutineBlockDTO } from './dto/routine.block.dto'
import { RoutineDateDTO } from './dto/routine.date.dto'
import { RoutineExerciseDTO } from './dto/routine.exercise.dto'

import { RoutineEntity } from './entities/routine.entity'
import { RoutineBlockEntity } from './entities/routine.block.entity'
import { RoutineExerciseEntity } from './entities/routine.exercise.entity'
import { RoutineUpdateSetDTO } from './dto/routine.update.set.dto'


@Controller( 'routine' )
export class RoutineController {

    constructor(
        private readonly routineService: RoutineService
    ) {}

    @Get( 'exercises/:block_id' )
    async getExercises( @Param() { block_id } ): Promise<RoutineExerciseEntity[]> {
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

    @Post( 'exercise' )
    async createExercise( @Body() data: RoutineExerciseDTO ): Promise<RoutineExerciseEntity> {
        return this.routineService.createExercise( data )
    }

    @Delete( 'exercise/:exercise_id' )
    async removeExercise( @Param() { exercise_id } ): Promise<any> {
        return this.routineService.removeExercise( exercise_id )
    }

    @Put( 'exercise/set' )
    async updateExerciseSet( @Body() data: RoutineUpdateSetDTO ): Promise<any> {
        return this.routineService.updateExerciseSet( data )
    }

    @Get( 'now-date' )
    async nowDate(): Promise<RoutineDateDTO> {
        return this.routineService.nowDate()
    }

}
