import {Controller, Post, Body, Get, Param} from '@nestjs/common'
import {RecordCreateDTO} from './dto/record.create.dto'
import { RecordItemCreateDTO } from './dto/record.item.create.dto'
import {RecordEntity} from './entities/record.entity'
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
    async createRecordItem(data: RecordItemCreateDTO) {
        return await this.createRecordItem(data)
    }
}
