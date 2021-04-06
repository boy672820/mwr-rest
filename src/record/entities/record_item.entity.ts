import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('record_item')
export class RecordItemEntity {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    record_id: number

    @Column()
    record_item_number: number

    @Column()
    record_item_weight: number

    @Column()
    record_item_reps: number

    @Column()
    record_item_max_reps: number

    @Column()
    record_item_disable_range: number

    @Column()
    record_item_rir: number

    @Column()
    record_item_rest: number

    @Column()
    record_item_complete: number
}
