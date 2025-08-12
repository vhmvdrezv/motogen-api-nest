import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRepairDto } from "../dto/repair/create-repair.dto";
import { DatabaseService } from "src/database/database.service";
import { GetAllRepairsDto } from "../dto/repair/get-all-repairs.dto";
import { SortOrder } from "src/common/enums/sort-order.enum";
import { UpdateRepairDto } from "../dto/repair/update-repair.dto";

@Injectable()
export class RepairsService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async createRepair(
        createRepairDto: CreateRepairDto,
        carId: string,
        userId: string,
    ) {
        const { kilometer } = createRepairDto;

        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            }
        });
        if (!car) throw new NotFoundException('خودرو شما یافت نشد');

        const repair = await this.databaseService.$transaction(async (db) => {
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

            return await this.databaseService.repairLog.create({
                data: {
                    ...createRepairDto,
                    carId
                },
                omit: {
                    createdAt: true,
                    updatedAt: true,
                }
            });
        });

        return {
            message: 'تعمیر با موفقیت ثبت شد.',
            data: repair
        };
    }

    async getAllRepairs(
        getAllRepairsDto: GetAllRepairsDto,
        carId: string,
        userId: string
    ) {
        const { order = SortOrder.DESC } = getAllRepairsDto;

        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            }
        });
        if (!car) throw new NotFoundException('خودرو شما یافت نشد');

        const orderBy = { date: order};

        const repairs = await this.databaseService.repairLog.findMany({
            where: {
                carId
            },
            orderBy,
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        })

        return {
            message: 'لیست تعمیرات استخراج شد',
            data: repairs
        };
    }

    async getRepairById(
        repairId: string,
        carId: string,
        userId: string
    ) {
        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            }
        });
        if (!car) throw new NotFoundException('خودرو شما یافت نشد');
    
        const repair = await this.databaseService.repairLog.findUnique({
            where: {
                id: repairId,
                carId,
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });

        return {
            message: 'تعمیرات استخراج شد',
            data: repair
        }
    }

    async updateRepair(
        updateRepairDto: UpdateRepairDto,
        repairId: string,
        carId: string,
        userId: string
    ) {
        const { kilometer } = updateRepairDto;
        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            }
        })
        if(!car) throw new NotFoundException('خودرو شما یافت نشد');
        const repair = await this.databaseService.repairLog.findUnique({
            where: {
                id: repairId,
                carId
            }
        });
        if (!repair) throw new NotFoundException('تعمیرات شما یافت نشد.');

        const carNeedsUpdate = kilometer && kilometer > car.kilometer;
        let updatedRepair;

        if (carNeedsUpdate) {
            updatedRepair = await this.databaseService.$transaction(async (db) => {
                await db.car.update({
                    where: {
                        id: carId
                    },
                    data: {
                        kilometer
                    }
                });

                return db.repairLog.update({
                    where: {
                        id: repairId,
                    },
                    data: updateRepairDto,
                    omit: {
                        createdAt: true,
                        updatedAt: true,
                    }
                })
            });
        } else {
            updatedRepair = await this.databaseService.repairLog.update({
                where: {
                    id: repairId
                },
                data: updateRepairDto,
                omit: {
                    createdAt: true,
                    updatedAt: true,
                }
            })
        }

        return {
            message: 'تعمیرات با موفقیت ویرایش شد.',
            data: updatedRepair
        }
    }

    async deleteRepair(
        repairId: string,
        carId: string,
        userId: string,
    ) {
        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            }
        })
        if(!car) throw new NotFoundException('خودرو شما یافت نشد');
        const repair = await this.databaseService.repairLog.findUnique({
            where: {
                id: repairId,
                carId
            }
        });
        if (!repair) throw new NotFoundException('تعمیرات شما یافت نشد.');

        await this.databaseService.repairLog.delete({
            where: {
                id: repairId
            }
        });

        return {
            message: 'تعمیرات با موفقیت حذف شد.'
        }
    }
}