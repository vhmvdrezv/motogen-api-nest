import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxDate, MaxLength, Min } from "class-validator";
import { PurchaseCategory } from "generated/prisma";

export class CreatePurchaseDto {
    @ApiProperty({
        description: 'تاریخ و زمان خرید',
        example: '2025-08-06T14:30:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @IsNotEmpty({ message: 'تاریخ خرید الزامی است.' })
    @Type(() => Date)
    @IsDate({ message: 'تاریخ خرید معتبر نیست.' })
    @MaxDate(new Date(), { message: 'تاریخ خرید نمی‌تواند در آینده باشد.' })
    date: Date;

    @ApiProperty({
        description: 'نام قطعه خریداری شده',
        example: 'لنت ترمز جلو',
        maxLength: 100
    })
    @IsNotEmpty({ message: 'وارد کردن نام قطعه الزامی است.' })
    @IsString({ message: 'نام قطعه باید از نوع رشته باشد.' })
    @MaxLength(100, { message: 'حداکثر طول نام قطعه ۱۰۰ کاراکتر است.' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    part: string;

    @ApiProperty({
        description: 'دسته‌بندی خرید',
        enum: PurchaseCategory,
        example: PurchaseCategory.CONSUMABLE
    })
    @IsNotEmpty({ message: 'انتخاب دسته‌بندی خرید الزامی است.' })
    @IsEnum(PurchaseCategory, { message: 'دسته‌بندی خرید نامعتبر است.' })
    purchaseCategory: PurchaseCategory;

    @ApiProperty({
        description: 'هزینه خرید به تومان',
        example: 250000,
        minimum: 1,
        maximum: 1000000000
    })
    @IsNotEmpty({ message: 'وارد کردن هزینه خرید الزامی است.' })
    @IsInt({ message: 'هزینه خرید باید یک عدد صحیح باشد.' })
    @Min(1, { message: 'حداقل هزینه خرید ۱ تومان است.' })
    @Max(1000000000, { message: 'حداکثر هزینه خرید ۱ میلیارد تومان است.' })
    cost: number;

    @ApiProperty({
        description: 'محل انجام خرید',
        example: 'فروشگاه سرعت',
        maxLength: 100
    })
    @IsNotEmpty({ message: 'محل انجام خرید الزامی است.' })
    @IsString({ message: 'محل خرید باید از نوع رشته باشد.' })
    @MaxLength(100, { message: 'حداکثر طول محل خرید ۱۰۰ کاراکتر است.' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    location: string;

    @ApiPropertyOptional({
        description: 'یادداشت یا توضیحات اضافی درباره خرید',
        example: 'خرید شمع',
        maxLength: 5000
    })
    @IsOptional()
    @IsString({ message: 'یادداشت باید از نوع رشته (متن) باشد.' })
    @MaxLength(5000, { message: 'حداکثر طول یادداشت ۵۰۰۰ کاراکتر است.' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    notes?: string;
}