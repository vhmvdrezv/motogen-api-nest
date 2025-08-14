import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { AiChatService } from './ai-chat.service';
import { User } from 'src/common/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('Ai-chatbot')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtGuard)
@Controller('users/me/chat-session')
export class AiChatController {
    constructor(
        private readonly aiChatService: AiChatService
    ) { }

    @Post()
    async createFirstChat(
        @Body() createFirstChatDto: CreateChatDto,
        @User('userId') userId: string,
    ) {
        return this.aiChatService.createFirstChat(createFirstChatDto, userId);
    }

    @Get()
    async getAllChatSessions(
        @User('userId') userId: string,
    ) {
        return this.aiChatService.getAllChatSession(userId);
    }

    @Get(':chatSessionId')
    async getAllChats(
        @Param('chatSessionId') chatSessionId: string,
        @User('userId') userId: string
    ) {
        return this.aiChatService.getAllChats(chatSessionId, userId);
    }

    @Post(':chatSessionId')
    async createChat(
        @Body() createChatDto: CreateChatDto,
        @Param('chatSessionId') chatSessionId: string,
        @User('userId') userId: string,
    ) {
        return this.aiChatService.createChat(createChatDto, chatSessionId, userId);
    }
}
