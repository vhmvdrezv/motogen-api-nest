import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CacheManagerModule } from 'src/cache-manager/cache-manager.module';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    CacheManagerModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService
  ]
})
export class AuthModule {}
