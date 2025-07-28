import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheManagerService {
    private readonly base = 'default';

    constructor(
        @InjectRedis() private readonly cache: Redis,
    ) { }

    private getKey(key: string): string {
        return `${this.base}:${key}`;
    }
    
    async del(key: string): Promise<number> {
        return this.cache.del(this.getKey(key));
    }

    async set(key: string, value: string): Promise<string> {
        return this.cache.set(this.getKey(key), value);
    }

    async setEx(key: string, value: string, seconds: number): Promise<string> {
        return this.cache.setex(this.getKey(key), seconds, value);
    }

    async get(key: string): Promise<string | null> {
        return this.cache.get(this.getKey(key));
    }
}
