import { Transform, Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches, Max, Min } from "class-validator";

export class CreateTrimDto {
    @IsNotEmpty({ message: 'نام را وارد کنید.' })
    @IsString({ message: 'نام باید رشته ای از کارکتر ها باشد.' })
    @Length(1, 20, { message: 'نام باید بین 1 تا 20 کاراکتر باشد.' })
    @Matches(/^[a-zA-Z0-9\u0600-\u06FF\u200C\u200D\s\-_.,!?'"()]+$/, { 
        message: 'نام شامل کاراکتر های غیر مجاز است.' 
    })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim();
        }
        return value;
    })
    title: string;

    @IsOptional()
    @IsBoolean({ message: 'فیلد فعال باید درست یا غلط باشد.' })
    active?: boolean;

    @IsNotEmpty({ message: 'سال شروع تولید را وارد کنید.' })
    @Type(() => Number)
    @IsInt({ message: 'سال شروع تولید باید عدد صحیح باشد.' })
    @Min(1357, { message: 'سال شروع تولید نمی‌تواند کمتر از 1357 باشد.' })
    @Max(1404, { message: 'سال شروع تولید نمی‌تواند بیشتر از 1404 باشد.' })
    firstYearProd: number;

    @IsNotEmpty({ message: 'سال پایان تولید را وارد کنید.' })
    @Type(() => Number)
    @IsInt({ message: 'سال پایان تولید باید عدد صحیح باشد.' })
    @Min(1357, { message: 'سال پایان تولید نمی‌تواند کمتر از 1357 باشد.' })
    @Max(1404, { message: 'سال پایان تولید نمی‌تواند بیشتر از 1404 باشد.' })
    lastYearProd: number;

    @IsNotEmpty({ message: 'شناسه مدل خودرو را وارد کنید.' })
    @IsString({ message: 'شناسه مدل خودرو باید رشته ای از کارکتر ها باشد.' })
    @Matches(/^[a-zA-Z0-9]+$/, {
        message: 'شناسه مدل خودرو شامل کاراکتر های غیر مجاز است.',
    })
    @Transform(({ value }) => value?.trim())
    carModelId: string;
}