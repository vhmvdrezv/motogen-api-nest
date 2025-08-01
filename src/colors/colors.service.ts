import { Injectable } from '@nestjs/common';
import { CarColor } from 'generated/prisma';

@Injectable()
export class ColorsService {

    private readonly persianTranslations: Record<string, string> = {
        BLACK: 'سیاه',
        WHITE: 'سفید',
        SILVER: 'نقره‌ای',
        GRAY: 'خاکستری',
        RED: 'قرمز',
        BLUE: 'آبی',
        GREEN: 'سبز',
        YELLOW: 'زرد',
        ORANGE: 'نارنجی',
        BROWN: 'قهوه‌ای',
        PURPLE: 'بنفش',
        GOLD: 'طلایی',
    };


    async getAllColors() {
        const colors = Object.values(CarColor);
        const data = colors.map((color) => ({ persianTitle: this.persianTranslations[color], englishTitle: color }));

        return {
            success: true,
            message: "لیست رنگ ها استخراج شد",
            data,
        }
    }
}
