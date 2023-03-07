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
var DashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cars_service_1 = require("../cars/cars.service");
const logistics_service_1 = require("../logistics/logistics.service");
const entities_1 = require("../routes/entities");
const routes_service_1 = require("../routes/routes.service");
const typeorm_2 = require("typeorm");
let DashboardService = DashboardService_1 = class DashboardService {
    constructor(logisticsService, carsService, routesService, routeRepository) {
        this.logisticsService = logisticsService;
        this.carsService = carsService;
        this.routesService = routesService;
        this.routeRepository = routeRepository;
        this.logger = new common_1.Logger(DashboardService_1.name);
    }
    async carsByLogistics() {
        const logistics = await this.logisticsService.findAll();
        const cars = await this.carsService.findAll();
        const array = [];
        for (let i = 0, t = logistics.length; i < t; i++) {
            const { id, name } = logistics[i];
            const count = cars.filter((car) => car.logistica.id === id).length;
            if (count) {
                array.push([name, count]);
            }
        }
        return array;
    }
    async totalByLogistics() {
        const logistics = await this.logisticsService.findAll();
        const rows = await this.routeRepository
            .createQueryBuilder('routes')
            .select(['logistics.name', 'routes.pago'])
            .innerJoinAndSelect('routes.car', 'car')
            .innerJoinAndSelect('car.logistica', 'logistics')
            .where('routes.pago > 0')
            .execute();
        const getTotal = (name) => {
            return rows
                .filter((row) => row.logistics_name === name)
                .reduce((a, b) => Number(a) + Number(b.routes_pago), 0);
        };
        const logisticas = logistics.map((logistic) => ({
            name: logistic.name,
            y: getTotal(logistic.name),
        }));
        return logisticas;
    }
    async rutasByLogistics() {
        const logistics = await this.logisticsService.findAll();
        const rows = await this.routeRepository
            .createQueryBuilder('routes')
            .select(['logistics.name', 'routes.pago'])
            .innerJoinAndSelect('routes.car', 'car')
            .innerJoinAndSelect('car.logistica', 'logistics')
            .where('routes.pago > 0')
            .execute();
        const getTotal = (name) => {
            return rows.filter((row) => row.logistics_name === name).length;
        };
        const logisticas = logistics.map((logistic) => ({
            name: logistic.name,
            y: getTotal(logistic.name),
        }));
        return logisticas;
    }
    async rutasByDrivers() {
        const rows = await this.routeRepository
            .createQueryBuilder('routes')
            .select(['users.name'])
            .innerJoinAndSelect('routes.user', 'users')
            .execute();
        const getTotal = (name) => {
            return rows.filter((row) => row.users_name === name).length;
        };
        const names = new Set();
        rows.forEach((element) => {
            names.add(element.users_name);
        });
        return {
            categories: [...names],
            data: [...names].map((userName) => getTotal(userName)),
        };
    }
};
DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.Route)),
    __metadata("design:paramtypes", [logistics_service_1.LogisticsService,
        cars_service_1.CarsService,
        routes_service_1.RoutesService,
        typeorm_2.Repository])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map