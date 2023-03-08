import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfiguration, JoiValidationSchema } from './config';
import { UsersModule } from './users/users.module';
import { UserTypesModule } from './user-types/user-types.module';
import { SellersModule } from './sellers/sellers.module';
import { RoutesModule } from './routes/routes.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { InegiModule } from './inegi/inegi.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LogisticsModule } from './logistics/logistics.module';
import { CarsModule } from './cars/cars.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    UserTypesModule,
    SellersModule,
    RoutesModule,
    AuthModule,
    CommonModule,
    InegiModule,
    LogisticsModule,
    CarsModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
