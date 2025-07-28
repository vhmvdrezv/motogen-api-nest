import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class ConfirmOtpDto {
  @IsNotEmpty({ message: 'شماره موبایل را وارد کنید.' })
  @IsString({ message: 'شماره موبایل باید رشته ای از کارکتر ها باشد.' })
  @Matches(/^09[0-9]{9}$/, { 
    message: 'شماره موبایل معتبر نیست. فرمت صحیح: 09xxxxxxxxx' 
  })
  @Transform(({ value }) => value?.trim())
  phoneNumber: string;

  @IsNotEmpty({ message: 'کد تایید را وارد کنید.' })
  @IsString({ message: 'کد تایید باید رشته‌ای از اعداد باشد.' })
  @Matches(/^\d{4}$/, { message: 'کد تایید باید شامل ۴ رقم باشد.' })
  @Transform(({ value }) => value?.trim())
  otpCode: string;
}