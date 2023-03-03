import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { SellersModule } from 'src/sellers/sellers.module';
import { CarsModule } from 'src/cars/cars.module';
import { RouteSeller } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route, RouteSeller]),
    CommonModule,
    UsersModule,
    SellersModule,
    CarsModule,
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [TypeOrmModule, RoutesService],
})
export class RoutesModule {}
