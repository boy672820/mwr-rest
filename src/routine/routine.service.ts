import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RoutineExerciseEntity } from './entities/routine.exercise.entity'
import { RoutineSetsEntity } from './entities/routine.sets.entity'
import { RoutineBlockEntity } from './entities/routine.block.entity'
import { RoutineDateEntity } from './entities/routine.routine_date.entity'
import { RoutineEntity } from './entities/routine.entity'
import { RoutineExerciseDTO } from './dto/routine.exercise.dto'
import { RoutineBlockDTO } from './dto/routine.block.dto'
import { RoutineDateDTO } from './dto/routine.date.dto'
import { UsersEntity } from 'src/users/users.entity'


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
    
    async getBlocks(): Promise<any> {
        return 'get blocks'
    }
    
    async createDefaultExercise( data: RoutineExerciseDTO ): Promise<any> {
        // const routine = await this.routineRepository.findOne( {
        //     user_id: data.user_id,
        //     routine_active: 1
        // } )

        // const block = await this.createBlock( routine.ID )
        // const exercise = await this.createExercise( block.ID, data.exercise_name )

        // let i = 1
        // const createSetEntity = new CreateSetEntity()
        // createSetEntity.exercise_id = exercise.ID

        // for ( i; i <= data.set_number; i += 1 ) {
        //     createSetEntity.set_number = i
        //     createSetEntity.set_reps = data.reps
        //     createSetEntity.set_max_reps = data.max_reps
        //     createSetEntity.set_disable_range = data.disable_range ? 1 : 0
        //     createSetEntity.set_weight = data.weight
        //     createSetEntity.set_rir = data.rir
        //     createSetEntity.set_rest = data.rest

        //     this.setRepository.save( createSetEntity )
        // }

        return 'exercise'
    }

    async createExercise( block_id: number, exercise_name: string ) {
        const routineExerciseEntity = new RoutineExerciseEntity()
        routineExerciseEntity.block_id = block_id
        routineExerciseEntity.exercise_name = exercise_name

        return await this.exerciseRepository.save( routineExerciseEntity )
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
