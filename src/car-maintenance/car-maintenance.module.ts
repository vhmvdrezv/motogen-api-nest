import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RefuelController } from './controllers/refuel.controller';
import { RefuelService } from './services/refuel.service';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [
        RefuelController,
    ],
    providers: [
        RefuelService,
    ]
})
export class CarMaintenanceModule {}
