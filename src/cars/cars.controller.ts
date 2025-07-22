import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateBrandDto } from './dto/brands/create-brand.dto';
import { CarsService } from './cars.service';
import { UpdateBrandDto } from './dto/brands/update-brand.dto';
import { CreateModelDto } from './dto/models/create-model.dto';
import { UpdateModelDto } from './dto/models/update-model.dto';
import { CreateTrimDto } from './dto/trims/create-trim.dto';
import { UpdateTrimDto } from './dto/trims/update-trim.dto';

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

    @Patch('brands/:id')
    async updateBrand(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
        return this.carsService.updateBrand(id, updateBrandDto);
    }

    @Delete('brands/:id')
    async deleteBrand(@Param('id') id: string) {
        return this.carsService.deleteBrand(id);
    }

    @Get('models')
    async getAllModels() {
        return this.carsService.getAllModels();
    }

    @Get('brands/:id/models')
    async getBrandModels(@Param('id') carBrandId: string) {
        return this.carsService.getBrandModels(carBrandId);
    }

    @Get('models/:id')
    async getModelById(@Param('id') id: string) {
        return this.carsService.getModelById(id);
    }

    @Post('models')
    async createModel(@Body() createModelDto: CreateModelDto) {
        return this.carsService.createModel(createModelDto);
    }

    @Patch('models/:id')
    async updateModel(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
        return this.carsService.updateModel(id, updateModelDto);
    }

    @Delete('models/:id')
    async deleteModel(@Param('id') id: string) {
        return this.carsService.deleteModel(id);
    }

    @Post('trims')
    async createTrim(@Body() createTrimDto: CreateTrimDto) {
        return this.carsService.createTrim(createTrimDto);
    }

    @Get('trims')
    async getAllTrims() {
        return this.carsService.getAllTrims();
    }

    @Get('models/:id/trims')
    async getModelTrims(@Param('id') carModelId: string) {
        return this.carsService.getModelTrims(carModelId);
    }

    @Get('trims/:id')
    async getTrimById(@Param('id') id: string) {
        return this.carsService.getTrimById(id);
    }

    @Patch('trims/:id')
    async updateTrim(@Param('id') id: string, @Body() updateTrimDto: UpdateTrimDto) {
        return this.carsService.updateTrim(id, updateTrimDto);
    }
}
