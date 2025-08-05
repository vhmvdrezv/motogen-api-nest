import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class RequestOtpDto {
    @ApiProperty({
        description: 'Iranian mobile phone number',
        example: '09123456789',
        pattern: '^09[0-9]{9}$',
        minLength: 11,
        maxLength: 11
    })
    @IsNotEmpty({ message: 'شماره موبایل را وارد کنید.' })
    @IsString({ message: 'شماره موبایل باید رشته ای از کارکتر ها باشد.' })
    @Matches(/^09[0-9]{9}$/, { 
        message: 'شماره موبایل معتبر نیست. فرمت صحیح: 09xxxxxxxxx' 
    })
    phoneNumber: string;
}