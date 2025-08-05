import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto<T> {
    @ApiProperty({
        description: 'Wherther the operations was successful', example: true,
    })
    success: boolean;

    @ApiProperty({
        description: 'Human-readable message', example: 'خودرو با موفقیت ویرایش شد.',
    })
    message: string;

    @ApiProperty({ description: 'The actual data (can be object, array, or null' })
    data?: T;
}