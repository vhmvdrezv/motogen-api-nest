import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { DatabaseService } from 'src/database/database.service';
import { AiService } from 'src/ai/ai.service';
import { ChatSender } from 'generated/prisma';

@Injectable()
export class AiChatService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly aiService: AiService,
    ) { }


    async createFirstChat(
        createFirstChatDto: CreateChatDto, userId: string
    ) {
        const { prompt } = createFirstChatDto;

        const aiPrompt = await this.createPrompt(prompt, userId);
        const aiResponse = await this.aiService.getChatCompletion(aiPrompt);
        if (!aiResponse) throw new HttpException('خطا در دریافت پاسخ از هوش مصنوعی. لطفاً بعداً امتحان کنید.', 500);

        const { chatSessionId, chatSessionTitle } = await this.databaseService.$transaction(async (db) => {
            const chatSession = await db.chatSession.create({
                data: {
                    title: prompt.slice(0, 20),
                    userId
                }
            });

            await db.chat.createMany({
                data: [
                    {
                        content: prompt,
                        sender: ChatSender.USER,
                        chatSessionId: chatSession.id,
                    },
                    {
                        content: aiResponse,
                        sender: ChatSender.AI,
                        chatSessionId: chatSession.id,
                    }
                ]
            });

            return { chatSessionId: chatSession.id, chatSessionTitle: chatSession.title };
        });

        return {
            message: 'نشست چت با موفقیت ساخته شد.',
            data: {
                aiResponse,
                chatSessionId,
                chatSessionTitle,
            }
        }
    }

    async createChat(
        createChatDto: CreateChatDto,
        sessionId: string,
        userId: string,
    ) {
        const { prompt } = createChatDto;

        const chatSession = await this.databaseService.chatSession.findUnique({
            where: {
                id: sessionId,
            }
        })
        if (!chatSession) throw new NotFoundException('چت شما یافت نشد.');

        const aiPrompt = await this.createPrompt(prompt, userId);
        const aiResponse = await this.aiService.getChatCompletion(aiPrompt);
        if (!aiResponse) throw new HttpException('خطا در دریافت پاسخ از هوش مصنوعی. لطفاً بعداً امتحان کنید.', 500);

        await this.databaseService.$transaction(async (db) => {
            await db.chat.createMany({
                data: [
                    {
                        content: prompt,
                        sender: ChatSender.USER,
                        chatSessionId: chatSession.id,
                    },
                    {
                        content: aiResponse,
                        sender: ChatSender.AI,
                        chatSessionId: chatSession.id,
                    }
                ]
            });
        });

        return {
            message: 'چت با موفقیت ساخته شد.',
            data: {
                aiResponse,
            }
        }
    }

    async getAllChatSession(
        userId: string
    ) {
        const chatSessions = await this.databaseService.chatSession.findMany({
            where: {
                userId
            },
            select: {
                id: true,
                title: true,
            }
        });

        return {
            message: 'لیست چت ها با موفقیت استخراج شد.',
            data: chatSessions
        }
    }

    async getAllChats(
        chatSessionId: string,
        userId: string,
    ) {
        const chatSession = await this.databaseService.chatSession.findUnique({
            where: {
                id: chatSessionId,
                userId
            }
        });
        if (!chatSession) throw new NotFoundException('چت شما یافت نشد.');

        const chats = await this.databaseService.chat.findMany({
            where: {
                chatSessionId
            },
            omit: {
                updatedAt: true,
            },
            orderBy: {
                createdAt: 'asc',
            }
        })

        return {
            message: 'چت ها استخراج شد.',
            data: chats,
        }
    }

    private async createPrompt(
        prompt: string, userId: string
    ): Promise<string> {

        const cars = await this.databaseService.car.findMany({
            where: {
                userId
            },
            omit: {
                createdAt: true,
                updatedAt: true,
                userId: true,
                nickName: true,
                thirdPartyInsuranceExpiry: true,
                nextTechnicalInspectionDate: true,
                bodyInsuranceExpiry: true,

            }
        });
        const car = cars[0];

        const { carTrimId, productYear, fuel, color, kilometer } = car;
        if (!car) throw new NotFoundException('خودرو شما یافت نشد.');
        const trim = await this.databaseService.carTrim.findUnique({
            where: {
                id: carTrimId,
            },
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
                },
            }
        });
        if (!trim) {
            throw new NotFoundException('اطلاعات تیپ خودرو یافت نشد.');
        }

        const brand = trim.carModel.CarBrand.title;
        const model = trim.carModel.title;
        const trimTitle = trim.title;

        const finalPrompt = `
شما یک دستیار هوشمند خودرو هستید. همیشه پاسخ‌های خود را بر اساس مشخصات زیر در نظر بگیرید:

مشخصات خودرو کاربر:
- برند: ${brand}
- مدل: ${model}
- تیپ: ${trimTitle}
- سال تولید: ${car.productYear}
- رنگ: ${car.color}
- نوع سوخت: ${car.fuel}
- کیلومتر فعلی: ${car.kilometer}

سوال یا درخواست کاربر:
"${prompt}"

لطفاً به زبان فارسی و با توجه به مشخصات ماشین کاربر پاسخ دهید.
        `.trim();
        return finalPrompt;
    }
}
