import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, MaxDate, Min } from "class-validator";
import { CarColor, Fuel } from "generated/prisma";

export class CreateCarDto {
    @ApiProperty({
        description: 'Production year of the car (Persian calendar)',
        example: 1400,
        minimum: 1350,
        maximum: 1404
    })
    @IsNotEmpty()
    @IsInt()
    @Min(1350)
    @Max(1404)
    productYear: number;

    @ApiProperty({
        description: 'Color of the car',
        enum: CarColor,
        example: CarColor.WHITE
    })
    @IsNotEmpty()
    @IsEnum(CarColor)
    @IsNotEmpty()
    @IsEnum(CarColor)
    color: CarColor

    @ApiProperty({
        description: 'Kilometer count of the car',
        example: 50000,
        minimum: 0,
        maximum: 10000000
    })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(10000000)
    kilometer: number;

    @ApiProperty({
        description: 'Fuel type of the car',
        enum: Fuel,
        example: Fuel.GASOLINE
    })
    @IsNotEmpty()
    @IsEnum(Fuel)
    fuel: Fuel

    @ApiProperty({
        description: 'Third party insurance expiry date',
        example: '2025-12-31T00:00:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @IsNotEmpty()
    @IsDate()
    @MaxDate(() => { const d = new Date(); d.setFullYear(d.getFullYear() + 1); d.setDate(d.getDate() + 1); d.setHours(0, 0, 0, 0); return d; }, { message: 'تاریخ نباید بیشتر از یک سال آینده باشد' })
    @Type(() => Date)
    thirdPartyInsuranceExpiry: Date;

    @ApiPropertyOptional({
        description: 'Body insurance expiry date',
        example: '2025-12-31T00:00:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    @MaxDate(() => { const d = new Date(); d.setFullYear(d.getFullYear() + 1); d.setDate(d.getDate() + 1); d.setHours(0, 0, 0, 0); return d; }, { message: 'تاریخ نباید بیشتر از یک سال آینده باشد' })
    @Type(() => Date)
    bodyInsuranceExpiry?: Date;

    @ApiProperty({
        description: 'Next technical inspection date',
        example: '2025-12-31T00:00:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @IsNotEmpty()
    @IsDate()
    @MaxDate(() => { const d = new Date(); d.setFullYear(d.getFullYear() + 1); d.setDate(d.getDate() + 1); d.setHours(0, 0, 0, 0); return d; }, { message: 'تاریخ نباید بیشتر از یک سال آینده باشد' })
    @Type(() => Date)
    nextTechnicalInspectionDate: Date;

    @ApiProperty({
        description: 'Car trim ID',
        example: 'uuid-string'
    })
    @IsNotEmpty()
    @IsString()
    carTrimId: string;

    @ApiPropertyOptional({
        description: 'Optional nickname for the car',
        example: 'ماشین من',
        minLength: 1,
        maxLength: 30
    })
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