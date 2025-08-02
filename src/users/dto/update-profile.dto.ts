import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsNotEmpty({ message: "نام نباید خالی باشد." })
    @IsString({ message: "نام باید یک رشته باشد." })
    @Length(2, 30, { message: "نام باید بین ۲ تا ۳۰ کاراکتر باشد." })
    @Matches(/^[a-zA-Z0-9\u0600-\u06FF\u200C\u200D\s\-_.,!?'"()]+$/, { 
        message: 'نام شامل کاراکتر های غیر مجاز است.' 
    })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim();
        }
        return value;
    })
    firstName?: string;

    @IsOptional()
    @IsNotEmpty({ message: "نام خانوادگی نباید خالی باشد." })
    @IsString({ message: "نام خانوادگی باید یک رشته باشد." })
    @Length(2, 30, { message: "نام خانوادگی باید بین ۲ تا ۳۰ کاراکتر باشد." })
    @Matches(/^[a-zA-Z0-9\u0600-\u06FF\u200C\u200D\s\-_.,!?'"()]+$/, { 
        message: 'نام شامل کاراکتر های غیر مجاز است.' 
    })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim();
        }
        return value;
    })
    lastName?: string;
}