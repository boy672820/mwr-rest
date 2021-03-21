import {RoutineBlockEntity} from 'src/routine/entities/routine.block.entity'
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('records')
export class RecordEntity {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    user_id: number

    @Column()
    block_id: number

    @Column()
    record_date: Date

    @Column()
    record_content: string

    @OneToOne((type) => RoutineBlockEntity)
    @JoinColumn({name: 'block_id'})
    block: RoutineBlockEntity
}
