import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { CarsService } from 'src/cars/cars.service';
import { DatabaseService } from 'src/database/database.service';
import { CreateCarDto } from './dto/create-car.dto';

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

        const { productYear, trimId, color, fuel, insuranceExpirationDate, kilometer, nextTechnicalInspectionDate, nickName } = createCarDto;
        const trim = await this.databaseService.carTrim.findUnique({
            where: {
                id: trimId
            }
        });
        if (!trim) throw new NotFoundException("تریم خودرو یافت نشد.");

        if (productYear > trim.lastYearProd || productYear < trim.firstYearProd) {
            throw new BadRequestException("سال تولید خودرو شما اشتباه است."); 
        }

        const car = await this.databaseService.car.create({
            data: {
                color,
                fuel,
                carTrimId: trimId,
                productYear,
                insuranceExpirationDate,
                kilometer,
                nextTechnicalInspectionDate,
                userId,
                nickName,
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
}
