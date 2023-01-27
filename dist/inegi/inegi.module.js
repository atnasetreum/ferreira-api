"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InegiModule = void 0;
const common_1 = require("@nestjs/common");
const inegi_service_1 = require("./inegi.service");
const inegi_controller_1 = require("./inegi.controller");
const typeorm_1 = require("@nestjs/typeorm");
const inegi_entity_1 = require("./entities/inegi.entity");
const common_module_1 = require("../common/common.module");
let InegiModule = class InegiModule {
};
InegiModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inegi_entity_1.Inegi]), common_module_1.CommonModule],
        controllers: [inegi_controller_1.InegiController],
        providers: [inegi_service_1.InegiService],
    })
], InegiModule);
exports.InegiModule = InegiModule;
//# sourceMappingURL=inegi.module.js.map