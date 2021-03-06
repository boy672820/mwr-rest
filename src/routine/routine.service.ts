import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RoutineDateDTO } from './dto/routine.date.dto'
import { RoutineBlockDTO } from './dto/routine.block.dto'
import { RoutineExerciseDTO } from './dto/routine.exercise.dto'

import { UsersEntity } from 'src/users/users.entity'
import { RoutineEntity } from './entities/routine.entity'
import { RoutineDateEntity } from './entities/routine.routine_date.entity'
import { RoutineBlockEntity } from './entities/routine.block.entity'
import { RoutineExerciseEntity } from './entities/routine.exercise.entity'
import { RoutineSetsEntity } from './entities/routine.sets.entity'
import { RoutineUpdateSetDTO } from './dto/routine.update.set.dto'
import { RoutineCreateSetDTO } from './dto/routine.create.set.dto'
import { RoutineUpdateExerciseDTO } from './dto/routine.update.exercise.dto'
import { RoutineUpdateBlockDTO } from './dto/routine.update.block.dto'


@Injectable()
export class RoutineService {

    constructor(
        @InjectRepository( UsersEntity )
        private readonly userRepository: Repository<UsersEntity>,
        
        @InjectRepository( RoutineEntity )
        private readonly routineRepository: Repository<RoutineEntity>,

        @InjectRepository( RoutineDateEntity )
        private readonly routineDateRepository: Repository<RoutineDateEntity>,

        @InjectRepository( RoutineBlockEntity )
        private readonly blockRepository: Repository<RoutineBlockEntity>,

        @InjectRepository( RoutineExerciseEntity )
        private readonly exerciseRepository: Repository<RoutineExerciseEntity>,

        @InjectRepository( RoutineSetsEntity )
        private readonly setRepository: Repository<RoutineSetsEntity>,
    ) {}

    async getActiveRoutine( user_email: string ): Promise<RoutineEntity> {
        const { ID } = await this.userRepository.findOne( { email: user_email } )
        const routine = await this.routineRepository.findOne( { user_id: ID, routine_active: 1 } )

        return routine
    }

    /**
     * Get routine dates.
     * @param routine_id Routine id
     * @returns 
     */
    async getRoutineDates( routine_id: number ): Promise<any> {
        const rows = await this.routineDateRepository
                                .createQueryBuilder( 'routine_date' )
                                .leftJoinAndSelect( 'blocks', 'block', 'routine_date.block_id = block.ID' )
                                .select( [
                                    'routine_date.ID as ID',
                                    'routine_date.routine_date as routine_date',
                                    'routine_date.block_id as block_id',
                                    'block.block_title as block_title'
                                ] )
                                .where( `routine_date.routine_id = ${routine_id}` )
                                .getRawMany()

        const data = {}

        rows.map( ( row ) => {
            data[ row.routine_date ] = {
                ID: row.ID,
                block_id: row.block_id,
                block_title: row.block_title
            }
        } )

        return data
    }


    /**
     * Get exercxises by block id.
     * @param block_id Block id.
     * @returns 
     */
    async getExercises( block_id: number ): Promise<RoutineExerciseEntity[]> {
        return await this.exerciseRepository
                        .createQueryBuilder( 'exercises' )
                        .leftJoinAndSelect( 'exercises.sets', 'set' )
                        .where( `exercises.block_id = ${ block_id }` )
                        .orderBy( {
                            'exercises.ID': 'ASC',
                            'set.set_number': 'ASC'
                        } )
                        .getMany()
    }

    async createExercise( data: RoutineExerciseDTO ): Promise<RoutineExerciseEntity> {
        const exerciseEntity = new RoutineExerciseEntity()
        exerciseEntity.block_id = data.block_id
        exerciseEntity.exercise_name = data.exercise_name
        // Create exercise.
        const exercise = await this.exerciseRepository.save( exerciseEntity )

        const sets: RoutineSetsEntity[] = []

        let i = 1
        for ( i; i <= data.set_number; i += 1 ) {
            const setEntity = new RoutineSetsEntity()
            setEntity.set_number = i
            setEntity.exercise_id = exercise.ID
            setEntity.set_weight = data.set_weight
            setEntity.set_reps = data.set_reps
            setEntity.set_max_reps = data.set_max_reps
            setEntity.set_disable_range = data.set_disable_range ? 1 : 0
            setEntity.set_rir = data.set_rir
            setEntity.set_rest = data.set_rest
            // Create set.
            await this.setRepository.save( setEntity )
        }

        return exercise
    }

    async updateExercise( data: RoutineUpdateExerciseDTO ): Promise<any> {
        return await this.exerciseRepository.update( { ID: data.ID }, { exercise_name: data.exercise_name } )
    }

    async removeExercise( exercise_id: number ): Promise<any> {
        return await this.exerciseRepository.delete( exercise_id )
    }

    async createExerciseSet( data: RoutineCreateSetDTO ): Promise<RoutineSetsEntity> {
        // Get maximum set_number.
        const sets = await this.setRepository.find( { exercise_id: data.exercise_id } )
        const set_number = sets.length + 1

        // Create set.
        const setEntity = new RoutineSetsEntity()
        setEntity.exercise_id = data.exercise_id
        setEntity.set_number = set_number
        setEntity.set_weight = data.set_weight
        setEntity.set_reps = data.set_reps
        setEntity.set_max_reps = data.set_max_reps
        setEntity.set_disable_range = data.set_disable_range ? 1 : 0
        setEntity.set_rir = data.set_rir
        setEntity.set_rest = data.set_rest
        
        return await this.setRepository.save( setEntity )
    }

    async updateExerciseSet( data: RoutineUpdateSetDTO ): Promise<any> {
        return await this.setRepository.update( {
            exercise_id: data.exercise_id,
            ID: data.ID
        }, {
            set_weight: data.set_weight,
            set_reps: data.set_reps,
            set_max_reps: data.set_max_reps,
            set_disable_range: data.set_disable_range ? 1 : 0,
            set_rir: data.set_rir,
            set_rest: data.set_rest
        } )
    }

    async removeExerciseSet( id: number ): Promise<any> {
        return await this.setRepository.delete( id )
    }

    async updateOrderSetNumber( exercise_id: number ) {
        // Get sets.
        const sets = await this.setRepository.find( {
            order: { ID: 'ASC' },
            where: { exercise_id: exercise_id }
        } )

        // Update set_number order.
        const res = sets.map( async ( row, i ) => {
            const set_number = ( i + 1 )

            return await this.setRepository.update( { ID: row.ID }, { set_number: set_number } )
        } )
    }

    async getBlock( block_id: number ): Promise<RoutineBlockEntity> {
        return await this.blockRepository.findOne( { ID: block_id } )
    }

    async createBlock( data: RoutineBlockDTO ): Promise<RoutineBlockEntity> {
        // routine block entity & save repository
        const routineBlockEntity = new RoutineBlockEntity()
        routineBlockEntity.routine_id = data.routine_id
        routineBlockEntity.block_title = data.block_title

        const block = await this.blockRepository.save( routineBlockEntity )

        // routine routine_date entity & save repository
        const routineDateEntity = new RoutineDateEntity()
        routineDateEntity.routine_id = data.routine_id
        routineDateEntity.block_id = block.ID
        routineDateEntity.routine_date = data.routine_date

        await this.routineDateRepository.save( routineDateEntity )

        return block
    }

    /**
     * Update block.
     * @param data RoutineUpdateBlockDTO
     * @returns 
     */
    async updateBlock( data: RoutineUpdateBlockDTO ): Promise<any> {
        return await this.blockRepository.update( { ID: data.ID }, { block_title: data.block_title } )
    }

    async removeBlockAndDate( id: number ): Promise<any> {
        // Remove all dates by block id.
        await this.routineDateRepository.createQueryBuilder()
                                        .delete()
                                        .from( RoutineDateEntity )
                                        .where( `block_id = ${id}` )
                                        .execute()

        return await this.blockRepository.delete( id )
    }

    /**
     * Get now date.
     */
    async nowDate(): Promise<RoutineDateDTO> {
        const now = new Date( Date.now() )
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const date = now.getDate()

        return {
            year: year,
            month: month,
            date: date
        }
    }

}
