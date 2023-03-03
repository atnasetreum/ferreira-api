import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
import { LogisticsService } from 'src/logistics/logistics.service';
import { Route } from 'src/routes/entities';
import { RoutesService } from 'src/routes/routes.service';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    private readonly logisticsService: LogisticsService,
    private readonly carsService: CarsService,
    private readonly routesService: RoutesService,
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
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

  async totalByLogistics() {
    const logistics = await this.logisticsService.findAll();

    const rows = await this.routeRepository
      .createQueryBuilder('routes')
      .select(['logistics.name', 'routes.pago'])
      .innerJoinAndSelect('routes.car', 'car')
      .innerJoinAndSelect('car.logistica', 'logistics')
      .where('routes.pago > 0')
      .execute();

    const getTotal = (name) => {
      return rows
        .filter((row) => row.logistics_name === name)
        .reduce((a, b) => Number(a) + Number(b.routes_pago), 0);
    };

    const logisticas = logistics.map((logistic) => ({
      name: logistic.name,
      y: getTotal(logistic.name),
    }));

    return logisticas;
  }
}
