import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { CreateSellerDto, UpdateSellerDto } from './dto';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellersService {
  private readonly logger = new Logger(SellersService.name);

  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    private readonly commonService: CommonService,
  ) {}

  async create(createSellerDto: CreateSellerDto) {
    try {
      const sellerCreate = await this.sellerRepository.create(createSellerDto);
      const seller = await this.sellerRepository.save(sellerCreate);
      return seller;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'create',
        error,
        logger: this.logger,
      });
    }
  }

  async findAll() {
    try {
      const sellers = await this.sellerRepository.find({
        where: {
          isActive: true,
        },
      });
      return sellers;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'findAll',
        error,
        logger: this.logger,
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
