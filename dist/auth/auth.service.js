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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const common_service_1 = require("../common/common.service");
const argon2 = require("argon2");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userService, commonService) {
        this.userService = userService;
        this.commonService = commonService;
    }
    responseUserSession(user) {
        return {
            id: user.id,
            name: user.name,
            userType: user.userType.name,
            token: this.commonService.createJwt({ id: user.id }),
        };
    }
    async login(loginAuthDto) {
        const user = await this.userService.findOneBy({ id: loginAuthDto.id });
        if (await argon2.verify(user.password, loginAuthDto.password)) {
            return this.responseUserSession(user);
        }
        throw new common_1.UnauthorizedException('Credenciales no validas');
    }
    async validateToken(request) {
        var _a;
        const authorization = ((_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization) || '';
        const token = authorization.replace('Bearer ', '');
        if (!token) {
            throw new common_1.UnauthorizedException('Credenciales no validas');
        }
        const { id } = this.commonService.decodedJwt(token);
        const user = await this.userService.findOneBy(id);
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return this.responseUserSession(user);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        common_service_1.CommonService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map