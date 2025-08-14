import { Body, Controller, Get } from "@nestjs/common";
import { AiService } from "./ai.service";

@Controller('test-ai')
export class AiController {
    constructor(
        private readonly aiService: AiService
    ) {

    }

    @Get()
    async testAi(@Body() prompt: { prompt: string }) {
        const data = await this.aiService.getChatCompletion(prompt.prompt);
        return {
            data,
            message: 'موفقیت'
        }
    } 
}