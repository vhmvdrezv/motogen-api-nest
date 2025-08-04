import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) { }

    @UseGuards(JwtGuard)
    @Post('me/complete-profile')
    async completeProfile(@Body() completeProfileDto: CompleteProfileDto, @User('userId') userId: string) {
        return this.userService.completeProfile(completeProfileDto, userId);
    }

    @UseGuards(JwtGuard)
    @Patch('me')
    async updateProfile(@Body() updateProfileDto: UpdateProfileDto, @User('userId') userId: string) {
        return this.userService.updateProfile(updateProfileDto, userId);
    }

    @UseGuards(JwtGuard)
    @Get('me')
    async getMyProfile(@User('userId') userId: string) {
        return this.userService.getMyProfile(userId);
    }
}
