"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypesModule = void 0;
const common_1 = require("@nestjs/common");
const user_types_service_1 = require("./user-types.service");
const user_types_controller_1 = require("./user-types.controller");
const user_type_entity_1 = require("./entities/user-type.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_module_1 = require("../common/common.module");
let UserTypesModule = class UserTypesModule {
};
UserTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_type_entity_1.UserType]), common_module_1.CommonModule],
        controllers: [user_types_controller_1.UserTypesController],
        providers: [user_types_service_1.UserTypesService],
        exports: [typeorm_1.TypeOrmModule, user_types_service_1.UserTypesService],
    })
], UserTypesModule);
exports.UserTypesModule = UserTypesModule;
//# sourceMappingURL=user-types.module.js.map