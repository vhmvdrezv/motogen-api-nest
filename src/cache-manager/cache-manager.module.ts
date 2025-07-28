import { Module } from '@nestjs/common';
import { CustomRedisModule } from 'src/redis/redis.module';
import { CacheManagerService } from './cache-manager.service';

@Module({
    imports: [CustomRedisModule],
    providers: [CacheManagerService],
    exports: [CacheManagerService],
})
export class CacheManagerModule {}
