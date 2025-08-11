import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { CreateRepairDto } from "../dto/repair/create-repair.dto";
import { User } from "src/common/decorators/user.decorator";
import { RepairsService } from "../services/repairs.service";
import { GetAllRepairsDto } from "../dto/repair/get-all-repairs.dto";

@ApiTags('Repairs')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtGuard)
@Controller('users/me/cars/:carId/repairs')
export class RepairsController {
    constructor(
        private readonly repairsService: RepairsService
    ) { }

    @Post()
    async createRepair(
        @Body() createRepairDto: CreateRepairDto,
        @Param('carId') carId: string,
        @User('userId') userId: string,
    ) {
        return this.repairsService.createRepair(createRepairDto, carId, userId);
    }

    @Get()
    async getAllRepairs(
        @Query() getAllRepairsDto: GetAllRepairsDto,
        @Param('carId') carId: string,
        @User('userId') userId: string,
    ) {
        return this.repairsService.getAllRepairs(getAllRepairsDto, carId, userId);
    }
}