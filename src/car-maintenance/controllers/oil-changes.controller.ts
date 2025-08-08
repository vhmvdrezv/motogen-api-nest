import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { CreateOilChangeDto } from "../dto/oil-change/create-oil-change.dto";
import { User } from "src/common/decorators/user.decorator";
import { OilChangesService } from "../services/oil-changes.service";

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
}