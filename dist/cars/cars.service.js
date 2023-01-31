"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CarsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_service_1 = require("../common/common.service");
const logistics_service_1 = require("../logistics/logistics.service");
const typeorm_2 = require("typeorm");
const car_entity_1 = require("./entities/car.entity");
const fs_1 = require("fs");
const path_1 = require("path");
let CarsService = CarsService_1 = class CarsService {
    constructor(carRepository, commonService, logisticsService) {
        this.carRepository = carRepository;
        this.commonService = commonService;
        this.logisticsService = logisticsService;
        this.logger = new common_1.Logger(CarsService_1.name);
    }
    async create(createCarDto, image) {
        const logistica = await this.logisticsService.findOne(createCarDto.logisticaId);
        try {
            const cardCreate = await this.carRepository.create({
                placa: createCarDto.placa,
                image: image.filename,
                logistica,
            });
            const card = await this.carRepository.save(cardCreate);
            return card;
        }
        catch (error) {
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
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findAll',
                error,
                logger: this.logger,
            });
        }
    }
    async findOne(id) {
        try {
            const car = await this.carRepository.findOne({
                where: {
                    id,
                    isActive: true,
                },
                relations: ['logistica'],
            });
            if (!car) {
                throw new common_1.NotFoundException(`Camioneta con ID: ${id} no existe`);
            }
            return car;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findOne',
                error,
                logger: this.logger,
            });
        }
    }
    async removeImageByName(imgName) {
        const urlBase = (0, path_1.resolve)() + `/public/static/images/cars`;
        const image = `${urlBase}/${imgName}`;
        if ((0, fs_1.existsSync)(image)) {
            (0, fs_1.unlinkSync)(image);
        }
        return true;
    }
    async update(id, updateCarDto, image) {
        const carPreview = await this.findOne(id);
        const logistica = await this.logisticsService.findOne(updateCarDto.logisticaId);
        if (image) {
            await this.removeImageByName(carPreview.image);
        }
        try {
            const car = await this.carRepository.preload(Object.assign({ id, placa: updateCarDto.placa, logistica }, (image && { image: image.filename })));
            await this.carRepository.save(car);
            return this.findOne(id);
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'update',
                error,
                logger: this.logger,
            });
        }
    }
    async remove(id) {
        const car = await this.findOne(id);
        try {
            await this.carRepository.delete(id);
            await this.removeImageByName(car.image);
            return car;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'remove',
                error,
                logger: this.logger,
            });
        }
    }
};
CarsService = CarsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_service_1.CommonService,
        logistics_service_1.LogisticsService])
], CarsService);
exports.CarsService = CarsService;
//# sourceMappingURL=cars.service.js.map