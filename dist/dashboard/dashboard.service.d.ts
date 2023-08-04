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
    totalByLogistics({ startDate, endDate, }: {
        startDate: Date;
        endDate: Date;
    }): Promise<any[][]>;
    rutasByLogistics({ startDate, endDate, }: {
        startDate: Date;
        endDate: Date;
    }): Promise<{
        name: string;
        y: any;
    }[]>;
    rutasByLogisticsTimeLine(): Promise<{
        categories: any;
        series: any[];
    }>;
    rutasByDrivers({ startDate, endDate, }: {
        startDate: Date;
        endDate: Date;
    }): Promise<{
        categories: unknown[];
        data: any[];
    }>;
    stateCountDashboard({ startDate, endDate, }: {
        startDate: Date;
        endDate: Date;
    }): Promise<{
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
