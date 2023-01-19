import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { IsNull, Like, Raw, Repository } from 'typeorm';
import { CreateSellerDto, QuerySellerDto, UpdateSellerDto } from './dto';
import { Seller, ReferencePhone, Reference } from './entities';

@Injectable()
export class SellersService {
  private readonly logger = new Logger(SellersService.name);

  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    @InjectRepository(ReferencePhone)
    private readonly referencePhoneRepository: Repository<ReferencePhone>,
    @InjectRepository(Reference)
    private readonly referenceRepository: Repository<Reference>,
    private readonly commonService: CommonService,
  ) {}

  async create(
    createSellerDto: CreateSellerDto,
    images: Array<Express.Multer.File>,
  ) {
    try {
      const telefonos = JSON.parse(createSellerDto.telefonos || '[]');
      const referencias = JSON.parse(createSellerDto.referencias || '[]');

      let parent = null;

      if (createSellerDto.idGroup) {
        parent = await this.findOne(createSellerDto.idGroup);
      }

      const sellerCreate = await this.sellerRepository.create({
        ...createSellerDto,
        parent,
        image: images.find((image) => !image.fieldname.startsWith('ref'))
          .filename,
      });
      const seller = await this.sellerRepository.save(sellerCreate);

      if (referencias.length) {
        const nameImages = images
          .filter((image) => image.fieldname.startsWith('ref'))
          .map((image) => image.filename);
        for (let i = 0, t = referencias.length; i < t; i++) {
          const { description, linkUbicacion, image } = referencias[i];
          const referenceNew = await this.referenceRepository.create({
            description,
            link: linkUbicacion,
            image: image ? nameImages.shift() : '',
            seller,
          });
          await this.referenceRepository.save(referenceNew);
        }
      }

      if (telefonos.length) {
        for (let i = 0, t = telefonos.length; i < t; i++) {
          const { name, phone } = telefonos[i];
          const refPhoneNew = await this.referencePhoneRepository.create({
            name,
            phone,
            seller,
          });
          await this.referencePhoneRepository.save(refPhoneNew);
        }
      }

      return this.findOne(seller.id);
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'create',
        error,
        logger: this.logger,
      });
    }
  }

  async findAll(query: QuerySellerDto) {
    try {
      const sellers = await this.sellerRepository.find({
        where: {
          isActive: true,
          ...(query?.id && { id: Number(query.id) }),
          ...(query?.uuid && { uuid: query.uuid }),
          ...(query?.nombre && {
            nombre: Raw(
              (alias) =>
                `LOWER(${alias}) Like '%${query.nombre.toLowerCase()}%'`,
            ),
          }),
          ...(query?.personaQueAtiende && {
            personaQueAtiende: Raw(
              (alias) =>
                `LOWER(${alias}) Like '%${query.personaQueAtiende.toLowerCase()}%'`,
            ),
          }),
          ...(query?.estado && { estado: query.estado }),
          ...(query?.municipio && { municipio: query.municipio }),
          ...(query?.ciudad && { ciudad: query.ciudad }),
        },
        relations: ['references', 'referencePhones', 'sellers'],
        order: {
          id: 'DESC',
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

  async findAllNoParent() {
    try {
      const sellers = await this.sellerRepository.find({
        select: {
          id: true,
          uuid: true,
          nombre: true,
        },
        where: {
          isActive: true,
          parent: IsNull(),
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

  async findOne(id: number) {
    try {
      const sellers = await this.sellerRepository.findOne({
        where: {
          id,
          isActive: true,
        },
        relations: ['references', 'referencePhones', 'sellers'],
      });
      return sellers;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'findOne',
        error,
        logger: this.logger,
      });
    }
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
