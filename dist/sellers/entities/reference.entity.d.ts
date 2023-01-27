import { Seller } from './seller.entity';
export declare class Reference {
    id: number;
    description: string;
    link: string;
    image: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: number;
    seller: Seller;
}
