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
exports.InegiController = void 0;
const common_1 = require("@nestjs/common");
const inegi_service_1 = require("./inegi.service");
let InegiController = class InegiController {
    constructor(inegiService) {
        this.inegiService = inegiService;
    }
    entidades() {
        return this.inegiService.entidades();
    }
    municipios(entidad) {
        return this.inegiService.municipios(entidad);
    }
    localidades(entidad, municipio) {
        return this.inegiService.localidades(entidad, municipio);
    }
};
__decorate([
    (0, common_1.Get)('entidades'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InegiController.prototype, "entidades", null);
__decorate([
    (0, common_1.Get)('municipios'),
    __param(0, (0, common_1.Query)('entidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InegiController.prototype, "municipios", null);
__decorate([
    (0, common_1.Get)('localidades'),
    __param(0, (0, common_1.Query)('entidad')),
    __param(1, (0, common_1.Query)('municipio')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InegiController.prototype, "localidades", null);
InegiController = __decorate([
    (0, common_1.Controller)('inegi'),
    __metadata("design:paramtypes", [inegi_service_1.InegiService])
], InegiController);
exports.InegiController = InegiController;
//# sourceMappingURL=inegi.controller.js.map