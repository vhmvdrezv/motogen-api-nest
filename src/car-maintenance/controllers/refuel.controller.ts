import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { RefuelService } from "../services/refuel.service";
import { CreateRefuelDto } from "../dto/refuel/create-refuel.dto";
import { User } from "src/common/decorators/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { UpdateRefuelDto } from "../dto/refuel/update-refuel.dto";

@ApiTags('Refuel')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtGuard)
@Controller('users/me/cars/:carId/refuels')
export class RefuelController {
    constructor(
        private readonly refuelService: RefuelService
    ) { }

    @Post()
    async createService(
        @Body() createRefuelDto: CreateRefuelDto,
        @Param('carId') carId: string, 
        @User('userId') userId: string
    ) { 
        return this.refuelService.createRefuel(createRefuelDto, carId, userId);
    }

    @Get()
    async getAllRefuels(
        @Param('carId') carId: string,
        @User('userId') userId: string
    ) {
        return this.refuelService.getAllRefuel(carId, userId);
    }

    @Get(':refuelId')
    async getRefuelById(
        @Param('carId') carId: string,
        @Param('refuelId') refuelId: string,
        @User('userId') userId: string,
    ) {
        return this.refuelService.getRefuelById(carId, refuelId, userId);
    }

    @Patch(':refuelId')
    async updateRefuel(
        @Body() updateRefuelDto: UpdateRefuelDto,
        @Param('carId') carId: string,
        @Param('refuelId') refuelId: string,
        @User('userId') userId: string,
    ) {
        return this.refuelService.updateRefuel(updateRefuelDto, carId, userId, refuelId);
    }

    @Delete(':refuelId')
    async deleteRefuel(
        @Param('carId') carId: string,
        @Param('refuelId') refuelId: string,
        @User('userId') userId: string
    ) {
        return this.refuelService.deleteRefuel(carId, refuelId, userId);
    }
}