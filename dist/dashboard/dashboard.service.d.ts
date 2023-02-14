import { CarsService } from 'src/cars/cars.service';
import { LogisticsService } from 'src/logistics/logistics.service';
export declare class DashboardService {
    private readonly logisticsService;
    private readonly carsService;
    private readonly logger;
    constructor(logisticsService: LogisticsService, carsService: CarsService);
    carsByLogistics(): Promise<any[]>;
}
