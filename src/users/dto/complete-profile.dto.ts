import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Max, MaxDate, Min, MinDate, ValidateNested } from "class-validator";
import { CarColor, Fuel } from "generated/prisma";

class User {
    @ApiProperty({
        description: 'User first name',
        example: 'علی',
        minLength: 2,
        maxLength: 30
    })
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

    @ApiProperty({
        description: 'User last name',
        example: 'احمدی',
        minLength: 2,
        maxLength: 30
    })
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
    @MaxDate(new Date('2030-01-01'), { message: 'Date must not be after 2025-01-01' })
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
    @MaxDate(new Date('2030-01-01'), { message: 'Date must not be after 2025-01-01' })
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
    @MaxDate(new Date('2030-01-01'), { message: 'Date must not be after 2030-01-01' })
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

export class CompleteProfileDto {
    @ApiProperty({
        description: 'User information',
        type: User
    })
    @ValidateNested()
    @Type(() => User)
    userInformation: User;

    @ApiProperty({
        description: 'Car information',
        type: Car
    })
    @ValidateNested()
    @Type(() => Car)
    carInformation: Car;
}