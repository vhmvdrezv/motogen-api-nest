import { BadRequestException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async completeProfile(completeProfileDto: CompleteProfileDto, userId: string) {
        const { userInformation, carInformation } = completeProfileDto
        const { productYear, trimId } = carInformation;

        const user = await this.databaseService.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) throw new NotFoundException('کاربر یافت نشد.');
        if (user.isProfileCompleted) {
            throw new BadRequestException("شما قبل پروفایل خود را تکمیل کرده اید، از بخش پروفایل میتوانید ویرایش کنید");
        }

        const trim = await this.databaseService.carTrim.findUnique({
            where: {
                id: trimId
            }
        });
        if (!trim || !trim.active) {
            throw new NotFoundException("تریم خودرو شما یافت نشد");
        }

        if (trim.firstYearProd > productYear || trim.lastYearProd < productYear) {
            throw new BadRequestException("سال تولید خودرو شما اشتباه است.");
        }

        await this.databaseService.$transaction(async (db) => {
            await db.user.update({
                where: {
                    id: userId
                },
                data: {
                    firstName: userInformation.firstName,
                    lastName: userInformation.lastName,
                    isProfileCompleted: true
                }
            });
            await db.car.create({
                data: {
                    userId,
                    productYear,
                    carTrimId: trimId,
                    color: carInformation.color,
                    fuel: carInformation.feul,
                    insuranceExpirationDate: carInformation.insuranceExpirationDate,
                    nextTechnicalInspectionDate: carInformation.nextTechnicalInspectionDate,
                    kilometer: carInformation.kilometer,
                    nickName: carInformation.nickName,
                }
            });
        });

        return {
            success: true,
            message: 'اطلاعات با موفقیت ثبت شد'
        }
    }

}
