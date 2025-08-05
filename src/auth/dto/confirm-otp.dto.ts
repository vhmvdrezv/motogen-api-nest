import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class ConfirmOtpDto {
  @ApiProperty({
    description: 'Iranian mobile phone number',
    example: '09123456789',
    pattern: '^09[0-9]{9}$',
    minLength: 11,
    maxLength: 11
  })
  @IsNotEmpty({ message: 'شماره موبایل را وارد کنید.' })
  @IsString({ message: 'شماره موبایل باید رشته ای از کارکتر ها باشد.' })
  @Matches(/^09[0-9]{9}$/, { 
    message: 'شماره موبایل معتبر نیست. فرمت صحیح: 09xxxxxxxxx' 
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'OTP verification code',
    example: '1234',
    pattern: '^\\d{4}$',
    minLength: 4,
    maxLength: 4
  }) 
  @IsNotEmpty({ message: 'کد تایید را وارد کنید.' })
  @IsString({ message: 'کد تایید باید رشته‌ای از اعداد باشد.' })
  @Matches(/^\d{4}$/, { message: 'کد تایید باید شامل ۴ رقم باشد.' })
  otpCode: string;
}