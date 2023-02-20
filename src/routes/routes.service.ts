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
import { Route, RouteSeller } from './entities';

@Injectable()
export class RoutesService {
  private readonly logger = new Logger(RoutesService.name);

  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
    @InjectRepository(RouteSeller)
    private readonly routeSellerRepository: Repository<RouteSeller>,
    private readonly commonService: CommonService,
    private readonly usersService: UsersService,
    private readonly sellersService: SellersService,
    private readonly carsService: CarsService,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const { date, userId, sellers, notes, carId, pago } = createRouteDto;

    if (!sellers.length) {
      throw new BadGatewayException('Sellers no identificados');
    }

    const user = await this.usersService.findOne(userId);
    const car = await this.carsService.findOne(carId);

    const ciclo = await this.routeRepository.find({
      where: {
        date,
        user: {
          id: user.id,
        },
      },
    });

    try {
      const routeCreate = await this.routeRepository.create({
        date,
        user,
        sellers: [],
        car,
        notes,
        ciclo: ciclo.length + 1,
        pago: !ciclo.length ? pago : 0,
      });
      const route = await this.routeRepository.save(routeCreate);

      const sellersEntity = [];

      for (let i = 0, t = sellers.length; i < t; i++) {
        const sellerId = sellers[i];
        const seller = await this.sellersService.findOne(sellerId);

        const routeSellerCreate = await this.routeSellerRepository.create({
          seller,
          order: i + 1,
          route,
        });
        const routeSeller = await this.routeSellerRepository.save(
          routeSellerCreate,
        );

        sellersEntity.push(routeSeller);
      }

      await this.routeRepository.save({ ...route, sellers: sellersEntity });

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
            seller: {
              references: true,
              referencePhones: true,
            },
          },
        },
        order: {
          id: 'DESC',
          sellers: {
            order: 'ASC',
          },
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
          ciclo: 1,
          car: {
            logistica: {
              id: logisticaId,
            },
          },
        },
        relations: ['car', 'user'],
        order: {
          date: 'ASC',
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

      return mergeResult;
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
    if (!updateRouteDto.sellers.length) {
      throw new BadGatewayException('Sellers no identificados');
    }

    const routeCurrent = await this.findOne(id);
    const user = await this.usersService.findOne(updateRouteDto.userId);
    const car = await this.carsService.findOne(updateRouteDto.carId);

    try {
      const route = await this.routeRepository.preload({
        id,
        date: updateRouteDto.date,
        notes: updateRouteDto.notes,
        pago: Number(routeCurrent.ciclo) === 1 ? updateRouteDto.pago : 0,
        user,
        car,
      });
      const routeUpdated = await this.routeRepository.save(route);

      await this.routeSellerRepository.remove(routeCurrent.sellers);

      const sellersEntity = [];

      for (let i = 0, t = updateRouteDto.sellers.length; i < t; i++) {
        const sellerId = updateRouteDto.sellers[i];
        const seller = await this.sellersService.findOne(sellerId);

        const routeSellerCreate = await this.routeSellerRepository.create({
          seller,
          order: i + 1,
          route,
        });
        const routeSeller = await this.routeSellerRepository.save(
          routeSellerCreate,
        );

        sellersEntity.push(routeSeller);
      }

      //return routeUpdated;

      return await this.routeRepository.save({
        ...routeUpdated,
        sellers: sellersEntity,
      });
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
