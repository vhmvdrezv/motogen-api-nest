import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) { }

    @UseGuards(JwtGuard)
    @Post('me/complete-profile')
    async completeProfile(@Body() completeProfileDto: CompleteProfileDto, @Req() req: any) {
        return this.userService.completeProfile(completeProfileDto, req.user.userId);
    }
}
