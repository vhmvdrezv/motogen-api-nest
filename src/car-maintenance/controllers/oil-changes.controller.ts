import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { CreateOilChangeDto } from "../dto/oil-change/create-oil-change.dto";
import { User } from "src/common/decorators/user.decorator";
import { OilChangesService } from "../services/oil-changes.service";
import { GetAllOilChangesDto } from "../dto/oil-change/get-all-oil-changes.dto";
import { UpdateOilChangeDto } from "../dto/oil-change/update-oil-change.dto";

@ApiTags('Oil-changes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtGuard)
@Controller('users/me/:carId/oil-changes')
export class OilChangesController {
    constructor(
        private readonly oilChangesService: OilChangesService
    ) { }

    @Post()
    async createOilChange(
        @Body() createOilChangeDto: CreateOilChangeDto,
        @Param('carId') carId: string,
        @User('userId') userId: string,
    ) {
        return this.oilChangesService.createOilChange(createOilChangeDto, carId, userId);
    }

    @Get()
    async getAllOilChanges(
        @Query() getAllOilChangesDto: GetAllOilChangesDto,
        @Param('carId') carId: string,
        @User('userId') userId: string
    ) {
        return this.oilChangesService.getAllOilChanges(getAllOilChangesDto, carId, userId);
    }

    @Get(':oilChangeId')
    async getOilChangeById(
        @Param('oilChangeId') oilChangeId: string,
        @Param('carId') carId: string,
        @User('userId') userId: string,
    ) {
        return this.oilChangesService.getOilChangeById(oilChangeId, carId, userId);
    }

    @Patch(':oilChangeId')
    async updateOilChange(
        @Body() updateOilChangeDto: UpdateOilChangeDto,
        @Param('carId') carId: string,
        @Param('oilChangeId') oilChangeId: string,
        @User('userId') userId: string,
    ) {
        return this.oilChangesService.updateOilChange(updateOilChangeDto, carId, oilChangeId, userId);
    }

    @Delete(':oilChangeId')
    async deleteOilChange(
        @Param('oilChangeId') oilChangeId: string,
        @Param('carId') carId: string,
        @User('userId') userId: string,
    ) {
        return this.oilChangesService.deleteOilChange(oilChangeId, carId, userId);
    }
}