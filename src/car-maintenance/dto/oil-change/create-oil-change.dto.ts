import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxDate, MaxLength, Min } from "class-validator";
import { OilType } from "generated/prisma";

export class CreateOilChangeDto {
    @ApiProperty({
        description: 'تاریخ و زمان تعویض روغن',
        example: '2025-08-06T14:30:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @IsNotEmpty({ message: 'تاریخ تعویض روغن الزامی است.' })
    @Type(() => Date)
    @IsDate({ message: 'تاریخ تعویض روغن معتبر نیست.' })
    @MaxDate(new Date(), { message: 'تاریخ تعویض روغن نمی‌تواند در آینده باشد.' })
    date: Date;

    @ApiProperty({
        description: 'نوع روغن',
        enum: OilType,
        example: OilType.ENGINE
    })
    @IsNotEmpty({ message: 'انتخاب نوع روغن الزامی است.' })
    @IsEnum(OilType, { message: 'نوع روغن نامعتبر است.' })
    oilType: OilType;

    @ApiProperty({
        description: 'برند و مدل روغن استفاده‌شده',
        example: 'Total Quartz 9000 Energy 5W-40',
        maxLength: 100
    })
    @IsNotEmpty({ message: 'وارد کردن برند و مدل روغن الزامی است.' })
    @IsString({ message: 'برند و مدل روغن باید از نوع رشته باشد.' })
    @MaxLength(100, { message: 'حداکثر طول برند و مدل روغن ۱۰۰ کاراکتر است.' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    oilBrandAndModel: string;

    @ApiProperty({
        description: 'کارکرد خودرو هنگام تعویض روغن (به کیلومتر)',
        example: 85000,
        minimum: 1,
        maximum: 10000000
    })
    @IsNotEmpty({ message: 'کارکرد خودرو الزامی است.' })
    @IsInt({ message: 'کارکرد خودرو باید یک عدد صحیح باشد.' })
    @Min(1, { message: 'حداقل کارکرد خودرو ۱ کیلومتر است.' })
    @Max(10000000, { message: 'حداکثر کارکرد خودرو ۱۰ میلیون کیلومتر است.' })
    kilometer: number;

    @ApiProperty({
        description: 'هزینه تعویض روغن به تومان',
        example: 450000,
    })
    @IsNotEmpty({ message: 'وارد کردن هزینه الزامی است.' })
    @IsInt({ message: 'هزینه باید یک عدد صحیح باشد.' })
    cost: number;

    @ApiProperty({
        description: 'محل انجام تعویض روغن',
        example: 'تعویض‌روغنی مرکزی',
        maxLength: 100
    })
    @IsNotEmpty({ message: 'محل انجام تعویض روغن الزامی است.' })
    @IsString({ message: 'محل باید از نوع رشته باشد.' })
    @MaxLength(100, { message: 'حداکثر طول محل ۱۰۰ کاراکتر است.' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    location: string;


    @ApiPropertyOptional({
        description: 'آیا فیلتر هوا تعویض شده است؟',
        example: false
    })
    @IsOptional()
    @IsBoolean({ message: 'وضعیت فیلتر روغن باید یک مقدار بولین باشد.' })
    oilFilterChanged?: boolean;

    @ApiPropertyOptional({
        description: 'آیا فیلتر هوا تعویض شده است؟',
        example: false
    })
    @IsOptional()
    @IsBoolean({ message: 'وضعیت فیلتر هوا باید یک مقدار بولین باشد.' })
    airFilterChanged?: boolean;

    @ApiPropertyOptional({
        description: 'آیا فیلتر کابین تعویض شده است؟',
        example: false
    })
    @IsOptional()
    @IsBoolean({ message: 'وضعیت فیلتر کابین باید یک مقدار بولین باشد.' })
    cabinFilterChanged?: boolean;

    @ApiPropertyOptional({
        description: 'آیا فیلتر سوخت تعویض شده است؟',
        example: false
    })
    @IsOptional()
    @IsBoolean({ message: 'وضعیت فیلتر سوخت باید یک مقدار بولین باشد.' })
    fuelFilterChanged?: boolean;

     @ApiPropertyOptional({
        description: 'یادداشت یا توضیحات اضافی درباره تعویض روغن',
        example: 'به همراه تعویض فیلتر روغن و فیلتر هوا',
        maxLength: 5000
    })
    @IsOptional()
    @IsString({ message: 'یادداشت باید از نوع رشته (متن) باشد.' })
    @MaxLength(5000, { message: 'حداکثر طول یادداشت ۵۰۰۰ کاراکتر است.' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    notes?: string;
}