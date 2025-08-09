import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { RefuelsService } from "../services/refuels.service";
import { CreateRefuelDto } from "../dto/refuel/create-refuel.dto";
import { User } from "src/common/decorators/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { UpdateRefuelDto } from "../dto/refuel/update-refuel.dto";
import { GetAllRefuelsDto } from "../dto/refuel/get-all-refuels.dto";

@ApiTags('Refuels')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtGuard)
@Controller('users/me/cars/:carId/refuels')
export class RefuelsController {
    constructor(
        private readonly refuelsService: RefuelsService
    ) { }

    @Post()
    async createService(
        @Body() createRefuelDto: CreateRefuelDto,
        @Param('carId') carId: string,
        @User('userId') userId: string
    ) {
        return this.refuelsService.createRefuel(createRefuelDto, carId, userId);
    }

    @Get()
    async getAllRefuels(
        @Query() getAllRefuelsDto: GetAllRefuelsDto,
        @Param('carId') carId: string,
        @User('userId') userId: string
    ) {
        return this.refuelsService.getAllRefuel(getAllRefuelsDto, carId, userId);
    }

    @Get(':refuelId')
    async getRefuelById(
        @Param('carId') carId: string,
        @Param('refuelId') refuelId: string,
        @User('userId') userId: string,
    ) {
        return this.refuelsService.getRefuelById(carId, refuelId, userId);
    }

    @Patch(':refuelId')
    async updateRefuel(
        @Body() updateRefuelDto: UpdateRefuelDto,
        @Param('carId') carId: string,
        @Param('refuelId') refuelId: string,
        @User('userId') userId: string,
    ) {
        return this.refuelsService.updateRefuel(updateRefuelDto, carId, userId, refuelId);
    }

    @Delete(':refuelId')
    async deleteRefuel(
        @Param('carId') carId: string,
        @Param('refuelId') refuelId: string,
        @User('userId') userId: string
    ) {
        return this.refuelsService.deleteRefuel(carId, refuelId, userId);
    }
}