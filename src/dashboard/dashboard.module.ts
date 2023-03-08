import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { LogisticsModule } from 'src/logistics/logistics.module';
import { CarsModule } from 'src/cars/cars.module';
import { RoutesModule } from 'src/routes/routes.module';
import { SellersModule } from 'src/sellers/sellers.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    LogisticsModule,
    CarsModule,
    RoutesModule,
    SellersModule,
    UsersModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
