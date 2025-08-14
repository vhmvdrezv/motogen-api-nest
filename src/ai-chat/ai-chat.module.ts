import { Module } from '@nestjs/common';
import { AiChatService } from './ai-chat.service';
import { AiChatController } from './ai-chat.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [
    DatabaseModule,
    AiModule,
  ],
  providers: [AiChatService],
  controllers: [AiChatController]
})
export class AiChatModule {}
