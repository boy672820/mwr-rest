import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( 'sets' )
export class RoutineSetsEntity {

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
    set_disable_range: 0 | 1

    @Column()
    set_rir: number

    @Column()
    set_rest: number

}