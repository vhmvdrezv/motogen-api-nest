import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserCarsService } from './user-cars.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('users/me/cars')
export class UserCarsController {
    constructor(
        private readonly userCarsService: UserCarsService
    ) { }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getUserCar(@Param('id') carId: string, @Req() req: any) {
        return this.userCarsService.getUserCar(carId, req.user.userId);
    }
}
