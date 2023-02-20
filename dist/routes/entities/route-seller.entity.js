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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteSeller = void 0;
const entities_1 = require("../../sellers/entities");
const typeorm_1 = require("typeorm");
const route_entity_1 = require("./route.entity");
let RouteSeller = class RouteSeller {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RouteSeller.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RouteSeller.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], RouteSeller.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RouteSeller.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RouteSeller.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => route_entity_1.Route, (route) => route.sellers, { onDelete: 'CASCADE' }),
    __metadata("design:type", route_entity_1.Route)
], RouteSeller.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Seller, (seller) => seller.routeSeller),
    __metadata("design:type", entities_1.Seller)
], RouteSeller.prototype, "seller", void 0);
RouteSeller = __decorate([
    (0, typeorm_1.Entity)('routes_sellers')
], RouteSeller);
exports.RouteSeller = RouteSeller;
//# sourceMappingURL=route-seller.entity.js.map