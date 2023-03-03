"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesModule = void 0;
const common_1 = require("@nestjs/common");
const routes_service_1 = require("./routes.service");
const routes_controller_1 = require("./routes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const route_entity_1 = require("./entities/route.entity");
const common_module_1 = require("../common/common.module");
const users_module_1 = require("../users/users.module");
const sellers_module_1 = require("../sellers/sellers.module");
const cars_module_1 = require("../cars/cars.module");
const entities_1 = require("./entities");
let RoutesModule = class RoutesModule {
};
RoutesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([route_entity_1.Route, entities_1.RouteSeller]),
            common_module_1.CommonModule,
            users_module_1.UsersModule,
            sellers_module_1.SellersModule,
            cars_module_1.CarsModule,
        ],
        controllers: [routes_controller_1.RoutesController],
        providers: [routes_service_1.RoutesService],
        exports: [typeorm_1.TypeOrmModule, routes_service_1.RoutesService],
    })
], RoutesModule);
exports.RoutesModule = RoutesModule;
//# sourceMappingURL=routes.module.js.map