import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( 'routines' )
export class RoutineEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    user_id: number

    @Column()
    routine_title: string

    @Column( { default: 0 } )
    routine_active: 0 | 1

    @Column()
    routine_content: string

}