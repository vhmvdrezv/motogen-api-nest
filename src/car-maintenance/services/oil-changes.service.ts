import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOilChangeDto } from "../dto/oil-change/create-oil-change.dto";
import { DatabaseService } from "src/database/database.service";
import { OilType } from "generated/prisma";
import { GetAllOilChangesDto } from "../dto/oil-change/get-all-oil-changes.dto";
import { UpdateOilChangeDto } from "../dto/oil-change/update-oil-change.dto";

@Injectable()
export class OilChangesService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async createOilChange(
        createOilChangeDto: CreateOilChangeDto,
        carId: string,
        userId: string,
    ) {
        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            }
        });
        if (!car) throw new NotFoundException('خودرو یافت نشد.');

        const {
            kilometer,
            oilFilterChanged = false,
            airFilterChanged = false,
            cabinFilterChanged = false,
            fuelFilterChanged = false,
            oilType,
            ...rest
        } = createOilChangeDto;

        const oilChange = await this.databaseService.$transaction(async (db) => {
            if (car.kilometer < kilometer) {
                await db.car.update({
                    where: {
                        id: carId
                    },
                    data: {
                        kilometer
                    }
                });
            }

            const baseData = { ...rest, carId, oilType, kilometer };

            const data =
                oilType === OilType.ENGINE
                    ? { ...baseData, oilFilterChanged, airFilterChanged, cabinFilterChanged, fuelFilterChanged }
                    : baseData;

            return await db.oilChangeLog.create({
                data,
                omit: {
                    createdAt: true,
                    updatedAt: true,
                }
            });
        });

        return {
            message: 'تعویض روغن ثبت شد.',
            data: oilChange
        }
    }

    async getAllOilChanges(
        getAllOilChangesDto: GetAllOilChangesDto,
        carId: string,
        userId: string,
    ) {
        const { oilType, order } = getAllOilChangesDto;

        const car = await this.databaseService.car.findUnique({ where: { id: carId } });
        if (!car) throw new NotFoundException('خودرو یافت نشد');
        const user = await this.databaseService.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('کاربر یافت نشد.');

        const where = {
            carId,
            car: {
                userId
            },
            oilType: oilType ? oilType : undefined,
        };

        const orderBy = order ? { createdAt: order } : undefined;
        const oilChanges = await this.databaseService.oilChangeLog.findMany({
            where,
            omit: {
                updatedAt: true,
                createdAt: true,
                airFilterChanged: oilType !== OilType.ENGINE,
                oilFilterChanged: oilType !== OilType.ENGINE,
                fuelFilterChanged: oilType !== OilType.ENGINE,
                cabinFilterChanged: oilType !== OilType.ENGINE,
            },
            orderBy
        });

        return {
            message: 'لیست تعویض روغن استخراج شد.',
            data: oilChanges,
        }
    }

    async getOilChangeById(
        oilChangeId: string,
        carId: string,
        userId: string
    ) {
        const car = await this.databaseService.car.findUnique({ where: { id: carId } });
        if (!car) throw new NotFoundException('خودرو یافت نشد');
        const user = await this.databaseService.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('کاربر یافت نشد.');

        const oilChange = await this.databaseService.oilChangeLog.findUnique({
            where: {
                id: oilChangeId,
                carId,
                car: {
                    userId
                }
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });
        if (!oilChange) throw new NotFoundException('تعویض روغن یافت نشد.');

        return {
            message: 'تعویض روغن استخراج شد.',
            data: oilChange,
        }
    }

    async updateOilChange(
        updateOilChangeDto: UpdateOilChangeDto,
        carId: string,
        oilChangeId: string,
        userId: string,
    ) {
        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            }
        });
        if (!car) throw new NotFoundException('خودرو یافت نشد.');

        const oilChange = await this.databaseService.oilChangeLog.findUnique({ where: { id: oilChangeId }});
        if (!oilChange) throw new NotFoundException('تعویض روغن یافت نشد.')

        const {
            kilometer,
            oilFilterChanged,
            airFilterChanged,
            cabinFilterChanged,
            fuelFilterChanged,
            ...rest
        } = updateOilChangeDto;

        const oilChangeUpdated = await this.databaseService.$transaction(async (db) => {
            if (kilometer) {
                if (car.kilometer < kilometer) {
                    await db.car.update({
                        where: {
                            id: carId
                        },
                        data: {
                            kilometer
                        }
                    });
                }
            }

            const baseData = { ...rest, kilometer };
            const data =
                oilChange.oilType === OilType.ENGINE
                    ? { ...baseData, oilFilterChanged, airFilterChanged, cabinFilterChanged, fuelFilterChanged }
                    : baseData;

            return await db.oilChangeLog.update({
                where: {
                    id: oilChangeId
                },
                data,
                omit: {
                    createdAt: true,
                    updatedAt: true,
                }
            });
        });

        return {
            message: 'تعویض روغن با موفقیت ویرایش شد.',
            data: oilChangeUpdated,
        }
    }

    async deleteOilChange(
        oilChangeId: string,
        carId: string,
        userId: string
    ) {
        const car = await this.databaseService.car.findUnique({ where: { id: carId } });
        if (!car) throw new NotFoundException('خودرو یافت نشد');
        const user = await this.databaseService.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('کاربر یافت نشد.');

        const oilChange = await this.databaseService.oilChangeLog.findUnique({
            where: {
                id: oilChangeId,
                carId: carId,
                car: {
                    userId
                }
            }
        });
        if (!oilChange) throw new NotFoundException('تعویض روغن یافت نشد');

        await this.databaseService.oilChangeLog.delete({
            where: {
                id: oilChangeId
            }
        });

        return {
            message: 'تعویض روغن با موفقیت حذف شد.',
        }
    }
}