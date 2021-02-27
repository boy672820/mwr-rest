import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { RoutineService } from './routine.service'

import { RoutineBlockDTO } from './dto/routine.block.dto'
import { RoutineDateDTO } from './dto/routine.date.dto'
import { RoutineExerciseDTO } from './dto/routine.exercise.dto'

import { RoutineEntity } from './entities/routine.entity'
import { RoutineBlockEntity } from './entities/routine.block.entity'
import { RoutineExerciseEntity } from './entities/routine.exercise.entity'
import { RoutineUpdateSetDTO } from './dto/routine.update.set.dto'
import { RoutineCreateSetDTO } from './dto/routine.create.set.dto'
import { RoutineSetsEntity } from './entities/routine.sets.entity'
import { RoutineUpdateExerciseDTO } from './dto/routine.update.exercise.dto'


@Controller( 'routine' )
export class RoutineController {

    constructor(
        private readonly routineService: RoutineService
    ) {}

    /**
     * Get exercises.
     * @param param0 Block id
     */
    @Get( 'exercises/:block_id' )
    async getExercises( @Param() { block_id } ): Promise<RoutineExerciseEntity[]> {
        return this.routineService.getExercises( block_id )
    }

    /**
     * Get active routine.
     * @param param0 User email
     */
    @Get( 'active-routine/:user_email' )
    async getActiveRoutine( @Param() { user_email } ): Promise<RoutineEntity> {
        return this.routineService.getActiveRoutine( user_email )
    }

    /**
     * Get routine dates.
     * @param param0 Routine id
     */
    @Get( 'dates/:routine_id' )
    async getRoutineDates( @Param() { routine_id } ): Promise<any> {
        return this.routineService.getRoutineDates( routine_id )
    }

    /**
     * Create block.
     * @param data Block dto
     */
    @Post( 'block' )
    async createBlock( @Body() data: RoutineBlockDTO ): Promise<RoutineBlockEntity> {
        return this.routineService.createBlock( data )
    }

    /**
     * Create exercise.
     * @param data Exercise dto
     */
    @Post( 'exercise' )
    async createExercise( @Body() data: RoutineExerciseDTO ): Promise<RoutineExerciseEntity> {
        return this.routineService.createExercise( data )
    }
    
    @Put( 'exercise' )
    async updateExercise( @Body() data: RoutineUpdateExerciseDTO ): Promise<any> {
        return this.routineService.updateExercise( data )
    }

    /**
     * Remove exercise.
     * @param param0 Exercise id
     */
    @Delete( 'exercise/:exercise_id' )
    async removeExercise( @Param() { exercise_id } ): Promise<any> {
        return this.routineService.removeExercise( exercise_id )
    }

    /**
     * Create exercise set.
     * @param data Set dto
     */
    @Post( 'exercise/set' )
    async createExerciseSet( @Body() data: RoutineCreateSetDTO ): Promise<RoutineSetsEntity> {
        return this.routineService.createExerciseSet( data )
    }

    /**
     * Update exercise set.
     * @param data Set dto
     */
    @Put( 'exercise/set' )
    async updateExerciseSet( @Body() data: RoutineUpdateSetDTO ): Promise<any> {
        return this.routineService.updateExerciseSet( data )
    }

    /**
     * Remove exercise set.
     * @param param0 Set id
     */
    @Delete( 'exercise/set-reorder' )
    async removeSetAndReorder( @Body() data: any ): Promise<any> {
        await this.routineService.removeExerciseSet( data.id )
        await this.routineService.updateOrderSetNumber( data.exercise_id )

        return this.routineService.getExercises( data.block_id )
    }

    /**
     * Get now date.
     */
    @Get( 'now-date' )
    async nowDate(): Promise<RoutineDateDTO> {
        return this.routineService.nowDate()
    }

}
