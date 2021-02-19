import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( 'sets' )
export class CreateSetEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    exercise_id: number

    @Column()
    set_number: number

    @Column()
    set_weight: number

    @Column()
    set_reps: number

    @Column()
    set_max_reps: number

    @Column()
    set_disable_range: boolean

    @Column()
    set_rir: number

    @Column()
    set_rest: number

}