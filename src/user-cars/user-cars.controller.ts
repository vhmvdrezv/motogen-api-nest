import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserCarsService } from './user-cars.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('users/me/cars')
export class UserCarsController {
    constructor(
        private readonly userCarsService: UserCarsService
    ) { }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getUserCar(@Param('id') carId: string, @User('userId') userId: string) {
        return this.userCarsService.getUserCar(carId, userId);
    }

    @UseGuards(JwtGuard)
    @Get()
    async getUserCars(@User('userId') userId: string) {
        return this.userCarsService.getUserCars(userId);
    }
}
