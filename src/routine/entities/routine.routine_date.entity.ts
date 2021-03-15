import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('routine_date')
export class RoutineDateEntity {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    routine_id: number

    @Column()
    block_id: number

    @Column()
    routine_date: string
}
