import { RoutesService } from './routes.service';
import { CreateRouteDto, QueryReportRouteDto, QueryRouteDto, UpdateRouteDto } from './dto';
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
    create(createRouteDto: CreateRouteDto): Promise<import("./entities").Route>;
    findAll(query: QueryRouteDto): Promise<import("./entities").Route[]>;
    getDataReport(query: QueryReportRouteDto): Promise<any[]>;
    findOne(id: string): Promise<import("./entities").Route>;
    update(id: string, updateRouteDto: UpdateRouteDto): Promise<{
        sellers: any[];
        id: number;
        date: Date;
        notes: string;
        ciclo: number;
        pago: number;
        isActive: boolean;
        createdAt: string;
        updatedAt: number;
        user: import("../users/entities/user.entity").User;
        car: import("../cars/entities/car.entity").Car;
    } & import("./entities").Route>;
    remove(id: string): Promise<string>;
}
