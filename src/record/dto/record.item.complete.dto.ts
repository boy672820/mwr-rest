import {IsBoolean, IsNotEmpty, IsNumber} from 'class-validator'

export class RecordItemCompleteDTO {
    @IsNotEmpty()
    @IsNumber()
    readonly record_id: number

    @IsNotEmpty()
    @IsNumber()
    readonly set_id: number

    @IsNotEmpty()
    @IsBoolean()
    readonly complete: boolean
}
