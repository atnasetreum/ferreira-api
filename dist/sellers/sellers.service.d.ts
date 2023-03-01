/// <reference types="multer" />
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { CreateSellerDto, QuerySellerDto, UpdateSellerDto } from './dto';
import { Seller, ReferencePhone, Reference } from './entities';
export declare class SellersService {
    private readonly sellerRepository;
    private readonly referencePhoneRepository;
    private readonly referenceRepository;
    private readonly commonService;
    private readonly logger;
    constructor(sellerRepository: Repository<Seller>, referencePhoneRepository: Repository<ReferencePhone>, referenceRepository: Repository<Reference>, commonService: CommonService);
    create(createSellerDto: CreateSellerDto, images: Array<Express.Multer.File>): Promise<Seller>;
    savePhones(telefonos: any, seller: any): Promise<void>;
    findAll(query: QuerySellerDto): Promise<Seller[]>;
    findAllNoParent(): Promise<Seller[]>;
    findAllBasic(): Promise<Seller[]>;
    findOneByName(nombre: string): Promise<Seller>;
    findOne(id: number): Promise<Seller>;
    updatePhones(id: number, updateSellerDto: UpdateSellerDto, seller: Seller): Promise<void>;
    updateReferences(id: number, updateSellerDto: UpdateSellerDto, seller: Seller, images: Array<Express.Multer.File>): Promise<void>;
    update(id: number, updateSellerDto: UpdateSellerDto, images: Array<Express.Multer.File>): Promise<Seller>;
    removeImageByName(imgName: string): Promise<boolean>;
    removeImgs(seller: Seller): Promise<boolean>;
    remove(id: number): Promise<Seller>;
}
