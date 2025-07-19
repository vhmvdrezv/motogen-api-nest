import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateBrandDto {

    @IsNotEmpty({ message: 'نام را وارد کنید.' })
    @IsString({ message: 'نام باید رشته ای از کارکتر ها باشد.' })
    @Length(1, 20)
    @Matches(/^[a-zA-Z0-9\u0600-\u06FF\u200C\u200D\s\-_.,!?'"()]+$/, { 
        message: 'نام شامل کاراکتر های غیر مجاز است.' 
    })
    @Transform(({ value }) => value?.trim())
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    active?: boolean;
}