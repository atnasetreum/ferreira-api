import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
import { LogisticsService } from 'src/logistics/logistics.service';
import { Route } from 'src/routes/entities';
import { Seller } from 'src/sellers/entities';
import { EUserType } from 'src/user-types/entities/user-type.entity';
import { User } from 'src/users/entities/user.entity';
import { Between, Repository } from 'typeorm';

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

  async totalByLogistics({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) {
    const logistics = await this.logisticsService.findAll();

    const rows = await this.routeRepository
      .createQueryBuilder('routes')
      .select(['logistics.name', 'routes.pago'])
      .innerJoinAndSelect('routes.car', 'car')
      .innerJoinAndSelect('car.logistica', 'logistics')
      .where('routes.pago > 0')
      .andWhere('routes.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
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

  async rutasByLogistics({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) {
    const logistics = await this.logisticsService.findAll();

    const rows = await this.routeRepository
      .createQueryBuilder('routes')
      .select(['logistics.name', 'routes.pago'])
      .innerJoinAndSelect('routes.car', 'car')
      .innerJoinAndSelect('car.logistica', 'logistics')
      .where('routes.pago > 0')
      .andWhere('routes.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
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

  async rutasByLogisticsTimeLine() {
    const logistics = await this.logisticsService.findAll();
    const cars = await this.carsService.findAll();

    const getCountRoutesByLogistics = async (dateLabel, arrayIds) => {
      const date = dateLabel.split('/').reverse().join('-');

      const count = await this.routeRepository
        .createQueryBuilder()
        .select(`COUNT("date") as total `)
        .where(`"carId" IN ( ${arrayIds.join(', ')} ) `)
        .andWhere(`"date"::DATE = '${date}'`)
        .andWhere(`ciclo = 1`)
        .groupBy('date')
        .execute();

      const value = count.length ? Number(count[0].total) : 0;

      return value;
    };

    const days = await this.routeRepository
      .createQueryBuilder()
      .select(`TO_CHAR(date::DATE, 'dd/mm/yyyy') AS date`)
      .groupBy('date')
      .orderBy('date', 'DESC')
      .limit(15)
      .execute();

    const categories = days
      .map((day) => day.date)
      .sort(function (a, b) {
        const aa = a.split('/').reverse().join(),
          bb = b.split('/').reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });

    const series = [];

    for (let i = 0, t = logistics.length; i < t; i++) {
      const logistic = logistics[i];
      const carsByLogistics = cars.filter(
        (car) => car.logistica.id === logistic.id,
      );

      const carsIds = carsByLogistics.map((car) => car.id);

      const data = [];
      for (let i = 0, t = categories.length; i < t; i++) {
        const date = categories[i];
        data.push(await getCountRoutesByLogistics(date, carsIds));
      }

      series.push({
        name: logistic.name,
        data,
      });
    }

    return {
      categories,
      series,
    };
  }

  async rutasByDrivers({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) {
    const rows = await this.routeRepository
      .createQueryBuilder('routes')
      .select(['users.name'])
      .innerJoinAndSelect('routes.user', 'users')
      .where('routes.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
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

  async stateCountDashboard({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) {
    const routes = await this.routeRepository.find({
      where: {
        date: Between(new Date(startDate), new Date(endDate)),
      },
      relations: ['sellers'],
    });
    const sellers = await this.sellerRepository.find({
      where: {
        createdAt: Between(new Date(startDate), new Date(endDate)),
      },
    });

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
