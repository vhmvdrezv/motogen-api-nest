import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { CarsService } from 'src/cars/cars.service';
import { DatabaseService } from 'src/database/database.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class UserCarsService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly carsService: CarsService,
    ) { }

    async getUserCar(carId: string, userId: string) {
        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            },
            omit: {
                createdAt: true,
                updatedAt: true,
                userId: true,
            }
        });
        
        if (!car) throw new NotFoundException('خودرو شما یافت نشد');
        const { data: { brandTitle, modelTitle, title } } = await this.carsService.getTrimById(car.carTrimId);

        const data = {
            ...car,
            brandTitle,
            modelTitle,
            trimTitle: title
        }

        return {
            success: true,
            message: 'خودرو شما با موفقیت استخراج شد.',
            data,
        }
    }

    async getUserCars(userId: string) {
        const userCars = await this.databaseService.car.findMany({
            where: {
                userId
            },
            select: {
                carTrim: {
                    select: {
                        title: true,
                        carModel: {
                            select: {
                                title: true,
                                CarBrand: {
                                    select: {
                                        title: true,
                                    }
                                }
                            }
                        }
                    }
                },
                id: true,
                color: true,
                nickName: true,
            },
        });
        const flattenedCars = userCars.map(car => ({
            carTrimTitle: car.carTrim?.title || null,
            carModelTitle: car.carTrim?.carModel?.title || null,
            CarBrandTitle: car.carTrim?.carModel?.CarBrand?.title || null,
            id: car.id,
            color: car.color,
            nickName: car.nickName,
        }));

        return {
            success: true,
            message: 'لیست خودرو های شما استخراج شد.',
            data: flattenedCars
        }
    }

    async createCar(createCarDto: CreateCarDto, userId: string) {
        const user = await this.databaseService.user.findUnique({ 
            where: {
                id: userId
            },
            select: {
                cars: true
            }
        });
        if (!user) throw new NotFoundException('کاربر یافت نشد');
        if (user.cars.length >= 2) {
            throw new BadRequestException(' شما حداکثر دو خودرو میتوانید داشته باشید.')
        }

        const { productYear, carTrimId } = createCarDto;
        const trim = await this.databaseService.carTrim.findUnique({
            where: {
                id: carTrimId
            }
        });
        if (!trim) throw new NotFoundException("تریم خودرو یافت نشد.");

        if (productYear > trim.lastYearProd || productYear < trim.firstYearProd) {
            throw new BadRequestException("سال تولید خودرو شما اشتباه است."); 
        }

        const car = await this.databaseService.car.create({
            data: {
                userId,
                ...createCarDto,
            },
            select: {
                carTrim: {
                    select: {
                        title: true,
                        carModel: {
                            select: {
                                title: true,
                                CarBrand: {
                                    select: {
                                        title: true,
                                    }
                                }
                            }
                        }
                    }
                },
                id: true,
                color: true,
                nickName: true,

            },
        })

        const flattenedCar = {
            carTrimTitle: car.carTrim?.title || null,
            carModelTitle: car.carTrim?.carModel?.title || null,
            CarBrandTitle: car.carTrim?.carModel?.CarBrand?.title || null,
            id: car.id,
            color: car.color,
            nickName: car.nickName,
        };
        
        return {
            success: true,
            message: 'خودروی شما اضافه شد.',
            data: flattenedCar
        }
    }

    async deleteCar(carId: string, userId: string) {
        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId,
            }
        })
        if (!car) throw new NotFoundException('خودرو شما یافت نشد.');

        await this.databaseService.car.delete({
            where: {
                id: carId
            }
        });

        return {
            success: true,
            message: 'خودرو شما با موفقیت حذف شد.'
        }
    }

    async updateCar(updateCarDto: UpdateCarDto, carId: string, userId: string) {
        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId,
            }, include: {
                carTrim: true
            }
        })
        if (!car) throw new NotFoundException('خودرو شما یافت نشد.');

        const { carTrimId, productYear } = updateCarDto;
        if (carTrimId) {
            const carTrim = await this.databaseService.carTrim.findUnique({
                where: {
                    id: carTrimId,
                }
            });
            if (!carTrim) throw new NotFoundException('تریم خودرو شما یافت نشد');

            if (productYear) {
                if (productYear > carTrim.lastYearProd || productYear < carTrim.firstYearProd) {
                    throw new BadRequestException('سال تولید خودرو اشتباه است')
                }
            } else {
                if (car.productYear > carTrim.lastYearProd || car.productYear < carTrim.firstYearProd) {
                    throw new BadRequestException('سال تولید خودرو اشتباه است');
                }
            }
        } else {
            if (productYear) {
                if (productYear > car.carTrim.lastYearProd || productYear < car.carTrim.firstYearProd) {
                    throw new BadRequestException('سال تولید خودرو اشتباه است');
                }
            }
        }

        const updatedCar = await this.databaseService.car.update({
            where: {
                id: carId
            }, 
            data: updateCarDto,
            select: {
                carTrim: {
                    select: {
                        title: true,
                        carModel: {
                            select: {
                                title: true,
                                CarBrand: {
                                    select: {
                                        title: true,
                                    }
                                }
                            }
                        }
                    }
                },
                id: true,
                color: true,
                nickName: true,
                bodyInsuranceExpiry: true,
                fuel: true,
                kilometer: true,
                nextTechnicalInspectionDate: true,
                thirdPartyInsuranceExpiry: true,
                productYear: true
            },
        })

        const flattenedCar = {
            carTrimTitle: updatedCar.carTrim?.title || null,
            carModelTitle: updatedCar.carTrim?.carModel?.title || null,
            CarBrandTitle: updatedCar.carTrim?.carModel?.CarBrand?.title || null,
            id: updatedCar.id,
            color: updatedCar.color,
            nickName: updatedCar.nickName,
            bodyInsuranceExpiry: updatedCar.bodyInsuranceExpiry,
            fuel: updatedCar.fuel,
            kilometer: updatedCar.kilometer,
            nextTechnicalInspectionDate: updatedCar.nextTechnicalInspectionDate,
            thirdPartyInsuranceExpiry: updatedCar.thirdPartyInsuranceExpiry,
            productYear: updatedCar.productYear
        };

        return {
            success: true,
            message: 'خودرو با موفقیت ویرایش شد.',
            data: flattenedCar
        }
    }
}
