import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { SellersService } from 'src/sellers/sellers.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateRouteDto, UpdateRouteDto } from './dto';
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
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const { date, userId, sellers, notes } = createRouteDto;

    const user = await this.usersService.findOne(userId);

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
        notes,
        ciclo: ciclo.length + 1,
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

  async findAll() {
    try {
      const routes = await this.routeRepository.find({
        where: {
          isActive: true,
        },
        //relations: ['user', 'sellers'],
        relations: {
          user: true,
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
        user,
        sellers: sellersEntity,
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
