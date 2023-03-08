import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/carsByLogistics')
  carsByLogistics() {
    return this.dashboardService.carsByLogistics();
  }

  @Get('/totalByLogistics')
  totalByLogistics() {
    return this.dashboardService.totalByLogistics();
  }

  @Get('/rutasByLogistics')
  rutasByLogistics() {
    return this.dashboardService.rutasByLogistics();
  }

  @Get('/rutasByDrivers')
  rutasByDrivers() {
    return this.dashboardService.rutasByDrivers();
  }

  @Get('/stateCountDashboard')
  stateCountDashboard() {
    return this.dashboardService.stateCountDashboard();
  }
}
