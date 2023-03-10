"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellersModule = void 0;
const common_1 = require("@nestjs/common");
const sellers_service_1 = require("./sellers.service");
const sellers_controller_1 = require("./sellers.controller");
const entities_1 = require("./entities");
const common_module_1 = require("../common/common.module");
const typeorm_1 = require("@nestjs/typeorm");
let SellersModule = class SellersModule {
};
SellersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Seller, entities_1.ReferencePhone, entities_1.Reference]),
            common_module_1.CommonModule,
        ],
        controllers: [sellers_controller_1.SellersController],
        providers: [sellers_service_1.SellersService],
        exports: [typeorm_1.TypeOrmModule, sellers_service_1.SellersService],
    })
], SellersModule);
exports.SellersModule = SellersModule;
//# sourceMappingURL=sellers.module.js.map