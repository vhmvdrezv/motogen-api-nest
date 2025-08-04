import { Transform, Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, MaxDate, Min } from "class-validator";
import { CarColor, Fuel } from "generated/prisma";

export class CreateCarDto {
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
    fuel: Fuel

    @IsNotEmpty()
    @IsDate()
    @MaxDate(new Date('2030-01-01'), { message: 'Date must not be after 2025-01-01' })
    @Type(() => Date)
    thirdPartyInsuranceExpiry: Date;

    @IsNotEmpty()
    @IsDate()
    @MaxDate(new Date('2030-01-01'), { message: 'Date must not be after 2025-01-01' })
    @Type(() => Date)
    bodyInsuranceExpiry: Date;

    @IsNotEmpty()
    @IsDate()
    @MaxDate(new Date('2030-01-01'), { message: 'Date must not be after 2030-01-01' })
    @Type(() => Date)
    nextTechnicalInspectionDate: Date;

    @IsNotEmpty()
    @IsString()
    carTrimId: string;

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