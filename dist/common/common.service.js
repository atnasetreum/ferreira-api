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
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt = require("jsonwebtoken");
let CommonService = class CommonService {
    constructor(request, configService) {
        this.request = request;
        this.configService = configService;
        this.secretKey = this.configService.get('jwt.secretKey');
    }
    errorsAxios(error) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (error === null || error === void 0 ? void 0 : error.response) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                throw new common_1.BadRequestException(((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Bad Request');
            }
            if (((_d = error.response) === null || _d === void 0 ? void 0 : _d.status) === 401) {
                throw new common_1.UnauthorizedException('The provided credentials are not valid');
            }
            if (((_e = error.response) === null || _e === void 0 ? void 0 : _e.status) === 404) {
                throw new common_1.NotFoundException(((_h = (_g = (_f = error.response) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.title) ||
                    ((_k = (_j = error.response) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.message) ||
                    'Not Found');
            }
        }
    }
    errorsNest(error) {
        var _a, _b, _c, _d;
        if (error === null || error === void 0 ? void 0 : error.response) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.statusCode) === 403) {
                throw new common_1.ForbiddenException(((_b = error.response) === null || _b === void 0 ? void 0 : _b.message) || 'Forbidden');
            }
            if (((_c = error.response) === null || _c === void 0 ? void 0 : _c.statusCode) === 404) {
                throw new common_1.NotFoundException(((_d = error.response) === null || _d === void 0 ? void 0 : _d.message) || 'Not Found');
            }
        }
    }
    errorsDB(error) {
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case '23505':
                throw new common_1.BadRequestException((error === null || error === void 0 ? void 0 : error.detail) || (error === null || error === void 0 ? void 0 : error.message));
            case '23502':
                throw new common_1.BadRequestException((error === null || error === void 0 ? void 0 : error.detail) || (error === null || error === void 0 ? void 0 : error.message));
            case '22P02':
                throw new common_1.BadRequestException((error === null || error === void 0 ? void 0 : error.detail) || (error === null || error === void 0 ? void 0 : error.message));
            case '23503':
                throw new common_1.BadRequestException('Eliminar dependencias a otras tablas primero');
            default:
                break;
        }
    }
    handleExceptions({ ref, error, logger, }) {
        logger.error(`[${ref}]`, error);
        const { code: errorDB = false, response: { statusCode: errorNest, status: errorAxios } = {
            statusCode: false,
            status: false,
        }, } = error;
        if (errorNest) {
            this.errorsNest(error);
        }
        else if (errorAxios) {
            this.errorsAxios(error);
        }
        else if (errorDB) {
            this.errorsDB(error);
        }
        throw new common_1.InternalServerErrorException('Unexpected error, Please check server logs');
    }
    createJwt(payload) {
        return jwt.sign(payload, this.secretKey, { expiresIn: '3d' });
    }
    decodedJwt(token) {
        try {
            return jwt.verify(token, this.secretKey);
        }
        catch (error) {
            throw new common_1.UnauthorizedException(`Credenciales no validas: ${error.message}`);
        }
    }
};
CommonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], CommonService);
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map