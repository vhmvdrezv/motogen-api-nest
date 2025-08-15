import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token issued during authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    pattern: '^[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+$',
  })
  @IsNotEmpty({ message: 'رفرش توکن را وارد کنید.' })
  @IsString({ message: 'رفرش توکن باید رشته‌ای از کاراکترها باشد.' })
  @Matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, { 
    message: 'رفرش توکن معتبر نیست.' 
  })
  refreshToken: string;
}