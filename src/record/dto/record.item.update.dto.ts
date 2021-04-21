import {IsNotEmpty} from 'class-validator'

export class RecordItemUpdateDTO {
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

    @IsNotEmpty()
    readonly record_item_complete: boolean
}
