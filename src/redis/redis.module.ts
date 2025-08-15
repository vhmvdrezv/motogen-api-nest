import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
    imports: [
        RedisModule.forRoot({
            type: 'single',
            options: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT!) || 6379,
            }
        })
    ],
    exports: [RedisModule],
})
export class CustomRedisModule {}
