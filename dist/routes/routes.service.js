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
var RoutesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cars_service_1 = require("../cars/cars.service");
const common_service_1 = require("../common/common.service");
const sellers_service_1 = require("../sellers/sellers.service");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const route_entity_1 = require("./entities/route.entity");
let RoutesService = RoutesService_1 = class RoutesService {
    constructor(routeRepository, commonService, usersService, sellersService, carsService) {
        this.routeRepository = routeRepository;
        this.commonService = commonService;
        this.usersService = usersService;
        this.sellersService = sellersService;
        this.carsService = carsService;
        this.logger = new common_1.Logger(RoutesService_1.name);
    }
    async create(createRouteDto) {
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
            throw new common_1.BadGatewayException('Sellers no identificados');
        }
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
                sellers: sellersEntity,
                car,
                notes,
                ciclo: ciclo.length + 1,
                pago: !ciclo.length ? pago : 0,
            });
            const route = await this.routeRepository.save(routeCreate);
            return route;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'create',
                error,
                logger: this.logger,
            });
        }
    }
    async findAll(query) {
        try {
            const routes = await this.routeRepository.find({
                where: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ isActive: true }, (query.id && { id: query.id })), (query.date && { date: query.date })), (query.driverId && { user: { id: query.driverId } })), (query.carId && { car: { id: query.carId } })), (query.logisticaId && {
                    car: { logistica: { id: query.logisticaId } },
                })),
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
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findAll',
                error,
                logger: this.logger,
            });
        }
    }
    async getDataReport(query) {
        var _a;
        try {
            const { startDate, endDate, logisticaId } = query;
            const routes = await this.routeRepository.find({
                where: {
                    date: (0, typeorm_2.Between)(startDate, endDate),
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
                ((_a = grouped[key]) !== null && _a !== void 0 ? _a : (grouped[key] = [])).push(o);
            }
            const result = Object.values(grouped);
            let mergeResult = [];
            for (let i = 0, t = result.length; i < t; i++) {
                const array = result[i];
                mergeResult = mergeResult.concat(array);
            }
            return mergeResult;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'getDataReport',
                error,
                logger: this.logger,
            });
        }
    }
    async findOne(id) {
        const route = await this.routeRepository.findOneBy({ id });
        if (!route) {
            throw new common_1.NotFoundException(`Ruta con id ${id}, no encontrada`);
        }
        return route;
    }
    async update(id, updateRouteDto) {
        const { ciclo } = await this.findOne(id);
        const user = await this.usersService.findOne(updateRouteDto.userId);
        const car = await this.carsService.findOne(updateRouteDto.carId);
        const sellersEntity = [];
        for (let i = 0, t = updateRouteDto.sellers.length; i < t; i++) {
            const sellerId = updateRouteDto.sellers[i];
            const seller = await this.sellersService.findOne(sellerId);
            sellersEntity.push(seller);
        }
        if (!sellersEntity.length) {
            throw new common_1.BadGatewayException('Sellers no identificados');
        }
        try {
            const route = await this.routeRepository.preload({
                id,
                date: updateRouteDto.date,
                notes: updateRouteDto.notes,
                pago: Number(ciclo) === 1 ? updateRouteDto.pago : 0,
                user,
                sellers: sellersEntity,
                car,
            });
            const routeUpgrade = await this.routeRepository.save(route);
            return routeUpgrade;
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
        await this.findOne(id);
        try {
            await this.routeRepository.delete(id);
            return 'ok';
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
RoutesService = RoutesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(route_entity_1.Route)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_service_1.CommonService,
        users_service_1.UsersService,
        sellers_service_1.SellersService,
        cars_service_1.CarsService])
], RoutesService);
exports.RoutesService = RoutesService;
//# sourceMappingURL=routes.service.js.map