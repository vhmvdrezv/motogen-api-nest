import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY
        });
    }

    async getChatCompletion(content: string): Promise<string> {
        const complettion = await this.client.chat.completions.create({
            model: 'openai/gpt-oss-20b:free',
            messages: [
                {
                    role: 'user',
                    content
                }
            ]
        });

        return complettion.choices[0]?.message?.content || '';
    }
}
