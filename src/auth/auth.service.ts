import { BadRequestException, ConflictException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestOtpDto } from './dto/request-otp.dto';
import { randomInt } from 'crypto';
import { compare, hash } from 'bcrypt';
import { CacheManagerService } from 'src/cache-manager/cache-manager.service';
import { ConfirmOtpDto } from './dto/confirm-otp.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refres-token.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly cacheManagerService: CacheManagerService,
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService,
    ) { }

    async requestOtp(requestOtpDto: RequestOtpDto) {
        const { phoneNumber } = requestOtpDto;

        const storedHashedOtp = await this.cacheManagerService.get(phoneNumber);
        if (storedHashedOtp) {
            throw new ConflictException('کد برای شما ارسال شده است، برای دریافت کد جدید 2 دقیقه صبر کنید');
        }

        const otpCode = randomInt(1000, 10000).toString();
        const hashedOtp = await hash(otpCode, 10);

        await this.cacheManagerService.setEx(phoneNumber, hashedOtp, 120)

        return {
            message: 'کد به شماره شما ارسال شد.',
            data: otpCode
        }
    }

    async confirmOtp(confirmOtpDto: ConfirmOtpDto) {
        const { phoneNumber, otpCode } = confirmOtpDto;

        const storedOtpCode = await this.cacheManagerService.get(phoneNumber);
        if (!storedOtpCode) {
            throw new BadRequestException('کد منقضی شده است، درخواست کد جدید کنید');
        }
        const result = await compare(otpCode, storedOtpCode);
        if (!result) throw new BadRequestException('کد اشتباه است.');

        await this.cacheManagerService.del(phoneNumber);

        let user = await this.databaseService.user.findUnique({
            where: {
                phoneNumber
            }
        });

        if (!user) {
            user = await this.databaseService.user.create({
                data: {
                    phoneNumber,
                }
            });
        }

        const payload = { sub: user.id, phoneNumber };
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
        const hashedRefreshToken = await hash(refreshToken, 10);
        await this.databaseService.user.update({
            where: { id: user.id },
            data: {
                refreshToken: hashedRefreshToken,
            }
        });

        return {
            message: user ? 'ثبت نام و ورود موفقیت آمیز بود.' : 'ورود موفقیت آمیز بود.',
            data: {
                refreshToken,
                accessToken,
                user: {
                    isProfileCompleted: user.isProfileCompleted
                },
            },            
        };
    }

    async refreshToken(
        refreshTokenDto: RefreshTokenDto
    ) {
        const { refreshToken } = refreshTokenDto;

        let payload;
        try {
            payload = await this.jwtService.verify(refreshToken);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

        const userId = payload.sub;
        const phoneNumber = payload.phoneNumber;

        const user = await this.databaseService.user.findUnique({
            where: {
               id: userId, 
            }
        })
        if (!user || !user.refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const isMatch = await compare(refreshToken, user.refreshToken);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const newPayload = { sub: user.id, phoneNumber };
        const newAccessToken = await this.jwtService.signAsync(newPayload, { expiresIn: '15m' })      
        const newRefreshToken = await this.jwtService.signAsync(newPayload, { expiresIn: '7d' });
        const newHashedRefreshToken = await hash(newRefreshToken, 10);

        await this.databaseService.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken: newHashedRefreshToken,
            },
        });

        return {
        message: 'Tokens refreshed successfully',
            data: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            },
        };
    }
}
