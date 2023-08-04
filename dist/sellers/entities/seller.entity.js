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
var Seller_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = void 0;
const entities_1 = require("../../routes/entities");
const typeorm_1 = require("typeorm");
const reference_phone_entity_1 = require("./reference-phone.entity");
const reference_entity_1 = require("./reference.entity");
let Seller = Seller_1 = class Seller {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Seller.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Seller.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], Seller.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Seller.prototype, "calle", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Seller.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Seller.prototype, "colonia", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Seller.prototype, "ciudad", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Seller.prototype, "municipio", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Seller.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], Seller.prototype, "cp", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Seller.prototype, "linkUbicacion", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Seller.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Seller.prototype, "personaQueAtiende", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], Seller.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Seller.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Seller.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reference_phone_entity_1.ReferencePhone, (referencePhones) => referencePhones.seller, { nullable: true }),
    __metadata("design:type", Array)
], Seller.prototype, "referencePhones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reference_entity_1.Reference, (reference) => reference.seller, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], Seller.prototype, "references", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Seller_1, (seller) => seller.sellers),
    __metadata("design:type", Seller)
], Seller.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Seller_1, (seller) => seller.parent),
    __metadata("design:type", Array)
], Seller.prototype, "sellers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.RouteSeller, (routeSeller) => routeSeller.seller),
    __metadata("design:type", Array)
], Seller.prototype, "routeSeller", void 0);
Seller = Seller_1 = __decorate([
    (0, typeorm_1.Entity)('sellers')
], Seller);
exports.Seller = Seller;
//# sourceMappingURL=seller.entity.js.map