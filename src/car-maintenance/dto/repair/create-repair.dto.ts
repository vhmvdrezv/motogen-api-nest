import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxDate, MaxLength, Min } from "class-validator";
import { RepairAction } from "generated/prisma";


export class CreateRepairDto {
  @ApiProperty({
    description: 'تاریخ و زمان انجام تعمیر یا تعویض',
    example: '2025-08-06T14:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @IsNotEmpty({ message: 'تاریخ تعمیر یا تعویض الزامی است.' })
  @Type(() => Date)
  @IsDate({ message: 'تاریخ تعمیر یا تعویض معتبر نیست.' })
  @MaxDate(new Date(), { message: 'تاریخ تعمیر یا تعویض نمی‌تواند در آینده باشد.' })
  date: Date;

  @ApiProperty({
    description: 'نام قطعه تعمیر یا تعویض شده',
    example: 'دیسک ترمز جلو',
    maxLength: 100
  })
  @IsNotEmpty({ message: 'نام قطعه الزامی است.' })
  @IsString({ message: 'نام قطعه باید از نوع رشته باشد.' })
  @MaxLength(100, { message: 'حداکثر طول نام قطعه ۱۰۰ کاراکتر است.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  part: string;

  @ApiProperty({
    description: 'نوع اقدام انجام‌شده (تعمیر یا تعویض)',
    enum: RepairAction,
    example: RepairAction.REPLACE
  })
  @IsNotEmpty({ message: 'انتخاب نوع اقدام الزامی است.' })
  @IsEnum(RepairAction, { message: 'نوع اقدام نامعتبر است.' })
  repairAction: RepairAction;

  @ApiProperty({
    description: 'کارکرد خودرو هنگام انجام تعمیر یا تعویض (به کیلومتر)',
    example: 92000,
    minimum: 1,
    maximum: 10000000
  })
  @IsNotEmpty({ message: 'کارکرد خودرو الزامی است.' })
  @IsInt({ message: 'کارکرد خودرو باید یک عدد صحیح باشد.' })
  @Min(1, { message: 'حداقل کارکرد خودرو ۱ کیلومتر است.' })
  @Max(10000000, { message: 'حداکثر کارکرد خودرو ۱۰ میلیون کیلومتر است.' })
  kilometer: number;

  @ApiProperty({
    description: 'محل انجام تعمیر یا تعویض',
    example: 'تعمیرگاه مرکزی خودرو',
    maxLength: 100
  })
  @IsNotEmpty({ message: 'محل انجام تعمیر یا تعویض الزامی است.' })
  @IsString({ message: 'محل باید از نوع رشته باشد.' })
  @MaxLength(100, { message: 'حداکثر طول محل ۱۰۰ کاراکتر است.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  location: string;

  @ApiProperty({
    description: 'هزینه تعمیر یا تعویض به تومان',
    example: 750000
  })
  @IsNotEmpty({ message: 'وارد کردن هزینه الزامی است.' })
  @IsInt({ message: 'هزینه باید یک عدد صحیح باشد.' })
  cost: number;

  @ApiPropertyOptional({
    description: 'یادداشت یا توضیحات اضافی درباره تعمیر یا تعویض',
    example: 'در حین تعمیر، لنت ترمز نیز بررسی شد.',
    maxLength: 5000
  })
  @IsOptional()
  @IsString({ message: 'یادداشت باید از نوع رشته (متن) باشد.' })
  @MaxLength(5000, { message: 'حداکثر طول یادداشت ۵۰۰۰ کاراکتر است.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  notes?: string;
}
