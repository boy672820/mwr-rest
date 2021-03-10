import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordEntity } from './entities/record.entity';

@Injectable()
export class RecordService {

    constructor(
        @InjectRepository( RecordEntity )
        private readonly recordRepository: Repository<RecordEntity>
    ) {}

    async createRecord() {
        
    }
    
}
