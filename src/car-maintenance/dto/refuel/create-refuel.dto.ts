import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, MaxDate, MaxLength, Min } from "class-validator";
import { RefuelPaymentMethod } from "generated/prisma";

export class CreateRefuelDto {
    @ApiProperty({
        description: 'مقدار سوخت‌گیری به لیتر',
        example: 40,
        minimum: 1,
        maximum: 100
    })
    @IsNotEmpty({ message: 'وارد کردن مقدار بنزین الزامی است.' })
    @IsInt({ message: 'مقدار بنزین باید یک عدد صحیح باشد.' })
    @Min(1, { message: 'حداقل مقدار بنزین ۱ لیتر است.' })
    @Max(100, { message: 'حداکثر مقدار بنزین ۱۰۰ لیتر است.' })
    liters: number;

    @ApiProperty({
        description: 'هزینه سوخت‌گیری به تومان',
        example: 250000,
        minimum: 1500,
        maximum: 10000000
    })
    @IsNotEmpty({ message: 'وارد کردن هزینه الزامی است.' })
    @IsInt({ message: 'هزینه باید یک عدد صحیح باشد.' })
    @Min(1500, { message: 'حداقل هزینه ۱۵۰۰ تومان است.' })
    @Max(10000000, { message: 'حداکثر هزینه ۱۰ میلیون تومان است.' })
    cost: number;

    @ApiProperty({
        description: 'روش پرداخت',
        enum: RefuelPaymentMethod,
        example: RefuelPaymentMethod.SUBSIDIZED // یا FREE
    })
    @IsNotEmpty({ message: 'روش پرداخت الزامی است.' })
    @IsEnum(RefuelPaymentMethod, { message: 'روش پرداخت نامعتبر است.' })
    paymentMethod: RefuelPaymentMethod;

    @ApiProperty({
        description: 'تاریخ و زمان سوخت‌گیری',
        example: '2025-08-06T14:30:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @IsNotEmpty({ message: 'تاریخ سوخت‌گیری الزامی است.' })
    @Type(() => Date)
    @IsDate({ message: 'تاریخ سوخت‌گیری معتبر نیست.' })
    @MaxDate(new Date(), { message: 'تاریخ سوخت‌گیری نمی‌تواند در آینده باشد.' })
    date: Date;

    @ApiPropertyOptional({
        description: 'یادداشت یا توضیحات اضافی درباره سوخت‌گیری',
        example: 'سوخت‌گیری در جایگاه نزدیک منزل',
        maxLength: 5000
    })
    @IsOptional()
    @IsString({ message: 'یادداشت باید از نوع رشته (متن) باشد.' })
    @MaxLength(5000, { message: 'حداکثر طول یادداشت ۵۰۰۰ کاراکتر است.' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    notes?: string;
}