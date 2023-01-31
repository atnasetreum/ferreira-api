/// <reference types="multer" />
import { CommonService } from 'src/common/common.service';
import { LogisticsService } from 'src/logistics/logistics.service';
import { Repository } from 'typeorm';
import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './entities/car.entity';
export declare class CarsService {
    private readonly carRepository;
    private readonly commonService;
    private readonly logisticsService;
    private readonly logger;
    constructor(carRepository: Repository<Car>, commonService: CommonService, logisticsService: LogisticsService);
    create(createCarDto: CreateCarDto, image: Express.Multer.File): Promise<Car>;
    findAll(): Promise<Car[]>;
    findOne(id: number): Promise<Car>;
    update(id: number, updateCarDto: UpdateCarDto): string;
    remove(id: number): Promise<Car>;
}
