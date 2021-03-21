import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {RecordEntity} from './entities/record.entity'
import {RecordCreateDTO} from './dto/record.create.dto'

@Injectable()
export class RecordService {
    constructor(
        @InjectRepository(RecordEntity)
        private readonly recordRepository: Repository<RecordEntity>,
    ) {}

    /**
     * Get record by block id.
     * @param block_id Block id
     * @returns
     */
    async getRecordByBlockId(block_id: number) {
        return await this.recordRepository.findOne({block_id: block_id})
    }

    /**
     * Create record with block id.
     * @param block_id Block id
     * @returns RecordEntity
     */
    async createRecord(data: RecordCreateDTO): Promise<RecordEntity> {
        const entity = new RecordEntity()
        entity.block_id = data.block_id
        entity.user_id = data.user_id
        entity.record_date = new Date(Date.now())
        entity.record_content = ''

        return await this.recordRepository.save(entity)
    }

    /**
     * Get record with block.
     * @param record_id Record id
     * @returns
     */
    async getRecordWithBlock(record_id: number): Promise<any> {
        return await this.recordRepository
            .createQueryBuilder('records')
            .leftJoinAndSelect('blocks', 'block', 'block.ID = records.block_id')
            .leftJoinAndSelect(
                'routine_date',
                'date',
                'date.block_id = block.ID',
            )
            .leftJoinAndSelect(
                'exercises',
                'exercise',
                'exercise.block_id = block.ID',
            )
            .leftJoinAndSelect('sets', 'set', 'set.exercise_id = exercise.ID')
            .select([
                'records.record_date',
                'records.record_content',
                'block.block_title',
                'date.routine_date',
                'exercise.exercise_name',
                'set.set_number',
                'set.set_reps',
                'set.set_max_reps',
                'set.set_rir',
                'set.set_disable_range',
                'set.set_rest',
                'set.set_weight',
            ])
            .where(`records.ID = ${record_id}`)
            .getRawMany()
    }
}
