import { Body, Controller, Post } from '@nestjs/common';
import { RequestOtpDto } from './dto/request-otp.dto';
import { AuthService } from './auth.service';
import { ConfirmOtpDto } from './dto/confirm-otp.dto';
import { RefreshTokenDto } from './dto/refres-token.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('request-otp')
    async requestOtp(@Body() requestOtpDto: RequestOtpDto) {
        return this.authService.requestOtp(requestOtpDto);
    }

    @Post('confirm-otp')
    async confirmOtp(@Body() confirmOtpDto: ConfirmOtpDto) {
        return this.authService.confirmOtp(confirmOtpDto)
    }

    @Post('refresh')
    async refreshToke(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto);
    }
}
