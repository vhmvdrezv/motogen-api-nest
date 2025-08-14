import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateChatDto {
    @ApiProperty({
        description: 'پیام اولیه کاربر برای شروع مکالمه با هوش مصنوعی',
        example: 'چه زمانی باید روغن موتور خودرو را تعویض کنم؟',
        maxLength: 500
    })
    @IsNotEmpty({ message: 'وارد کردن پیام اولیه الزامی است.' })
    @IsString({ message: 'پیام اولیه باید از نوع رشته باشد.' })
    @MaxLength(500, { message: 'حداکثر طول پیام اولیه ۵۰۰ کاراکتر است.' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    prompt: string;
}