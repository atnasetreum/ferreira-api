import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { IsNull, Raw, Repository } from 'typeorm';
import { CreateSellerDto, QuerySellerDto, UpdateSellerDto } from './dto';
import { Seller, ReferencePhone, Reference } from './entities';
import { unlinkSync, existsSync } from 'fs';
import { resolve } from 'path';

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
          const { description, linkUbicacion, image, order } = referencias[i];
          const referenceNew = await this.referenceRepository.create({
            description,
            link: linkUbicacion,
            image: image ? nameImages.shift() : '',
            order,
            seller,
          });
          await this.referenceRepository.save(referenceNew);
        }
      }

      await this.savePhones(telefonos, seller);

      return this.findOne(seller.id);
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'create',
        error,
        logger: this.logger,
      });
    }
  }

  async savePhones(telefonos, seller) {
    if (telefonos.length) {
      for (let i = 0, t = telefonos.length; i < t; i++) {
        const { name, phone, order } = telefonos[i];
        const refPhoneNew = await this.referencePhoneRepository.create({
          name,
          phone,
          order,
          seller,
        });
        await this.referencePhoneRepository.save(refPhoneNew);
      }
    }
  }

  async findAll(query: QuerySellerDto) {
    try {
      const sellers = await this.sellerRepository.find({
        where: {
          isActive: true,
          ...(query?.id && { id: Number(query.id) }),
          ...(query?.uuid && {
            uuid: Raw(
              (alias) => `LOWER(${alias}) Like '%${query.uuid.toLowerCase()}%'`,
            ),
          }),
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
          ...(query?.referencia && {
            references: {
              description: Raw(
                (alias) =>
                  `LOWER(${alias}) Like '%${query.referencia.toLowerCase()}%'`,
              ),
            },
          }),
          ...(query?.telefono && {
            referencePhones: {
              phone: Raw(
                (alias) =>
                  `LOWER(${alias}) Like '%${query.telefono.toLowerCase()}%'`,
              ),
            },
          }),
          ...(query?.telefonoNombre && {
            referencePhones: {
              name: Raw(
                (alias) =>
                  `LOWER(${alias}) Like '%${query.telefonoNombre.toLowerCase()}%'`,
              ),
            },
          }),
        },
        relations: ['references', 'referencePhones', 'sellers', 'parent'],
        order: {
          id: 'DESC',
          references: {
            order: 'ASC',
          },
          referencePhones: {
            order: 'ASC',
          },
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
        ref: 'findAllNoParent',
        error,
        logger: this.logger,
      });
    }
  }

  async findAllBasic() {
    try {
      const sellers = await this.sellerRepository.find({
        select: {
          id: true,
          uuid: true,
          nombre: true,
        },
        where: {
          isActive: true,
        },
      });
      return sellers;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'findAllBasic',
        error,
        logger: this.logger,
      });
    }
  }

  async findOneByName(nombre: string) {
    try {
      const seller = await this.sellerRepository.findOne({
        where: {
          nombre: Raw((alias) => `UPPER(${alias}) = '${nombre.toUpperCase()}'`),
          isActive: true,
        },
      });

      console.log(seller);

      return seller;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'findOneByName',
        error,
        logger: this.logger,
      });
    }
  }

  async findOne(id: number) {
    try {
      const seller = await this.sellerRepository.findOne({
        where: {
          id,
          isActive: true,
        },
        relations: ['references', 'referencePhones', 'sellers', 'parent'],
      });
      if (!seller) {
        throw new NotFoundException(`Seller con ID: ${id} no existe`);
      }
      return seller;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'findOne',
        error,
        logger: this.logger,
      });
    }
  }

  async updatePhones(
    id: number,
    updateSellerDto: UpdateSellerDto,
    seller: Seller,
  ) {
    const telefonos = JSON.parse(updateSellerDto.telefonos || '[]');

    await this.referencePhoneRepository
      .createQueryBuilder()
      .delete()
      .where('sellerId = :sellerId', { sellerId: id })
      .execute();

    await this.savePhones(telefonos, seller);
  }

  async updateReferences(
    id: number,
    updateSellerDto: UpdateSellerDto,
    seller: Seller,
    images: Array<Express.Multer.File>,
  ) {
    const referencias = JSON.parse(updateSellerDto.referencias || '[]');

    const referenciasAnteriores = await this.referenceRepository.find({
      where: {
        seller: {
          id,
        },
      },
    });

    const refNew = referencias.filter((ref) => ref.id.startsWith('new'));
    const refUpdate = referencias.filter((ref) => !ref.id.startsWith('new'));

    referenciasAnteriores.forEach(async (refAnt) => {
      const { id, image } = refAnt;
      const refAunExiste = refUpdate.find(
        (ref) => Number(ref.id) === Number(id),
      );
      if (refAunExiste) {
        // Aun existe la referencia y se necesita actualizar
        const imageMain = images.find(
          (img) => img.originalname === refAunExiste.image,
        );
        await this.referenceRepository.update(refAunExiste.id, {
          description: refAunExiste.description,
          link: refAunExiste.linkUbicacion,
          order: Number(refAunExiste.order),
          ...(imageMain && { image: imageMain.filename }),
        });
        if (imageMain && image) {
          await this.removeImageByName(image);
        }
      } else {
        // ya no existe y necesito eliminarla
        image && (await this.removeImageByName(image));
        await this.referenceRepository.delete(id);
      }
    });

    //Nuevos registros
    refNew.forEach(async (ref) => {
      const imageMain = images.find((img) => img.originalname === ref.image);

      await this.referenceRepository.save({
        description: ref.description,
        link: ref.linkUbicacion,
        order: Number(ref.order),
        ...(imageMain && { image: imageMain.filename }),
        seller,
      });
    });
  }

  async update(
    id: number,
    updateSellerDto: UpdateSellerDto,
    images: Array<Express.Multer.File>,
  ) {
    const imageMain = images.find((img) => !img.fieldname.startsWith('ref'));

    const seller = await this.findOne(id);
    if (imageMain) {
      await this.removeImageByName(seller.image);
    }

    try {
      const seller = await this.sellerRepository.preload({
        id,
        ...updateSellerDto,
        ...(imageMain && { image: imageMain.filename }),
      });
      const sellerUpgrade = await this.sellerRepository.save(seller);
      await this.updatePhones(id, updateSellerDto, sellerUpgrade);
      await this.updateReferences(
        id,
        updateSellerDto,
        sellerUpgrade,
        images.filter((img) => img.fieldname.startsWith('ref')),
      );
      return this.findOne(id);
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'update',
        error,
        logger: this.logger,
      });
    }
  }

  async removeImageByName(imgName: string) {
    const urlBase = resolve() + `/public/static/images/sellers`;
    const mainImage = `${urlBase}/${imgName}`;
    if (existsSync(mainImage)) {
      unlinkSync(mainImage);
    }
    return true;
  }

  async removeImgs(seller: Seller) {
    const { image, references } = seller;
    await this.removeImageByName(image);
    references.forEach(async (reference) => {
      if (reference.image) {
        await this.removeImageByName(reference.image);
      }
    });
    return true;
  }

  async remove(id: number) {
    const seller = await this.findOne(id);
    try {
      await this.sellerRepository.delete(id);
      await this.removeImgs(seller);
      return seller;
    } catch (error) {
      this.commonService.handleExceptions({
        ref: 'remove',
        error,
        logger: this.logger,
      });
    }
  }
}
