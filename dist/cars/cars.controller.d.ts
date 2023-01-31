/// <reference types="multer" />
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';
export declare class CarsController {
    private readonly carsService;
    constructor(carsService: CarsService);
    create(createCarDto: CreateCarDto, image: Express.Multer.File): Promise<import("./entities/car.entity").Car>;
    findAll(): Promise<import("./entities/car.entity").Car[]>;
    findOne(id: string): Promise<import("./entities/car.entity").Car>;
    update(id: string, updateCarDto: UpdateCarDto, image: Express.Multer.File): Promise<import("./entities/car.entity").Car>;
    remove(id: string): Promise<import("./entities/car.entity").Car>;
}
