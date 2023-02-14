import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { LogisticsModule } from 'src/logistics/logistics.module';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  imports: [LogisticsModule, CarsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
