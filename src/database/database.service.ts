import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';


@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    async onModuleInit() {
        return this.$connect();
    }
    async onModuleDestroy() {
        return this.$disconnect();
    }
}
