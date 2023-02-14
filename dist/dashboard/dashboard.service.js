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
var DashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const cars_service_1 = require("../cars/cars.service");
const logistics_service_1 = require("../logistics/logistics.service");
let DashboardService = DashboardService_1 = class DashboardService {
    constructor(logisticsService, carsService) {
        this.logisticsService = logisticsService;
        this.carsService = carsService;
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
};
DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logistics_service_1.LogisticsService,
        cars_service_1.CarsService])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map