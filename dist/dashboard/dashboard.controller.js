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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    carsByLogistics() {
        return this.dashboardService.carsByLogistics();
    }
    totalByLogistics(startDate, endDate) {
        return this.dashboardService.totalByLogistics({
            startDate,
            endDate,
        });
    }
    rutasByLogistics(startDate, endDate) {
        return this.dashboardService.rutasByLogistics({
            startDate,
            endDate,
        });
    }
    rutasByLogisticsTimeLine() {
        return this.dashboardService.rutasByLogisticsTimeLine();
    }
    rutasByDrivers(startDate, endDate) {
        return this.dashboardService.rutasByDrivers({
            startDate,
            endDate,
        });
    }
    stateCountDashboard(startDate, endDate) {
        return this.dashboardService.stateCountDashboard({
            startDate,
            endDate,
        });
    }
};
__decorate([
    (0, common_1.Get)('/carsByLogistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "carsByLogistics", null);
__decorate([
    (0, common_1.Get)('/totalByLogistics'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "totalByLogistics", null);
__decorate([
    (0, common_1.Get)('/rutasByLogistics'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "rutasByLogistics", null);
__decorate([
    (0, common_1.Get)('/rutasByLogisticsTimeLine'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "rutasByLogisticsTimeLine", null);
__decorate([
    (0, common_1.Get)('/rutasByDrivers'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "rutasByDrivers", null);
__decorate([
    (0, common_1.Get)('/stateCountDashboard'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "stateCountDashboard", null);
DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map