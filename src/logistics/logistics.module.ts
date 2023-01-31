import { Module } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { LogisticsController } from './logistics.controller';
import { CommonModule } from 'src/common/common.module';
import { Logistic } from './entities/logistic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Logistic]), CommonModule],
  controllers: [LogisticsController],
  providers: [LogisticsService],
  exports: [TypeOrmModule, LogisticsService],
})
export class LogisticsModule {}
