import { Seller } from './seller.entity';
export declare class ReferencePhone {
    id: number;
    name: string;
    phone: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: number;
    seller: Seller;
}
