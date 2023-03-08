import { CarsService } from 'src/cars/cars.service';
import { LogisticsService } from 'src/logistics/logistics.service';
import { Route } from 'src/routes/entities';
import { Seller } from 'src/sellers/entities';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class DashboardService {
    private readonly logisticsService;
    private readonly carsService;
    private readonly routeRepository;
    private readonly sellerRepository;
    private readonly userRepository;
    private readonly logger;
    constructor(logisticsService: LogisticsService, carsService: CarsService, routeRepository: Repository<Route>, sellerRepository: Repository<Seller>, userRepository: Repository<User>);
    carsByLogistics(): Promise<any[]>;
    totalByLogistics(): Promise<any[][]>;
    rutasByLogistics(): Promise<{
        name: string;
        y: any;
    }[]>;
    rutasByDrivers(): Promise<{
        categories: unknown[];
        data: any[];
    }>;
    stateCountDashboard(): Promise<{
        totales: {
            title: string;
            total: string;
        };
        promedioRuta: {
            title: string;
            total: number;
        };
        sellers: {
            title: string;
            total: number;
        };
        drivers: {
            title: string;
            total: number;
        };
    }>;
}
