import { RoutesService } from './routes.service';
import { CreateRouteDto, UpdateRouteDto } from './dto';
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
    create(createRouteDto: CreateRouteDto): Promise<import("./entities/route.entity").Route>;
    findAll(): Promise<import("./entities/route.entity").Route[]>;
    findOne(id: string): Promise<import("./entities/route.entity").Route>;
    update(id: string, updateRouteDto: UpdateRouteDto): Promise<import("./entities/route.entity").Route>;
    remove(id: string): Promise<string>;
}
