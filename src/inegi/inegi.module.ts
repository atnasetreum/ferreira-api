import { Module } from '@nestjs/common';
import { InegiService } from './inegi.service';
import { InegiController } from './inegi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inegi } from './entities/inegi.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inegi]), CommonModule],
  controllers: [InegiController],
  providers: [InegiService],
})
export class InegiModule {}
