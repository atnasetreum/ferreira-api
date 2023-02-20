import { Seller } from 'src/sellers/entities';
import { Route } from './route.entity';
export declare class RouteSeller {
    id: number;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    route: Route;
    seller: Seller;
}
