import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserCarsService } from './user-cars.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';
import { CreateCarDto } from './dto/create-car.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Cars')
@ApiBearerAuth('JWT-auth')
@Controller('users/me/cars')
export class UserCarsController {
    constructor(
        private readonly userCarsService: UserCarsService
    ) { }

    @ApiParam({
        name: 'id',
        description: 'Car ID',
        example: 'uuid-string'
    })
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

    @UseGuards(JwtGuard)
    @Post()
    async createCar(@Body() createCarDto: CreateCarDto, @User('userId') userId: string) {
        return this.userCarsService.createCar(createCarDto, userId);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: 'Car ID to delete',
        example: 'uuid-string'
    })
    async deleteCar(@Param('id') carId: string, @User('userId') userId: string) {
        return this.userCarsService.deleteCar(carId, userId);   
    }
}