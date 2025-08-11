import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RefuelsService } from './services/refuels.service';
import { OilChangesService } from './services/oil-changes.service';
import { RefuelsController } from './controllers/refuels.controller';
import { OilChangesController } from './controllers/oil-changes.controller';
import { RepairsService } from './services/repairs.service';
import { RepairsController } from './controllers/repairs.controller';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [
        OilChangesController,
        RefuelsController,
        RepairsController,
    ],
    providers: [
        RefuelsService,
        OilChangesService,
        RepairsService,
    ]
})
export class CarMaintenanceModule { }
