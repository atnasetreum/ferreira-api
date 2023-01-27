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
var UserTypesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_service_1 = require("../common/common.service");
const typeorm_2 = require("typeorm");
const user_type_entity_1 = require("./entities/user-type.entity");
let UserTypesService = UserTypesService_1 = class UserTypesService {
    constructor(userTypeRepository, commonService) {
        this.userTypeRepository = userTypeRepository;
        this.commonService = commonService;
        this.logger = new common_1.Logger(UserTypesService_1.name);
    }
    async create(createUserTypeDto) {
        try {
            const userTypeCreate = await this.userTypeRepository.create(createUserTypeDto);
            const userType = await this.userTypeRepository.save(userTypeCreate);
            return userType;
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
            const userTypes = await this.userTypeRepository.find({
                where: {
                    isActive: true,
                },
            });
            return userTypes;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findAll',
                error,
                logger: this.logger,
            });
        }
    }
    async findOne(id) {
        try {
            const userType = await this.userTypeRepository.findOneBy({
                id,
                isActive: true,
            });
            if (!userType) {
                throw new common_1.NotFoundException(`UserType not found with ID: ${id}`);
            }
            return userType;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findOne',
                error,
                logger: this.logger,
            });
        }
    }
    async update(id, updateUserTypeDto) {
        await this.findOne(id);
        try {
            const { name } = updateUserTypeDto;
            const userTypePreload = await this.userTypeRepository.preload(Object.assign({}, (name && { name })));
            const userType = await this.userTypeRepository.update(id, userTypePreload);
            return userType;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'update',
                error,
                logger: this.logger,
            });
        }
    }
    async remove(id) {
        try {
            await this.userTypeRepository.delete(id);
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
UserTypesService = UserTypesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_type_entity_1.UserType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_service_1.CommonService])
], UserTypesService);
exports.UserTypesService = UserTypesService;
//# sourceMappingURL=user-types.service.js.map