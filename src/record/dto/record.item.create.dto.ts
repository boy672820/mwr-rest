import {IsNotEmpty} from 'class-validator'

export class RecordItemCreateDTO {
    @IsNotEmpty()
    readonly record_id: number

    @IsNotEmpty()
    readonly set_id: number

    @IsNotEmpty()
    readonly record_item_number: number

    @IsNotEmpty()
    readonly record_item_weight: number

    @IsNotEmpty()
    readonly record_item_reps: number

    @IsNotEmpty()
    readonly record_item_max_reps: number

    @IsNotEmpty()
    readonly record_item_disable_range: number

    @IsNotEmpty()
    readonly record_item_rir: number

    @IsNotEmpty()
    readonly record_item_rest: number
}
