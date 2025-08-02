import { Injectable, NotFoundException } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { DatabaseService } from 'src/database/database.service';

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
}
