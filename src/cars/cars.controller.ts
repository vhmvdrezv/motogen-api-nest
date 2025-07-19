import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateBrandDto } from './dto/brands/create-brand.dto';
import { CarsService } from './cars.service';
import { UpdateBrandDto } from './dto/brands/update-brand.dto';

@Controller('cars')
export class CarsController {
    constructor(
        private readonly carsService: CarsService
    ) { }

    @Get('brands')
    async getAllBrands() {
        return this.carsService.getAllBrands();
    }

    @Get('brands/:id')
    async getBrandById(@Param('id') id: string) { 
        return this.carsService.getBrandById(id);
    }

    @Post('brands')
    async createBrand(@Body() createBrandDto: CreateBrandDto) {
        return this.carsService.createBrand(createBrandDto);
    }

    @Put('brands/:id')
    async updateBrand(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
        return this.carsService.updateBrand(id, updateBrandDto);
    }

    @Delete('brands/:id')
    async deleteBrand(@Param('id') id: string) {
        return this.carsService.deleteBrand(id);
    }
}
