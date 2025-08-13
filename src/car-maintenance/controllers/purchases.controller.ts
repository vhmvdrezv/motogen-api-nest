import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreatePurchaseDto } from "../dto/purchase/create-purchase.dto";
import { User } from "src/common/decorators/user.decorator";
import { PurchasesService } from "../services/purchases.service";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetAllPurchasesDto } from "../dto/purchase/get-all-purchases.dto";
import { UpdatePurchaseDto } from "../dto/purchase/update-purchase.dto";

@ApiTags('Purchases')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtGuard)
@Controller('users/me/cars/:carId/purchases')
export class PurchasesController { 
    constructor(
        private readonly purchasesService: PurchasesService
    ) { }

    @Post()
    async createPurchase(
        @Body() createPurchaseDto: CreatePurchaseDto,
        @Param('carId') carId: string,
        @User('userId') userId: string
    ) {
        return this.purchasesService.createPurchase(createPurchaseDto, carId, userId);
    }
    
    @Get()
    async getAllPurchases(
        @Query() getAllpurchasesDto: GetAllPurchasesDto,
        @Param('carId') carId: string,
        @User('userId') userId: string
    ) {
        return this.purchasesService.getAllPurchase(getAllpurchasesDto, carId, userId);
    }

    @Get(':purchaseId')
    async getPurchaseById(
        @Param('purchaseId') purchaseId: string,
        @Param('carId') carId: string,
        @User('userId') userId: string
    ) { 
        return this.purchasesService.getPurchaseById(purchaseId, carId, userId);
    }

    @Patch(':purchaseId')
    async updatePurchase(
        @Body() updatePurchaseDto: UpdatePurchaseDto,
        @Param('purchaseId') purchaseId: string,
        @Param('carId') carId: string,
        @User('userId') userId: string
    ) {
        return this.purchasesService.updatePurchase(updatePurchaseDto, purchaseId, carId, userId);
    }

    @Delete(':purchaseId')
    async deletePurchase(
        @Param('purchaseId') purchaseId: string,
        @Param('carId') carId: string,
        @User('userId') userId: string
    ) { 
        return this.purchasesService.deletePurchase(purchaseId, carId, userId);
    }
}