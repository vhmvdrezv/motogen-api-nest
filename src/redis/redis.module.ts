import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
    imports: [
        RedisModule.forRoot({
            type: 'single',
            options: {
                // ioredis accepts "url", but the Nest wrapper typing doesn’t list it
                ...( { url: process.env.REDIS_URL } as any ),
                tls: {}, // required because Upstash only supports TLS
            },
        })
    ],
    exports: [RedisModule],
})
export class CustomRedisModule {}
