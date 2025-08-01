import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { CustomRedisModule } from './redis/redis.module';
import { CacheManagerService } from './cache-manager/cache-manager.service';
import { CacheManagerModule } from './cache-manager/cache-manager.module';
import { ColorsModule } from './colors/colors.module';

@Module({
  imports: [CarsModule, DatabaseModule, AuthModule, CustomRedisModule, CacheManagerModule, ColorsModule],
  controllers: [AppController],
  providers: [AppService, CacheManagerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
