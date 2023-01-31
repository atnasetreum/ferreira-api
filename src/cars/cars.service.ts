import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { LogisticsService } from 'src/logistics/logistics.service';
import { Repository } from 'typeorm';
import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './entities/car.entity';
import { unlinkSync, existsSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class CarsService {
  private readonly logger = new Logger(CarsService.name);

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly commonService: CommonService,
    private readonly logisticsService: LogisticsService,
  ) {}

  async create(createCarDto: CreateCarDto, image: Express.Multer.File) {
    const logistica = await this.logisticsService.findOne(
      createCarDto.logisticaId,
    );

    try {
      const cardCreate = await this.carRepository.create({
        placa: createCarDto.placa,
        image: image.filename,
        logistica,
      });
      const card = await this.carRepository.save(cardCreate);
      return card;
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
      const cars = await this.carRepository.find({
        where: {
          isActive: true,
        },
        relations: ['logistica'],
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
      const car = await this.carRepository.findOne({
        where: {
          id,
          isActive: true,
        },
        relations: ['logistica'],
      });
      if (!car) {
        throw new NotFoundException(`Camioneta con ID: ${id} no existe`);
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

  async removeImageByName(imgName: string) {
    const urlBase = resolve() + `/public/static/images/cars`;
    const image = `${urlBase}/${imgName}`;
    if (existsSync(image)) {
      unlinkSync(image);
    }
    return true;
  }

  async update(
    id: number,
    updateCarDto: UpdateCarDto,
    image: Express.Multer.File,
  ) {
    const carPreview = await this.findOne(id);

    const logistica = await this.logisticsService.findOne(
      updateCarDto.logisticaId,
    );

    if (image) {
      await this.removeImageByName(carPreview.image);
    }

    try {
      const car = await this.carRepository.preload({
        id,
        placa: updateCarDto.placa,
        logistica,
        ...(image && { image: image.filename }),
      });
      await this.carRepository.save(car);
      return this.findOne(id);
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
      await this.carRepository.delete(id);
      await this.removeImageByName(car.image);
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
