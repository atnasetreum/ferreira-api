import { CarsService } from 'src/cars/cars.service';
import { LogisticsService } from 'src/logistics/logistics.service';
import { Route } from 'src/routes/entities';
import { RoutesService } from 'src/routes/routes.service';
import { Repository } from 'typeorm';
export declare class DashboardService {
    private readonly logisticsService;
    private readonly carsService;
    private readonly routesService;
    private readonly routeRepository;
    private readonly logger;
    constructor(logisticsService: LogisticsService, carsService: CarsService, routesService: RoutesService, routeRepository: Repository<Route>);
    carsByLogistics(): Promise<any[]>;
    totalByLogistics(): Promise<{
        name: string;
        y: any;
    }[]>;
    rutasByLogistics(): Promise<{
        name: string;
        y: any;
    }[]>;
    rutasByDrivers(): Promise<{
        categories: unknown[];
        data: any[];
    }>;
}
