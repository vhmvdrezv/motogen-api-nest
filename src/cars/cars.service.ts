import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBrandDto } from './dto/brands/create-brand.dto';
import { UpdateBrandDto } from './dto/brands/update-brand.dto';

@Injectable()
export class CarsService {
    constructor(
        private readonly databaseService: DatabaseService
    ) {}

    async createBrand(createBrandDto: CreateBrandDto) {
        const { title, active } = createBrandDto;

        const brandExists = await this.databaseService.carBrand.findUnique({
            where: {
                title
            }
        });

        if (brandExists) throw new ConflictException('برند دیگری با این نام ثبت شده است.');

        const newBrand = await this.databaseService.carBrand.create({
            data: {
                title,
                active,
            }
        });

        return {
            success: true,
            message: 'برند با موفقیت ساخته شد.',
            data: newBrand
        };
    }

    async getAllBrands() {
        const where: any = { active: true };

        const brands = await this.databaseService.carBrand.findMany({
            where,
            select: {
                id: true,
                title: true,  
            },
        });

        return {
            success: true,
            message: 'لیست برند ها استخراج شد.',
            data: brands
        };
    }

    async updateBrand(id: string, updateBrandDto: UpdateBrandDto) {
        const { title, active } = updateBrandDto;

        const where: any = { id };
        const data: any = { title, active };

        if ( title ) {
            const brandWithTitleExists = await this.databaseService.carBrand.findUnique({
                where: {
                    title
                }
            });

            if (brandWithTitleExists) {
                throw new ConflictException('برندی با این اسم وجود دارد ، اسم دیگری را انتخاب کنید');
            }
        }
        
        const updatedBrand = await this.databaseService.carBrand.update({
            where,
            data,
            select: {
                id: true,
                title: true,
                active: true
            }
        });

        return {
            success: true,
            message: "برند خودرو با موفقیت بروزرسانی شد.",
            data: updatedBrand,
        };
    }

    async getBrandById(id: string) {
        const brand = await this.databaseService.carBrand.findUnique({
            where: {
                id,
            }, 
            select: {
                id: true,
                title: true,
                active: true
            }
        });

        if (!brand) throw new NotFoundException(`برندی با شناسه ${id} یافت نشد.`);
        if (!brand?.active) throw new NotFoundException(`برندی با شناسه ${id} یافت نشد.`);

        const { active, ...rest} = brand;

        return {
            success: true,
            message: 'برند خودرو با موفقیت استخراج شد.',
            data: rest,
        };
    }

    async deleteBrand(id: string) {
        const where: any = { id };

        const brand = await this.databaseService.carBrand.findUnique({
            where
        });

        if (!brand) throw new NotFoundException(`برندی با شناسه ${id} یافت نشد.`);

        await this.databaseService.carBrand.delete({
            where
        });

        return {
            success: true,
            message: 'برند خودرو با موفقیت حذف شد.'
        }
    }
}
