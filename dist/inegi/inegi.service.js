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
var InegiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InegiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_service_1 = require("../common/common.service");
const typeorm_2 = require("typeorm");
const inegi_entity_1 = require("./entities/inegi.entity");
let InegiService = InegiService_1 = class InegiService {
    constructor(inegiRepository, commonService) {
        this.inegiRepository = inegiRepository;
        this.commonService = commonService;
        this.logger = new common_1.Logger(InegiService_1.name);
    }
    async entidades() {
        try {
            const entidades = await this.inegiRepository
                .createQueryBuilder()
                .select('entidad')
                .groupBy('entidad')
                .execute();
            return entidades;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'entidades',
                error,
                logger: this.logger,
            });
        }
    }
    async municipios(entidad) {
        try {
            const municipios = await this.inegiRepository
                .createQueryBuilder()
                .select('municipio')
                .where('entidad= :entidad', { entidad })
                .groupBy('municipio')
                .execute();
            return municipios;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'municipios',
                error,
                logger: this.logger,
            });
        }
    }
    async localidades(entidad, municipio) {
        try {
            const municipios = await this.inegiRepository
                .createQueryBuilder()
                .select('localidad')
                .where('entidad= :entidad', { entidad })
                .andWhere('municipio= :municipio', { municipio })
                .execute();
            return municipios;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'localidades',
                error,
                logger: this.logger,
            });
        }
    }
};
InegiService = InegiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inegi_entity_1.Inegi)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_service_1.CommonService])
], InegiService);
exports.InegiService = InegiService;
//# sourceMappingURL=inegi.service.js.map