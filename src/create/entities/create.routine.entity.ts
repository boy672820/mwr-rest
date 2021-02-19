import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( 'routines' )
export class CreateRoutineEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    user_id: number

    @Column()
    routine_title: string

    @Column()
    routine_active: 1 | 0

    @Column()
    routine_content: string

}