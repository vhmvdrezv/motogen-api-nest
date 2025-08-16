import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
    imports: [
        RedisModule.forRoot({
            type: 'single',
            options: {
                path: process.env.REDIS_URL,
            }
        })
    ],
    exports: [RedisModule],
})
export class CustomRedisModule {}
