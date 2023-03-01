/// <reference types="multer" />
import { SellersService } from './sellers.service';
import { CreateSellerDto, QuerySellerDto, UpdateSellerDto } from './dto';
export declare class SellersController {
    private readonly sellersService;
    constructor(sellersService: SellersService);
    create(createSellerDto: CreateSellerDto, images: Array<Express.Multer.File>): Promise<import("./entities").Seller>;
    findAll(query: QuerySellerDto): Promise<import("./entities").Seller[]>;
    findAllNoParent(): Promise<import("./entities").Seller[]>;
    findAllBasic(): Promise<import("./entities").Seller[]>;
    findOneByName(name: string): Promise<import("./entities").Seller>;
    findOne(id: string): Promise<import("./entities").Seller>;
    update(id: string, updateSellerDto: UpdateSellerDto, images: Array<Express.Multer.File>): Promise<import("./entities").Seller>;
    remove(id: string): Promise<import("./entities").Seller>;
}
