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
const entities_2 = require("../sellers/entities");
const user_type_entity_1 = require("../user-types/entities/user-type.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
let DashboardService = DashboardService_1 = class DashboardService {
    constructor(logisticsService, carsService, routeRepository, sellerRepository, userRepository) {
        this.logisticsService = logisticsService;
        this.carsService = carsService;
        this.routeRepository = routeRepository;
        this.sellerRepository = sellerRepository;
        this.userRepository = userRepository;
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
    async totalByLogistics({ startDate, endDate, }) {
        const logistics = await this.logisticsService.findAll();
        const rows = await this.routeRepository
            .createQueryBuilder('routes')
            .select(['logistics.name', 'routes.pago'])
            .innerJoinAndSelect('routes.car', 'car')
            .innerJoinAndSelect('car.logistica', 'logistics')
            .where('routes.pago > 0')
            .andWhere('routes.date BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .execute();
        const getTotal = (name) => {
            return rows
                .filter((row) => row.logistics_name === name)
                .reduce((a, b) => Number(a) + Number(b.routes_pago), 0);
        };
        const logisticas = logistics.map((logistic) => [
            logistic.name,
            getTotal(logistic.name),
        ]);
        return logisticas;
    }
    async rutasByLogistics({ startDate, endDate, }) {
        const logistics = await this.logisticsService.findAll();
        const rows = await this.routeRepository
            .createQueryBuilder('routes')
            .select(['logistics.name', 'routes.pago'])
            .innerJoinAndSelect('routes.car', 'car')
            .innerJoinAndSelect('car.logistica', 'logistics')
            .where('routes.pago > 0')
            .andWhere('routes.date BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
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
    async rutasByLogisticsTimeLine() {
        const logistics = await this.logisticsService.findAll();
        const cars = await this.carsService.findAll();
        const getCountRoutesByLogistics = async (dateLabel, arrayIds) => {
            const date = dateLabel.split('/').reverse().join('-');
            const count = await this.routeRepository
                .createQueryBuilder()
                .select(`COUNT("date") as total `)
                .where(`"carId" IN ( ${arrayIds.join(', ')} ) `)
                .andWhere(`"date"::DATE = '${date}'`)
                .andWhere(`ciclo = 1`)
                .groupBy('date')
                .execute();
            const value = count.length ? Number(count[0].total) : 0;
            return value;
        };
        const days = await this.routeRepository
            .createQueryBuilder()
            .select(`TO_CHAR(date::DATE, 'dd/mm/yyyy') AS date`)
            .groupBy('date')
            .orderBy('date', 'DESC')
            .limit(15)
            .execute();
        const categories = days
            .map((day) => day.date)
            .sort(function (a, b) {
            const aa = a.split('/').reverse().join(), bb = b.split('/').reverse().join();
            return aa < bb ? -1 : aa > bb ? 1 : 0;
        });
        const series = [];
        for (let i = 0, t = logistics.length; i < t; i++) {
            const logistic = logistics[i];
            const carsByLogistics = cars.filter((car) => car.logistica.id === logistic.id);
            const carsIds = carsByLogistics.map((car) => car.id);
            const data = [];
            for (let i = 0, t = categories.length; i < t; i++) {
                const date = categories[i];
                data.push(await getCountRoutesByLogistics(date, carsIds));
            }
            series.push({
                name: logistic.name,
                data,
            });
        }
        return {
            categories,
            series,
        };
    }
    async rutasByDrivers({ startDate, endDate, }) {
        const rows = await this.routeRepository
            .createQueryBuilder('routes')
            .select(['users.name'])
            .innerJoinAndSelect('routes.user', 'users')
            .where('routes.date BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
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
    async stateCountDashboard({ startDate, endDate, }) {
        const routes = await this.routeRepository.find({
            where: {
                date: (0, typeorm_2.Between)(startDate, endDate),
            },
            relations: ['sellers'],
        });
        const sellers = await this.sellerRepository.find({
            where: {
                createdAt: (0, typeorm_2.Between)(startDate, endDate),
            },
        });
        const numbers = routes.map((route) => route.sellers.length);
        const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
        const drivers = await this.userRepository.find({
            where: {
                userType: {
                    name: user_type_entity_1.EUserType.DRIVER,
                },
            },
        });
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return {
            totales: {
                title: 'Ingresos totales',
                total: formatter.format(routes.reduce((a, b) => Number(a) + Number(b.pago), 0)),
            },
            promedioRuta: {
                title: 'Promedio de puntos por ruta',
                total: Math.round(average(numbers)),
            },
            sellers: {
                title: 'Sellers registrados',
                total: sellers.length,
            },
            drivers: {
                title: 'Drivers registrados',
                total: drivers.length,
            },
        };
    }
};
DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Route)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_2.Seller)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [logistics_service_1.LogisticsService,
        cars_service_1.CarsService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map