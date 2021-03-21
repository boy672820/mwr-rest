import {IsNotEmpty} from 'class-validator'

export class RecordCreateDTO {
    @IsNotEmpty()
    readonly user_id: number

    @IsNotEmpty()
    readonly block_id: number
}
