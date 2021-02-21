import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( 'blocks' )
export class RoutineBlockEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    routine_id: number

    @Column()
    block_title: string

}