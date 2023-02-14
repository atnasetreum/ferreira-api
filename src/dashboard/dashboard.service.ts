import { Injectable, Logger } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { LogisticsService } from 'src/logistics/logistics.service';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    private readonly logisticsService: LogisticsService,
    private readonly carsService: CarsService,
  ) {}

  async carsByLogistics() {
    const logistics = await this.logisticsService.findAll();
    const cars = await this.carsService.findAll();

    const array = [];

    for (let i = 0, t = logistics.length; i < t; i++) {
      const { id, name } = logistics[i];
      const count = cars.filter((car) => car.logistica.id === id).length;
      if (count) {
        array.push([name, count]);
      }
    }

    return array;
  }
}
