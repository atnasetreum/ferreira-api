import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { Seller, ReferencePhone, Reference } from './entities';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seller, ReferencePhone, Reference]),
    CommonModule,
  ],
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
