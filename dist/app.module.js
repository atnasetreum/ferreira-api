"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("./config");
const users_module_1 = require("./users/users.module");
const user_types_module_1 = require("./user-types/user-types.module");
const drivers_module_1 = require("./drivers/drivers.module");
const sellers_module_1 = require("./sellers/sellers.module");
const routes_module_1 = require("./routes/routes.module");
const auth_module_1 = require("./auth/auth.module");
const common_module_1 = require("./common/common.module");
const inegi_module_1 = require("./inegi/inegi.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const logistics_module_1 = require("./logistics/logistics.module");
const cars_module_1 = require("./cars/cars.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: `.env.${process.env.NODE_ENV}`,
                load: [config_2.EnvConfiguration],
                validationSchema: config_2.JoiValidationSchema,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
            }),
            users_module_1.UsersModule,
            user_types_module_1.UserTypesModule,
            drivers_module_1.DriversModule,
            sellers_module_1.SellersModule,
            routes_module_1.RoutesModule,
            auth_module_1.AuthModule,
            common_module_1.CommonModule,
            inegi_module_1.InegiModule,
            logistics_module_1.LogisticsModule,
            cars_module_1.CarsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map