import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { CreateLogisticDto, UpdateLogisticDto } from './dto';
import { Logistic } from './entities/logistic.entity';

@Injectable()
export class LogisticsService {
  private readonly logger = new Logger(LogisticsService.name);

  constructor(
    @InjectRepository(Logistic)
    private readonly logisticRepository: Repository<Logistic>,
    private readonly commonService: CommonService,
  ) {}

  async create(createLogisticDto: CreateLogisticDto) {
    try {
      const logisticaCreate = await this.logisticRepository.create(
        createLogisticDto,
      );
      const logistica = await this.logisticRepository.save(logisticaCreate);
      return logistica;
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
      const cars = await this.logisticRepository.find({
        where: {
          isActive: true,
        },
        order: {
          id: 'DESC',
        },
      });
      return cars;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'findAll',
        error,
        logger: this.logger,
      });
    }
  }

  async findOne(id: number) {
    try {
      const car = await this.logisticRepository.findOne({
        where: { id, isActive: true },
      });
      if (!car) {
        throw new NotFoundException(`Logistica con ID: ${id} no existe`);
      }
      return car;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'findOne',
        error,
        logger: this.logger,
      });
    }
  }

  async update(id: number, updateLogisticDto: UpdateLogisticDto) {
    try {
      const logistica = await this.logisticRepository.preload({
        id,
        ...updateLogisticDto,
      });
      const logisticaUpgrade = await this.logisticRepository.save(logistica);
      return logisticaUpgrade;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'update',
        error,
        logger: this.logger,
      });
    }
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    try {
      await this.logisticRepository.delete(id);
      return car;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'remove',
        error,
        logger: this.logger,
      });
    }
  }
}
