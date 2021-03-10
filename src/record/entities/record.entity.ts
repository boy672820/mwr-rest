import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity( 'records' )
export class RecordEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    user_id: number

    @Column()
    routine_id: number

    @Column()
    record_date: string

    @Column()
    record_content: string

}