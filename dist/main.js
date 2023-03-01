"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const guards_1 = require("./auth/guards");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalGuards(new guards_1.ApiKeyGuard(process.env.APP_KEY));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://transportesferreira.com',
            'https://ferreira-ui.vercel.app',
        ],
    });
    await app.listen(process.env.PORT);
    console.log(`[APP-SERVICE] Running on port: [${process.env.PORT}], environment: [${process.env.NODE_ENV}], file-env: .env.${process.env.NODE_ENV}`);
}
bootstrap();
//# sourceMappingURL=main.js.map