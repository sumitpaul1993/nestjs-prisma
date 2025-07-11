import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

/**
 * Document details data transfer object
 */

export class DocumentIdDto {
    @IsNotEmpty({
        message: "ID required."
    })
    readonly id: string;
}
