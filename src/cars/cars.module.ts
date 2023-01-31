import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { LogisticsModule } from 'src/logistics/logistics.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), CommonModule, LogisticsModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [TypeOrmModule, CarsService],
})
export class CarsModule {}
