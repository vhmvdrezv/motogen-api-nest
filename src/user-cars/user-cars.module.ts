import { Module } from '@nestjs/common';
import { UserCarsController } from './user-cars.controller';
import { UserCarsService } from './user-cars.service';
import { DatabaseModule } from 'src/database/database.module';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  imports: [
    DatabaseModule,
    CarsModule,
  ],
  controllers: [UserCarsController],
  providers: [UserCarsService]
})
export class UserCarsModule {}
