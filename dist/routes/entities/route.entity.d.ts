import { Car } from 'src/cars/entities/car.entity';
import { Seller } from 'src/sellers/entities';
import { User } from '../../users/entities/user.entity';
export declare class Route {
    id: number;
    date: Date;
    notes: string;
    ciclo: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: number;
    user: User;
    car: Car;
    sellers: Seller[];
}
