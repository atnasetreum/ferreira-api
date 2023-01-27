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
var RoutesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_service_1 = require("../common/common.service");
const sellers_service_1 = require("../sellers/sellers.service");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const route_entity_1 = require("./entities/route.entity");
let RoutesService = RoutesService_1 = class RoutesService {
    constructor(routeRepository, commonService, usersService, sellersService) {
        this.routeRepository = routeRepository;
        this.commonService = commonService;
        this.usersService = usersService;
        this.sellersService = sellersService;
        this.logger = new common_1.Logger(RoutesService_1.name);
    }
    async create(createRouteDto) {
        const { date, userId, sellers } = createRouteDto;
        const user = await this.usersService.findOne(userId);
        const sellersEntity = [];
        for (let i = 0, t = sellers.length; i < t; i++) {
            const sellerId = sellers[i];
            const seller = await this.sellersService.findOne(sellerId);
            sellersEntity.push(seller);
        }
        if (!sellersEntity.length) {
            throw new common_1.BadGatewayException('Sellers no identificados');
        }
        try {
            const routeCreate = await this.routeRepository.create({
                date,
                user,
                sellers: sellersEntity,
            });
            const route = await this.routeRepository.save(routeCreate);
            return route;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'create',
                error,
                logger: this.logger,
            });
        }
    }
    async findAll() {
        try {
            const users = await this.routeRepository.find({
                where: {
                    isActive: true,
                },
                relations: {
                    user: true,
                    sellers: {
                        references: true,
                        referencePhones: true,
                    },
                },
                order: {
                    id: 'DESC',
                },
            });
            return users;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findAll',
                error,
                logger: this.logger,
            });
        }
    }
    findOne(id) {
        return `This action returns a #${id} route`;
    }
    update(id, updateRouteDto) {
        return `This action updates a #${id} route`;
    }
    async remove(id) {
        await this.findOne(id);
        try {
            await this.routeRepository.delete(id);
            return 'ok';
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'remove',
                error,
                logger: this.logger,
            });
        }
    }
};
RoutesService = RoutesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(route_entity_1.Route)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_service_1.CommonService,
        users_service_1.UsersService,
        sellers_service_1.SellersService])
], RoutesService);
exports.RoutesService = RoutesService;
//# sourceMappingURL=routes.service.js.map