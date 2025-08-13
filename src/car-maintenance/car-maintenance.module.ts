import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RefuelsService } from './services/refuels.service';
import { OilChangesService } from './services/oil-changes.service';
import { RefuelsController } from './controllers/refuels.controller';
import { OilChangesController } from './controllers/oil-changes.controller';
import { RepairsService } from './services/repairs.service';
import { RepairsController } from './controllers/repairs.controller';
import { PurchasesService } from './services/purchases.service';
import { PurchasesController } from './controllers/purchases.controller';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [
        OilChangesController,
        RefuelsController,
        RepairsController,
        PurchasesController,
    ],
    providers: [
        RefuelsService,
        OilChangesService,
        RepairsService,
        PurchasesService,
    ]
})
export class CarMaintenanceModule { }
