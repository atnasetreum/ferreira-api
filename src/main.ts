import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({ credentials: true, origin: ['http://localhost:3000'] });

  await app.listen(process.env.PORT);
  console.log(
    `[APP-SERVICE] Running on port: [${process.env.PORT}], environment: [${process.env.NODE_ENV}], file-env: .env.${process.env.NODE_ENV}`,
  );
}
bootstrap();
