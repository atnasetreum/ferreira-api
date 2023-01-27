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
exports.ApiKeyGuard = void 0;
const common_1 = require("@nestjs/common");
let ApiKeyGuard = class ApiKeyGuard {
    constructor(appKey) {
        this.appKey = appKey;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const xAppKey = req.headers['x-app-key'];
        if (!xAppKey) {
            throw new common_1.BadRequestException('Clave de aplicacion no encontrada.');
        }
        if (this.appKey !== xAppKey) {
            throw new common_1.ForbiddenException(`Clave de aplicacion no valida`);
        }
        return true;
    }
};
ApiKeyGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], ApiKeyGuard);
exports.ApiKeyGuard = ApiKeyGuard;
//# sourceMappingURL=api-key.guard.js.map