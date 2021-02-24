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
            setEntity.set_weight = data.weight
            setEntity.set_reps = data.reps
            setEntity.set_max_reps = data.max_reps
            setEntity.set_disable_range = data.disable_range ? 1 : 0
            setEntity.set_rir = data.rir
            setEntity.set_rest = data.rest
            // Create set.
            this.setRepository.save( setEntity )
        }

        return exercise
    }

    async createBlock( data: RoutineBlockDTO ) {
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
