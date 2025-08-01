import { Transform, Type } from "class-transformer";
import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Max, MaxDate, Min, MinDate, ValidateNested } from "class-validator";
import { CarColor, Fuel } from "generated/prisma";

class User {
    @IsNotEmpty()
    @IsString()
    @Length(2, 30)
    @Matches(/^[a-zA-Z0-9\u0600-\u06FF\u200C\u200D\s\-_.,!?'"()]+$/, { 
        message: 'نام شامل کاراکتر های غیر مجاز است.' 
    })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim();
        }
        return value;
    })
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 30)
    @Matches(/^[a-zA-Z0-9\u0600-\u06FF\u200C\u200D\s\-_.,!?'"()]+$/, { 
        message: 'نام خانوادگی شامل کاراکتر های غیر مجاز است.' 
    })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim();
        }
        return value;
    })
    lastName: string;
}

class Car {
    @IsNotEmpty()
    @IsInt()
    @Min(1350)
    @Max(1404)
    productYear: number;

    @IsNotEmpty()
    @IsEnum(CarColor)
    color: CarColor

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(10000000)
    kilometer: number;

    @IsNotEmpty()
    @IsEnum(Fuel)
    feul: Fuel

    @IsNotEmpty()
    @IsDate()
    @MaxDate(new Date('2030-01-01'), { message: 'Date must not be after 2025-01-01' })
    @Type(() => Date)
    insuranceExpirationDate: Date;

    @IsNotEmpty()
    @IsDate()
    @MaxDate(new Date('2030-01-01'), { message: 'Date must not be after 2030-01-01' })
    @Type(() => Date)
    nextTechnicalInspectionDate: Date;

    @IsNotEmpty()
    @IsString()
    trimId: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(1, 30)
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim();
        }
        return value;
    })
    nickName?: string;
}

export class CompleteProfileDto {
    @ValidateNested()
    @Type(() => User)
    userInformation: User;

    @ValidateNested()
    @Type(() => Car)
    carInformation: Car;
}