import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {RecordEntity} from './entities/record.entity'
import {RecordCreateDTO} from './dto/record.create.dto'
import {RoutineExerciseEntity} from 'src/routine/entities/routine.exercise.entity'
import {RecordItemCreateDTO} from './dto/record.item.create.dto'
import {RecordItemEntity} from './entities/record_item.entity'
import {RecordItemCompleteDTO} from './dto/record.item.complete.dto'
import {RoutineSetsEntity} from 'src/routine/entities/routine.sets.entity'
import {RecordItemUpdateDTO} from './dto/record.item.update.dto'

@Injectable()
export class RecordService {
    constructor(
        @InjectRepository(RecordEntity)
        private readonly recordRepository: Repository<RecordEntity>,
        @InjectRepository(RecordItemEntity)
        private readonly recordItemRepository: Repository<RecordItemEntity>,
        @InjectRepository(RoutineExerciseEntity)
        private readonly exerciseRepository: Repository<RoutineExerciseEntity>,
        @InjectRepository(RoutineSetsEntity)
        private readonly setRepository: Repository<RoutineSetsEntity>,
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
        const record = await this.recordRepository
            .createQueryBuilder('records')
            .leftJoinAndSelect('blocks', 'block', 'block.ID = records.block_id')
            .leftJoinAndSelect(
                'routine_date',
                'date',
                'date.block_id = block.ID',
            )
            .select([
                'records.record_date',
                'records.record_content',
                'block.ID',
                'block.block_title',
                'date.routine_date',
            ])
            .where(`records.ID = ${record_id}`)
            .getRawOne()

        const exercises = await this.exerciseRepository.find({
            where: {block_id: record.block_ID},
            relations: ['sets'],
        })

        return {
            ...record,
            exercises: exercises,
        }
    }

    /**
     * Create record item.
     * @param data RecordItemCreateDTO
     * @returns
     */
    async createRecordItem(
        data: RecordItemCreateDTO,
    ): Promise<RecordItemEntity> {
        const recordItemEntity = new RecordItemEntity()

        const {
            record_id,
            set_id,
            record_item_number,
            record_item_weight,
            record_item_reps,
            record_item_max_reps,
            record_item_disable_range,
            record_item_rir,
            record_item_rest,
        } = data

        recordItemEntity.record_id = record_id
        recordItemEntity.set_id = set_id
        recordItemEntity.record_item_number = record_item_number
        recordItemEntity.record_item_weight = record_item_weight
        recordItemEntity.record_item_reps = record_item_reps
        recordItemEntity.record_item_max_reps = record_item_max_reps
        recordItemEntity.record_item_disable_range = record_item_disable_range
        recordItemEntity.record_item_rir = record_item_rir
        recordItemEntity.record_item_rest = record_item_rest
        recordItemEntity.record_item_complete = 0

        return await this.recordItemRepository.save(recordItemEntity)
    }

    /**
     * Update record item.
     * @param data
     */
    async updateRecordItem(ID: number, data: RecordItemUpdateDTO) {
        const {
            record_item_weight,
            record_item_reps,
            record_item_max_reps,
            record_item_disable_range,
            record_item_rir,
            record_item_rest,
            record_item_complete,
        } = data

        const update = await this.recordItemRepository.update(
            {ID},
            {
                record_item_weight,
                record_item_reps,
                record_item_max_reps,
                record_item_disable_range,
                record_item_rir,
                record_item_rest,
                record_item_complete: record_item_complete ? 1 : 0,
            },
        )

        return update
    }

    /**
     * Get record items.
     * @param record_id
     * @returns
     */
    async getRecordItems(record_id: number): Promise<RecordItemEntity[]> {
        return await this.recordItemRepository.find({record_id: record_id})
    }

    /**
     * Get record item by set ID
     * @param set_id
     * @returns
     */
    async getRecordItemBySetID(set_id: number): Promise<RecordItemEntity> {
        return await this.recordItemRepository.findOne({set_id})
    }

    /**
     * Update complete from record item
     * @param data
     * @returns
     */
    async updateComplete(data: RecordItemCompleteDTO) {
        const {record_id, set_id, complete} = data

        const recordItem = await this.getRecordItemBySetID(set_id)

        if (recordItem) {
            const recordItem = await this.recordItemRepository.update(
                {set_id},
                {record_item_complete: complete ? 1 : 0},
            )

            return recordItem
        } else {
            const {
                ID,
                set_number,
                set_weight,
                set_reps,
                set_max_reps,
                set_disable_range,
                set_rir,
                set_rest,
            } = await this.getSetByID(set_id)

            const createRecordItemData: RecordItemCreateDTO = {
                record_id,
                set_id: ID,
                record_item_number: set_number,
                record_item_weight: set_weight,
                record_item_reps: set_reps,
                record_item_max_reps: set_max_reps,
                record_item_disable_range: set_disable_range,
                record_item_rir: set_rir,
                record_item_rest: set_rest,
                record_item_complete: complete,
            }

            this.createRecordItem(createRecordItemData)
        }
    }

    /**
     * Get sets by ID.
     * @param ID
     * @returns
     */
    async getSetByID(ID: number): Promise<RoutineSetsEntity> {
        return await this.setRepository.findOne({ID})
    }
}
