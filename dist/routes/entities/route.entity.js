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
exports.Route = void 0;
const car_entity_1 = require("../../cars/entities/car.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const route_seller_entity_1 = require("./route-seller.entity");
let Route = class Route {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Route.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Route.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true, default: '' }),
    __metadata("design:type", String)
], Route.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric'),
    __metadata("design:type", Number)
], Route.prototype, "ciclo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Route.prototype, "pago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], Route.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Route.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], Route.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Route.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_entity_1.Car),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", car_entity_1.Car)
], Route.prototype, "car", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => route_seller_entity_1.RouteSeller, (routeSeller) => routeSeller.route, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Route.prototype, "sellers", void 0);
Route = __decorate([
    (0, typeorm_1.Entity)('routes')
], Route);
exports.Route = Route;
//# sourceMappingURL=route.entity.js.map