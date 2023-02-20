import { Car } from 'src/cars/entities/car.entity';
import { User } from '../../users/entities/user.entity';
import { RouteSeller } from './route-seller.entity';
export declare class Route {
    id: number;
    date: Date;
    notes: string;
    ciclo: number;
    pago: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: number;
    user: User;
    car: Car;
    sellers: RouteSeller[];
}
