import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRefuelDto } from "../dto/refuel/create-refuel.dto";
import { DatabaseService } from "src/database/database.service";
import { UpdateRefuelDto } from "../dto/refuel/update-refuel.dto";
import { GetAllRefuelsDto } from "../dto/refuel/get-all-refuels.dto";

@Injectable()
export class RefuelsService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async createRefuel(createRefuelDto: CreateRefuelDto, carId: string, userId: string) {
        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            }
        });
        if (!car) throw new NotFoundException('خودرو شما یافت نشد');

        const refuelLog = await this.databaseService.refuelLog.create({
            data: {
                ...createRefuelDto,
                carId
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });

        return {
            message: 'سوخت با موفقیت اضافه شد.',
            data: refuelLog,
        }
    }

    async getAllRefuel(
        getAllRefuelsDto: GetAllRefuelsDto,
        carId: string,
        userId: string
    ) {
        const { order } = getAllRefuelsDto;
        
        const car = await this.databaseService.car.findUnique({ where: { id: carId } });
        if (!car) throw new NotFoundException('خودرو یافت نشد');
        const user = await this.databaseService.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('کاربر یافت نشد.');

        const orderBy = order ? { createdAt: order} : undefined;

        const refuels = await this.databaseService.refuelLog.findMany({
            where: {
                carId,
                car: {
                    userId
                }
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            },
            orderBy
        });

        return {
            message: 'لیست سوخت ها استخراج شد.',
            data: refuels,
        };
    }

    async getRefuelById(
        carId: string,
        refuelId: string,
        userId: string
    ) {
        const car = await this.databaseService.car.findUnique({ where: { id: carId } });
        if (!car) throw new NotFoundException('خودرو یافت نشد');
        const user = await this.databaseService.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('کاربر یافت نشد.');

        const refuel = await this.databaseService.refuelLog.findUnique({
            where: {
                id: refuelId,
                carId: carId,
                car: {
                    userId
                },
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });
        if (!refuel) throw new NotFoundException('سوخت یافت نشد.');

        return {
            message: 'سوخت با موفقیت استخراج شد',
            data: refuel,
        }
    }

    async updateRefuel(
        updateRefuelDto: UpdateRefuelDto,
        carId: string,
        userId: string,
        refuelId: string,
    ) {
        const refuel = await this.databaseService.refuelLog.findUnique({
            where: {
                id: refuelId,
                carId: carId,
                car: {
                    userId
                }
            }
        });
        if (!refuel) throw new NotFoundException('سوخت یافت نشد.');

        const updatedRefuel = await this.databaseService.refuelLog.update({
            where: {
                id: refuelId
            },
            data: updateRefuelDto,
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });

        return {
            message: 'سوخت ویرایش شد.',
            data: updatedRefuel,
        }
    }

    async deleteRefuel(carId: string, refuelId: string, userId: string) {
        const refuel = await this.databaseService.refuelLog.findUnique({
            where: {
                id: refuelId,
                carId: carId,
                car: {
                    userId
                }
            }
        });
        if (!refuel) throw new NotFoundException('سوخت یافت نشد.');

        await this.databaseService.refuelLog.delete({
            where: {
                id: refuelId,
            }
        });

        return {
            message: 'سوخت با موفقیت حذف شد.'
        }
    }
}