import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
    imports: [
        RedisModule.forRoot({
            type: 'single',
            options: {
                username: 'default',
                password: '681rLYJbCN4M0WwjgPl3tBcuL5ZWSRWV',
                host: 'redis-12528.c8.us-east-1-2.ec2.redns.redis-cloud.com',
                port: 12528,
            }
        })
    ],
    exports: [RedisModule],
})
export class CustomRedisModule {}
