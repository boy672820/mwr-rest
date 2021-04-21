import {Controller, Post, Body, Get, Param, Patch} from '@nestjs/common'
import {RecordCreateDTO} from './dto/record.create.dto'
import {RecordItemCompleteDTO} from './dto/record.item.complete.dto'
import {RecordItemCreateDTO} from './dto/record.item.create.dto'
import {RecordItemUpdateDTO} from './dto/record.item.update.dto'
import {RecordEntity} from './entities/record.entity'
import {RecordItemEntity} from './entities/record_item.entity'
import {RecordService} from './record.service'

@Controller('record')
export class RecordController {
    constructor(private readonly recordService: RecordService) {}

    @Post('/get-or-create')
    async getOrCreateRecordByBlockId(
        @Body() data: RecordCreateDTO,
    ): Promise<RecordEntity> {
        const record = await this.recordService.getRecordByBlockId(
            data.block_id,
        )

        if (record) {
            return record
        } else {
            const createdRecord = await this.recordService.createRecord(data)

            return createdRecord
        }
    }

    @Get('/with-block/:record_id')
    async getRecordWithBlock(@Param() {record_id}) {
        return await this.recordService.getRecordWithBlock(record_id)
    }

    @Post('/record-item')
    async createRecordItem(@Body() data: RecordItemCreateDTO) {
        const res = await this.recordService.createRecordItem(data)

        return res
    }

    @Patch('/record-item/:record_item_id')
    async updateRecordItem(
        @Body() data: RecordItemUpdateDTO,
        @Param() {record_item_id}: {record_item_id: number},
    ) {
        return await this.recordService.updateRecordItem(record_item_id, data)
    }

    @Get('/record-item/:record_id')
    async getRecordItems(@Param() {record_id}): Promise<RecordItemEntity[]> {
        return await this.recordService.getRecordItems(record_id)
    }

    @Patch('/record-item/complete')
    async updateComplete(@Body() data: RecordItemCompleteDTO) {
        return await this.recordService.updateComplete(data)
    }
}
