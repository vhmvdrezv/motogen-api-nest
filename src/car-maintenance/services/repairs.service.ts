import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRepairDto } from "../dto/repair/create-repair.dto";
import { DatabaseService } from "src/database/database.service";
import { GetAllRepairsDto } from "../dto/repair/get-all-repairs.dto";
import { SortOrder } from "src/common/enums/sort-order.enum";

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
}