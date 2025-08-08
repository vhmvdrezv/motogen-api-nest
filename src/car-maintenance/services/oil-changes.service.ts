import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOilChangeDto } from "../dto/oil-change/create-oil-change.dto";
import { DatabaseService } from "src/database/database.service";
import { OilType } from "generated/prisma";

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
}