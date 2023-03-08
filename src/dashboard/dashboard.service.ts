import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
import { LogisticsService } from 'src/logistics/logistics.service';
import { Route } from 'src/routes/entities';
import { Seller } from 'src/sellers/entities';
import { EUserType } from 'src/user-types/entities/user-type.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    private readonly logisticsService: LogisticsService,
    private readonly carsService: CarsService,
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

    const logisticas = logistics.map((logistic) => [
      logistic.name,
      getTotal(logistic.name),
    ]);

    return logisticas;
  }

  async rutasByLogistics() {
    const logistics = await this.logisticsService.findAll();

    const rows = await this.routeRepository
      .createQueryBuilder('routes')
      .select(['logistics.name', 'routes.pago'])
      .innerJoinAndSelect('routes.car', 'car')
      .innerJoinAndSelect('car.logistica', 'logistics')
      .where('routes.pago > 0')
      .execute();

    const getTotal = (name) => {
      return rows.filter((row) => row.logistics_name === name).length;
    };

    const logisticas = logistics.map((logistic) => ({
      name: logistic.name,
      y: getTotal(logistic.name),
    }));

    return logisticas;
  }

  async rutasByDrivers() {
    const rows = await this.routeRepository
      .createQueryBuilder('routes')
      .select(['users.name'])
      .innerJoinAndSelect('routes.user', 'users')
      .execute();

    const getTotal = (name) => {
      return rows.filter((row) => row.users_name === name).length;
    };

    const names = new Set();

    rows.forEach((element) => {
      names.add(element.users_name);
    });

    return {
      categories: [...names],
      data: [...names].map((userName) => getTotal(userName)),
    };
  }

  async stateCountDashboard() {
    const routes = await this.routeRepository.find({ relations: ['sellers'] });
    const sellers = await this.sellerRepository.find({});

    const numbers = routes.map((route) => route.sellers.length);

    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

    const drivers = await this.userRepository.find({
      where: {
        userType: {
          name: EUserType.DRIVER,
        },
      },
    });

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return {
      totales: {
        title: 'Ingresos totales',
        total: formatter.format(
          routes.reduce((a, b) => Number(a) + Number(b.pago), 0),
        ),
      },
      promedioRuta: {
        title: 'Promedio de puntos por ruta',
        total: Math.round(average(numbers)),
      },
      sellers: {
        title: 'Sellers registrados',
        total: sellers.length,
      },
      drivers: {
        title: 'Drivers registrados',
        total: drivers.length,
      },
    };
  }
}
