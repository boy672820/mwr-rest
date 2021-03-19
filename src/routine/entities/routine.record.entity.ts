import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('records')
export class RoutineRecordsEntity {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    user_id: number

    @Column()
    block_id: number

    @Column()
    record_date: string

    @Column()
    record_content: string
}
