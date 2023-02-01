import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
import { CommonService } from 'src/common/common.service';
import { SellersService } from 'src/sellers/sellers.service';
import { UsersService } from 'src/users/users.service';
import { Between, Repository } from 'typeorm';
import {
  CreateRouteDto,
  QueryReportRouteDto,
  QueryRouteDto,
  UpdateRouteDto,
} from './dto';
import { Route } from './entities/route.entity';

@Injectable()
export class RoutesService {
  private readonly logger = new Logger(RoutesService.name);

  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
    private readonly commonService: CommonService,
    private readonly usersService: UsersService,
    private readonly sellersService: SellersService,
    private readonly carsService: CarsService,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const { date, userId, sellers, notes, carId, pago } = createRouteDto;

    const user = await this.usersService.findOne(userId);
    const car = await this.carsService.findOne(carId);

    const sellersEntity = [];

    for (let i = 0, t = sellers.length; i < t; i++) {
      const sellerId = sellers[i];
      const seller = await this.sellersService.findOne(sellerId);
      sellersEntity.push(seller);
    }

    if (!sellersEntity.length) {
      throw new BadGatewayException('Sellers no identificados');
    }

    const ciclo = await this.routeRepository.find({
      where: {
        date,
        user: {
          id: user.id,
        },
      },
      relations: ['user'],
    });

    try {
      const routeCreate = await this.routeRepository.create({
        date,
        user,
        sellers: sellersEntity,
        car,
        notes,
        ciclo: ciclo.length + 1,
        pago: !ciclo.length ? pago : 0,
      });
      const route = await this.routeRepository.save(routeCreate);
      return route;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'create',
        error,
        logger: this.logger,
      });
    }
  }

  async findAll(query: QueryRouteDto) {
    try {
      const routes = await this.routeRepository.find({
        where: {
          isActive: true,
          ...(query.id && { id: query.id }),
          ...(query.date && { date: query.date }),
          ...(query.driverId && { user: { id: query.driverId } }),
          ...(query.carId && { car: { id: query.carId } }),
          ...(query.logisticaId && {
            car: { logistica: { id: query.logisticaId } },
          }),
        },
        relations: {
          user: true,
          car: {
            logistica: true,
          },
          sellers: {
            references: true,
            referencePhones: true,
          },
        },

        order: {
          id: 'DESC',
        },
      });
      return routes;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'findAll',
        error,
        logger: this.logger,
      });
    }
  }

  async getDataReport(query: QueryReportRouteDto) {
    try {
      const { startDate, endDate, logisticaId } = query;

      const routes = await this.routeRepository.find({
        where: {
          date: Between(startDate, endDate),
          car: {
            logistica: {
              id: logisticaId,
            },
          },
        },
        relations: ['car', 'user'],
        order: {
          id: 'DESC',
        },
      });

      const uniqueKeys = ['date'];
      const grouped = {};

      for (const o of routes) {
        const key = uniqueKeys.map((k) => o[k]).join('_');
        (grouped[key] ??= []).push(o);
      }

      const result = Object.values(grouped);

      let mergeResult = [];
      for (let i = 0, t = result.length; i < t; i++) {
        const array = result[i];
        mergeResult = mergeResult.concat(array);
      }

      return mergeResult
        .sort(function (a, b) {
          const aa = a.date.split('/').reverse().join(),
            bb = b.date.split('/').reverse().join();
          return aa < bb ? -1 : aa > bb ? 1 : 0;
        })
        .filter((row) => Number(row.pago) > 0);
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'getDataReport',
        error,
        logger: this.logger,
      });
    }
  }

  async findOne(id: number) {
    const route = await this.routeRepository.findOneBy({ id });

    if (!route) {
      throw new NotFoundException(`Ruta con id ${id}, no encontrada`);
    }

    return route;
  }

  async update(id: number, updateRouteDto: UpdateRouteDto) {
    await this.findOne(id);
    const user = await this.usersService.findOne(updateRouteDto.userId);
    const car = await this.carsService.findOne(updateRouteDto.carId);

    const sellersEntity = [];

    for (let i = 0, t = updateRouteDto.sellers.length; i < t; i++) {
      const sellerId = updateRouteDto.sellers[i];
      const seller = await this.sellersService.findOne(sellerId);
      sellersEntity.push(seller);
    }

    if (!sellersEntity.length) {
      throw new BadGatewayException('Sellers no identificados');
    }

    try {
      const route = await this.routeRepository.preload({
        id,
        date: updateRouteDto.date,
        notes: updateRouteDto.notes,
        pago: updateRouteDto.pago,
        user,
        sellers: sellersEntity,
        car,
      });
      const routeUpgrade = await this.routeRepository.save(route);
      return routeUpgrade;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'update',
        error,
        logger: this.logger,
      });
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      await this.routeRepository.delete(id);
      return 'ok';
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'remove',
        error,
        logger: this.logger,
      });
    }
  }
}
