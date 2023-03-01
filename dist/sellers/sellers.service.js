"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SellersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_service_1 = require("../common/common.service");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
const fs_1 = require("fs");
const path_1 = require("path");
let SellersService = SellersService_1 = class SellersService {
    constructor(sellerRepository, referencePhoneRepository, referenceRepository, commonService) {
        this.sellerRepository = sellerRepository;
        this.referencePhoneRepository = referencePhoneRepository;
        this.referenceRepository = referenceRepository;
        this.commonService = commonService;
        this.logger = new common_1.Logger(SellersService_1.name);
    }
    async create(createSellerDto, images) {
        try {
            const telefonos = JSON.parse(createSellerDto.telefonos || '[]');
            const referencias = JSON.parse(createSellerDto.referencias || '[]');
            let parent = null;
            if (createSellerDto.idGroup) {
                parent = await this.findOne(createSellerDto.idGroup);
            }
            const sellerCreate = await this.sellerRepository.create(Object.assign(Object.assign({}, createSellerDto), { parent, image: images.find((image) => !image.fieldname.startsWith('ref'))
                    .filename }));
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
        }
        catch (error) {
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
    async findAll(query) {
        try {
            const sellers = await this.sellerRepository.find({
                where: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ isActive: true }, ((query === null || query === void 0 ? void 0 : query.id) && { id: Number(query.id) })), ((query === null || query === void 0 ? void 0 : query.uuid) && {
                    uuid: (0, typeorm_2.Raw)((alias) => `LOWER(${alias}) Like '%${query.uuid.toLowerCase()}%'`),
                })), ((query === null || query === void 0 ? void 0 : query.nombre) && {
                    nombre: (0, typeorm_2.Raw)((alias) => `LOWER(${alias}) Like '%${query.nombre.toLowerCase()}%'`),
                })), ((query === null || query === void 0 ? void 0 : query.personaQueAtiende) && {
                    personaQueAtiende: (0, typeorm_2.Raw)((alias) => `LOWER(${alias}) Like '%${query.personaQueAtiende.toLowerCase()}%'`),
                })), ((query === null || query === void 0 ? void 0 : query.estado) && { estado: query.estado })), ((query === null || query === void 0 ? void 0 : query.municipio) && { municipio: query.municipio })), ((query === null || query === void 0 ? void 0 : query.ciudad) && { ciudad: query.ciudad })), ((query === null || query === void 0 ? void 0 : query.referencia) && {
                    references: {
                        description: (0, typeorm_2.Raw)((alias) => `LOWER(${alias}) Like '%${query.referencia.toLowerCase()}%'`),
                    },
                })), ((query === null || query === void 0 ? void 0 : query.telefono) && {
                    referencePhones: {
                        phone: (0, typeorm_2.Raw)((alias) => `LOWER(${alias}) Like '%${query.telefono.toLowerCase()}%'`),
                    },
                })), ((query === null || query === void 0 ? void 0 : query.telefonoNombre) && {
                    referencePhones: {
                        name: (0, typeorm_2.Raw)((alias) => `LOWER(${alias}) Like '%${query.telefonoNombre.toLowerCase()}%'`),
                    },
                })),
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
        }
        catch (error) {
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
                    parent: (0, typeorm_2.IsNull)(),
                },
            });
            return sellers;
        }
        catch (error) {
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
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findAllBasic',
                error,
                logger: this.logger,
            });
        }
    }
    async findOneByName(nombre) {
        try {
            const seller = await this.sellerRepository.findOne({
                where: {
                    nombre: (0, typeorm_2.Raw)((alias) => `UPPER(${alias}) = '${nombre.toUpperCase()}'`),
                    isActive: true,
                },
            });
            console.log(seller);
            return seller;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findOneByName',
                error,
                logger: this.logger,
            });
        }
    }
    async findOne(id) {
        try {
            const seller = await this.sellerRepository.findOne({
                where: {
                    id,
                    isActive: true,
                },
                relations: ['references', 'referencePhones', 'sellers', 'parent'],
            });
            if (!seller) {
                throw new common_1.NotFoundException(`Seller con ID: ${id} no existe`);
            }
            return seller;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'findOne',
                error,
                logger: this.logger,
            });
        }
    }
    async updatePhones(id, updateSellerDto, seller) {
        const telefonos = JSON.parse(updateSellerDto.telefonos || '[]');
        await this.referencePhoneRepository
            .createQueryBuilder()
            .delete()
            .where('sellerId = :sellerId', { sellerId: id })
            .execute();
        await this.savePhones(telefonos, seller);
    }
    async updateReferences(id, updateSellerDto, seller, images) {
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
            const refAunExiste = refUpdate.find((ref) => Number(ref.id) === Number(id));
            if (refAunExiste) {
                const imageMain = images.find((img) => img.originalname === refAunExiste.image);
                await this.referenceRepository.update(refAunExiste.id, Object.assign({ description: refAunExiste.description, link: refAunExiste.linkUbicacion, order: Number(refAunExiste.order) }, (imageMain && { image: imageMain.filename })));
                if (imageMain && image) {
                    await this.removeImageByName(image);
                }
            }
            else {
                image && (await this.removeImageByName(image));
                await this.referenceRepository.delete(id);
            }
        });
        refNew.forEach(async (ref) => {
            const imageMain = images.find((img) => img.originalname === ref.image);
            await this.referenceRepository.save(Object.assign(Object.assign({ description: ref.description, link: ref.linkUbicacion, order: Number(ref.order) }, (imageMain && { image: imageMain.filename })), { seller }));
        });
    }
    async update(id, updateSellerDto, images) {
        const imageMain = images.find((img) => !img.fieldname.startsWith('ref'));
        const seller = await this.findOne(id);
        if (imageMain) {
            await this.removeImageByName(seller.image);
        }
        try {
            const seller = await this.sellerRepository.preload(Object.assign(Object.assign({ id }, updateSellerDto), (imageMain && { image: imageMain.filename })));
            const sellerUpgrade = await this.sellerRepository.save(seller);
            await this.updatePhones(id, updateSellerDto, sellerUpgrade);
            await this.updateReferences(id, updateSellerDto, sellerUpgrade, images.filter((img) => img.fieldname.startsWith('ref')));
            return this.findOne(id);
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'update',
                error,
                logger: this.logger,
            });
        }
    }
    async removeImageByName(imgName) {
        const urlBase = (0, path_1.resolve)() + `/public/static/images/sellers`;
        const mainImage = `${urlBase}/${imgName}`;
        if ((0, fs_1.existsSync)(mainImage)) {
            (0, fs_1.unlinkSync)(mainImage);
        }
        return true;
    }
    async removeImgs(seller) {
        const { image, references } = seller;
        await this.removeImageByName(image);
        references.forEach(async (reference) => {
            if (reference.image) {
                await this.removeImageByName(reference.image);
            }
        });
        return true;
    }
    async remove(id) {
        const seller = await this.findOne(id);
        try {
            await this.sellerRepository.delete(id);
            await this.removeImgs(seller);
            return seller;
        }
        catch (error) {
            this.commonService.handleExceptions({
                ref: 'remove',
                error,
                logger: this.logger,
            });
        }
    }
};
SellersService = SellersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Seller)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.ReferencePhone)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Reference)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        common_service_1.CommonService])
], SellersService);
exports.SellersService = SellersService;
//# sourceMappingURL=sellers.service.js.map