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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_service_1 = require("../common/common.service");
const user_types_service_1 = require("../user-types/user-types.service");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = UsersService_1 = class UsersService {
    constructor(userRepository, commonService, userTypeService) {
        this.userRepository = userRepository;
        this.commonService = commonService;
        this.userTypeService = userTypeService;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async create(createUserDto) {
        const userType = await this.userTypeService.findOne(createUserDto.idUserType);
        try {
            const userCreate = await this.userRepository.create({
                name: createUserDto.name,
                password: createUserDto.password,
                userType,
            });
            const user = await this.userRepository.save(userCreate);
            return user;
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
            const users = await this.userRepository.find({
                where: {
                    isActive: true,
                    userType: {
                        isActive: true,
                    },
                },
                relations: ['userType'],
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
    async usersDrivers() {
        try {
            const users = await this.userRepository.find({
                select: {
                    id: true,
                    name: true,
                },
                where: {
                    isActive: true,
                    userType: {
                        name: 'DRIVER',
                    },
                },
                relations: ['userType'],
            });
            return users;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'usersDrivers',
                error,
                logger: this.logger,
            });
        }
    }
    async usersLogin() {
        try {
            const users = await this.userRepository.find({
                where: {
                    isActive: true,
                    userType: {
                        isActive: true,
                    },
                },
                relations: ['userType'],
            });
            const usersLogin = [];
            users.forEach(({ id, name, userType: { name: nameUserType } }) => {
                usersLogin.push({ id, name, nameUserType });
            });
            return usersLogin;
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
            const user = await this.userRepository.findOneBy({ id, isActive: true });
            if (!user) {
                throw new common_1.NotFoundException(`User not found with ID: ${id}`);
            }
            return user;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findOne',
                error,
                logger: this.logger,
            });
        }
    }
    async findOneBy(where) {
        try {
            const user = await this.userRepository.findOne({
                where: Object.assign(Object.assign({}, where), { isActive: true }),
                relations: ['userType'],
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findOneBy',
                error,
                logger: this.logger,
            });
        }
    }
    async update(id, updateUserDto) {
        await this.findOne(id);
        try {
            const { name, password, idUserType } = updateUserDto;
            const userPreload = await this.userRepository.preload(Object.assign(Object.assign(Object.assign({}, (name && { name })), (password && { password })), (idUserType && {
                userType: await this.userTypeService.findOne(idUserType),
            })));
            const user = await this.userRepository.update(id, userPreload);
            return user;
            return '';
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
        await this.findOne(id);
        try {
            await this.userRepository.delete(id);
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
UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_service_1.CommonService,
        user_types_service_1.UserTypesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map