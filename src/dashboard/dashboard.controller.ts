import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/carsByLogistics')
  carsByLogistics() {
    return this.dashboardService.carsByLogistics();
  }

  @Get('/totalByLogistics')
  totalByLogistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService.totalByLogistics({
      startDate,
      endDate,
    });
  }

  @Get('/rutasByLogistics')
  rutasByLogistics(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.dashboardService.rutasByLogistics({
      startDate,
      endDate,
    });
  }

  @Get('/rutasByLogisticsTimeLine')
  rutasByLogisticsTimeLine() {
    return this.dashboardService.rutasByLogisticsTimeLine();
  }

  @Get('/rutasByDrivers')
  rutasByDrivers(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.dashboardService.rutasByDrivers({
      startDate,
      endDate,
    });
  }

  @Get('/stateCountDashboard')
  stateCountDashboard(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.dashboardService.stateCountDashboard({
      startDate,
      endDate,
    });
  }
}
