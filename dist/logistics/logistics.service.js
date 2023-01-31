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
var LogisticsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_service_1 = require("../common/common.service");
const typeorm_2 = require("typeorm");
const logistic_entity_1 = require("./entities/logistic.entity");
let LogisticsService = LogisticsService_1 = class LogisticsService {
    constructor(logisticRepository, commonService) {
        this.logisticRepository = logisticRepository;
        this.commonService = commonService;
        this.logger = new common_1.Logger(LogisticsService_1.name);
    }
    async create(createLogisticDto) {
        try {
            const logisticaCreate = await this.logisticRepository.create(createLogisticDto);
            const logistica = await this.logisticRepository.save(logisticaCreate);
            return logistica;
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
            const cars = await this.logisticRepository.find({
                where: {
                    isActive: true,
                },
                order: {
                    id: 'DESC',
                },
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
            const car = await this.logisticRepository.findOne({
                where: { id, isActive: true },
            });
            if (!car) {
                throw new common_1.NotFoundException(`Logistica con ID: ${id} no existe`);
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
    async update(id, updateLogisticDto) {
        try {
            const logistica = await this.logisticRepository.preload(Object.assign({ id }, updateLogisticDto));
            const logisticaUpgrade = await this.logisticRepository.save(logistica);
            return logisticaUpgrade;
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
            await this.logisticRepository.delete(id);
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
LogisticsService = LogisticsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(logistic_entity_1.Logistic)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_service_1.CommonService])
], LogisticsService);
exports.LogisticsService = LogisticsService;
//# sourceMappingURL=logistics.service.js.map