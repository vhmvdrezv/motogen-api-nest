import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { CustomRedisModule } from './redis/redis.module';
import { CacheManagerService } from './cache-manager/cache-manager.service';
import { CacheManagerModule } from './cache-manager/cache-manager.module';
import { ColorsModule } from './colors/colors.module';
import { UsersModule } from './users/users.module';
import { UserCarsModule } from './user-cars/user-cars.module';
import { CarMaintenanceModule } from './car-maintenance/car-maintenance.module';
import { AiModule } from './ai/ai.module';
import { AiChatModule } from './ai-chat/ai-chat.module';

@Module({
  imports: [CarsModule, DatabaseModule, AuthModule, CustomRedisModule, CacheManagerModule, ColorsModule, UsersModule, UserCarsModule, CarMaintenanceModule, AiModule, AiChatModule],
  controllers: [],
  providers: [CacheManagerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
