import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePurchaseDto } from "../dto/purchase/create-purchase.dto";
import { DatabaseService } from "src/database/database.service";
import { GetAllPurchasesDto } from "../dto/purchase/get-all-purchases.dto";
import { SortOrder } from "src/common/enums/sort-order.enum";
import { UpdatePurchaseDto } from "../dto/purchase/update-purchase.dto";

@Injectable()
export class PurchasesService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async createPurchase(
        createPurchaseDto: CreatePurchaseDto,
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

        const purchase = await this.databaseService.purchaseLog.create({
            data: {
                ...createPurchaseDto,
                carId,
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });

        return {
            message: 'خرید با موفقیت ثبت شد.',
            data: purchase,
        }
    }

    async getAllPurchase(
        getAllPurchasesDto: GetAllPurchasesDto,
        carId: string,
        userId: string,
    ) {
        const { order = SortOrder.DESC } = getAllPurchasesDto;

        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            }
        });
        if (!car) throw new NotFoundException('خودرو شما یافت نشد');

        const orderBy = { date: order };

        const purchases = await this.databaseService.purchaseLog.findMany({
            where: {
                carId,
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            },
            orderBy,
        });

        return {
            message: 'لیست خرید ها استخراج شد.',
            data: purchases,
        }
    }

    async getPurchaseById(
        purchaseId: string,
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

        const purchase = await this.databaseService.purchaseLog.findUnique({
            where: {
                id: purchaseId,
                carId,
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });
        if (!purchase) throw new NotFoundException('خرید شما یافت نشد');

        return {
            message: 'خرید با موفقیت استخراج شد',
            data: purchase,
        }
    }

    async updatePurchase(
        updatePurchaseDto: UpdatePurchaseDto,
        purchaseId: string,
        carId: string,
        userId: string,
    ) {
        const car = await this.databaseService.car.findUnique({
            where: {
                id: carId,
                userId
            }
        });
        if (!car) throw new NotFoundException('خودرو شما یافت نشد');

        const purchase = await this.databaseService.purchaseLog.findUnique({
            where: {
                id: purchaseId,
                carId,
            }
        });
        if (!purchase) throw new NotFoundException('خرید شما یافت نشد');
        
        const updatedPurchase = await this.databaseService.purchaseLog.update({
            where: {
                id: purchaseId,
            },
            data: updatePurchaseDto,
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });

        return {
            message: 'خرید شما با موفقیت ویرایش شد.',
            data: updatedPurchase,
        }
    }

    async deletePurchase(
        purchaseId: string,
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

        const purchase = await this.databaseService.purchaseLog.findUnique({
            where: {
                id: purchaseId,
                carId,
            }
        });
        if (!purchase) throw new NotFoundException('خرید شما یافت نشد');

        await this.databaseService.purchaseLog.delete({
            where: {
                id: purchaseId
            }
        })

        return {
            message: 'خرید با موفقیت حذف شد',
        }
    }
}