import { BadRequestException, Body, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBrandDto } from './dto/brands/create-brand.dto';
import { UpdateBrandDto } from './dto/brands/update-brand.dto';
import { CreateModelDto } from './dto/models/create-model.dto';
import { UpdateModelDto } from './dto/models/update-model.dto';
import { CreateTrimDto } from './dto/trims/create-trim.dto';
import { UpdateTrimDto } from './dto/trims/update-trim.dto';

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
            message: "برند خودرو با موفقیت بروزرسانی شد.",
            data: updatedBrand,
        };
    }

    async getBrandById(id: string) {
        const brand = await this.databaseService.carBrand.findUnique({
            where: {
                id,
                active: true,
            }, 
            select: {
                id: true,
                title: true,
                active: true
            }
        });

        if (!brand) throw new NotFoundException(`برندی با شناسه ${id} یافت نشد.`);

        const { active, ...rest} = brand;

        return {
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
            message: 'برند خودرو با موفقیت حذف شد.'
        };
    }

    async createModel(createModelDto: CreateModelDto) {
        const { title, active, carBrandId } = createModelDto;

        const brandExists = await this.databaseService.carBrand.findUnique({
            where: {
                id: carBrandId
            }
        });
        if (!brandExists) {
            throw new NotFoundException(`برند خودرو با شناسه ${carBrandId} یافت نشد.`)
        }
        
        const modelExists = await this.databaseService.carModel.findUnique({
            where: {
                carBrandId_title: {
                    carBrandId,
                    title
                }
            }
        });
        if (modelExists) throw new ConflictException(`مدل ماشین در برند وارد شده وجود دارد. مدل دیگری وارد کنید.`);

        const model = await this.databaseService.carModel.create({
            data: {
                title,
                active,
                carBrandId
            },
        });

        return {
            message: 'مدل خودرو با موفقیت ثبت شد.',
            data: model,
        };
    }

    async getAllModels() {
        const where: any = { active: true };

        const models = await this.databaseService.carModel.findMany({
            where,
            omit: {
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return {
            message: 'مدل های خودرو استخراج شدند.',
            data: models
        };
    }

    async getBrandModels(carBrandId: string) {
        const brand = await this.databaseService.carBrand.findUnique({
            where: {
                id: carBrandId,
                active: true,
            }
        });
        if (!brand) throw new NotFoundException(`برند با شناسه ${carBrandId} یافت نشد.`);

        const where: any = { 
            active: true,
            carBrandId,
        }

        const models = await this.databaseService.carModel.findMany({
            where,
            omit: {
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return {
            message: 'لیست مدل ها استخراج شد',
            data: models
        };
    }

    async getModelById(id: string) {
        const model = await this.databaseService.carModel.findUnique({
            where: {
                id,
                active: true
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!model) throw new NotFoundException(`مدل با شناسه ${id} یافت نشد.`);

        const { active, ...rest } = model;

        return {
            message: 'مدل خودرو با موفقیت استخراج شد.',
            data: rest
        };
    }

    async updateModel(id: string, updateModelDto: UpdateModelDto) {
        const { title, active, carBrandId } = updateModelDto;

        const model = await this.databaseService.carModel.findUnique({
            where: {
                id
            }
        });
        if (!model) throw new NotFoundException(`مدل با شناسه ${id} یافت نشد.`);

        if (carBrandId) {
            const carBrandExists = await this.databaseService.carBrand.findUnique({
                where: {
                    id: carBrandId
                }
            });

            if (!carBrandExists) throw new NotFoundException(`برند خودرو با شناسه ${carBrandId} یافت نشد.`);
        }

        if (title && !carBrandId) {
            const modelWithTitleExists = await this.databaseService.carModel.findUnique({
                where: {
                    carBrandId_title: {
                        carBrandId: model.carBrandId,
                        title
                    }
                }
            })

            if (modelWithTitleExists) {
                throw new ConflictException('اسم مدل در برند وجود دارد. اسم دیگری انتخاب کنید');
            }
        }

        if (!title && carBrandId) {
            const modelWithTitleExists = await this.databaseService.carModel.findUnique({
                where: {
                    carBrandId_title: {
                        carBrandId,
                        title: model.title,
                    }
                }
            })

            if (modelWithTitleExists) {
                throw new ConflictException(' اسم مدل در برند وجود دارد. برند دیگری انتخاب کنید یا اسم مدل را تغییر دهید');
            }
        }

        if (title && carBrandId) {
            const modelWithTitleExists = await this.databaseService.carModel.findUnique({
                where: {
                    carBrandId_title: {
                        carBrandId,
                        title
                    }
                }
            })

            if (modelWithTitleExists) {
                throw new ConflictException(' اسم مدل در برند وجود دارد. برند دیگری انتخاب کنید یا اسم مدل را تغییر دهید');
            }
        }

        const updatedModel = await this.databaseService.carModel.update({
            where: {
                id
            },
            data: updateModelDto
        });

        return {
            message: 'مدل با موفقیت بروزرسانی شد.',
            data: updatedModel,
        };
    }

    async deleteModel(id: string) {
        const model = await this.databaseService.carModel.findUnique({
            where: {
                id
            }
        });

        if (!model) throw new NotFoundException(`مدل با شناسه ${id} یافت نشد.`);

        await this.databaseService.carModel.delete({
            where: {
                id
            }
        });

        return {
            message: 'مدل با موفقیت حذف شد.',
        }
    }

    async createTrim(@Body() createTrimDto: CreateTrimDto) {
        const { title, firstYearProd, lastYearProd, active, carModelId } = createTrimDto;

        if (firstYearProd > lastYearProd) {
            throw new BadRequestException('اولین سال تولید نباید از آخرین سال تولید بیشتر باشد');
        }


        const modelExists = await this.databaseService.carModel.findUnique({
            where: {
                id: carModelId
            }
        });
        if(!modelExists) throw new NotFoundException(`مدلی با شناسه ${carModelId} یافت نشد.`);

        const trimExists = await this.databaseService.carTrim.findUnique({
            where: {
                carModelId_title: {
                    carModelId,
                    title
                } 
            }
        });
        if(trimExists) throw new ConflictException(`تیپ ماشین در مدل وارد شده وجود دارد. تیپ ماشین را عوض کنید.`);

        const trim = await this.databaseService.carTrim.create({
            data: {
                title,
                firstYearProd,
                lastYearProd,
                active,
                carModelId,
            }
        });

        return {
            message: 'تیپ با موفقیت ساخته شد.',
            data: trim
        };
    }

    async getAllTrims() {
        const trims = await this.databaseService.carTrim.findMany({
            where: {
                active: true,
            },
            omit: {
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return {
            message: 'لیست تیپ ها با موفقیت استخراج شد.',
            data: trims
        }
    }

    async getModelTrims(carModelId: string) {
        const model = await this.databaseService.carModel.findUnique({
            where: {
                id: carModelId,
                active: true,
            }
        })
        if (!model) throw new NotFoundException(`مدل با شناسه ${carModelId} یافت نشد.`);

        const where: any = { 
            active: true,
            carModelId,
        }

        const trims = await this.databaseService.carTrim.findMany({
            where,
            omit: {
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return {
            message: 'لیست تیپ ها استخراج شد.',
            data: trims
        }
    }

    async getTrimById(id: string) {
        const trim = await this.databaseService.carTrim.findUnique({
            where: {
                id,
                active: true
            },
            omit: {
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        if (!trim) throw new NotFoundException(`تیپ با شناسه ${id} یافت نشد.`);

        const model = await this.databaseService.carModel.findUnique({
            where: {
                id: trim.carModelId,
            },
            select: {
                title: true,
                CarBrand: {
                    select: {
                        title: true
                    }
                }
            },
        });

        const data = {
            ...trim,
            modelTitle: model?.title,
            brandTitle: model?.CarBrand.title,
        }

        return {
            message: 'تیپ خودرو با موفقیت استخراج شد.',
            data,
        };
    }

    async updateTrim(id: string, updateTrimDto: UpdateTrimDto) {
        const { title, active, firstYearProd, lastYearProd, carModelId } = updateTrimDto;

        if (firstYearProd && lastYearProd) {
            if (firstYearProd > lastYearProd) {
                throw new BadRequestException('اولین سال تولید نباید از آخرین سال تولید بیشتر باشد');
            }
        }

        const trim = await this.databaseService.carTrim.findUnique({
            where: {
                id
            }
        });
        if (!trim) throw new NotFoundException(`تیپ با شناسه ${id} یافت نشد.`);

        if (firstYearProd && !lastYearProd) {
            if (firstYearProd > trim.lastYearProd) {
              throw new BadRequestException('اولین سال تولید نباید از آخرین سال تولید بیشتر باشد');  
            }
        }

        if (!firstYearProd && lastYearProd) {
            if (trim.firstYearProd > lastYearProd) {
              throw new BadRequestException('اولین سال تولید نباید از آخرین سال تولید بیشتر باشد');  
            }
        }

        if (carModelId) {
            const carModelExists = await this.databaseService.carModel.findUnique({
                where: {
                    id: carModelId
                }
            });

            if (!carModelExists) throw new NotFoundException(`مدل خودرو با شناسه ${carModelId} یافت نشد.`);
        }

        if (title && !carModelId) {
            const trimWithTitleExists = await this.databaseService.carTrim.findUnique({
                where: {
                    carModelId_title: {
                        carModelId: trim.carModelId,
                        title
                    }
                }
            })

            if (trimWithTitleExists) {
                throw new ConflictException('اسم تیپ در مدل وجود دارد. اسم دیگری انتخاب کنید');
            }
        }

        if (!title && carModelId) {
            const trimWithTitleExists = await this.databaseService.carTrim.findUnique({
                where: {
                    carModelId_title: {
                        carModelId,
                        title: trim.title,
                    }
                }
            })

            if (trimWithTitleExists) {
                throw new ConflictException(' اسم تیپ در مدل وجود دارد. مدل دیگری انتخاب کنید یا اسم تیپ را تغییر دهید');
            }
        }

        if (title && carModelId) {
            const trimWithTitleExists = await this.databaseService.carTrim.findUnique({
                where: {
                    carModelId_title: {
                        carModelId,
                        title
                    }
                }
            })

            if (trimWithTitleExists) {
                throw new ConflictException(' اسم تیپ در مدل وجود دارد. مدل دیگری انتخاب کنید یا اسم تیپ را تغییر دهید');
            }
        }

        const updatedTrim = await this.databaseService.carTrim.update({
            where: {
                id
            },
            data: updateTrimDto
        });

        return {
            message: 'تیپ با موفقیت بروزرسانی شد.',
            data: updatedTrim,
        };
    }

    async deleteTrim(id: string) {
        const trim = await this.databaseService.carTrim.findUnique({
            where: {
                id
            }
        });
        if(!trim) throw new NotFoundException(`تیپ با شناسه ${id} یافت نشد.`);

        await this.databaseService.carTrim.delete({
            where: {
                id
            }
        });

        return {
            message: 'تیپ با موفقیت حذف شد.'
        };
    }
}
