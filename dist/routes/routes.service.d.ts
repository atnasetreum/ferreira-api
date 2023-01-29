import { CommonService } from 'src/common/common.service';
import { SellersService } from 'src/sellers/sellers.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateRouteDto, UpdateRouteDto } from './dto';
import { Route } from './entities/route.entity';
export declare class RoutesService {
    private readonly routeRepository;
    private readonly commonService;
    private readonly usersService;
    private readonly sellersService;
    private readonly logger;
    constructor(routeRepository: Repository<Route>, commonService: CommonService, usersService: UsersService, sellersService: SellersService);
    create(createRouteDto: CreateRouteDto): Promise<Route>;
    findAll(): Promise<Route[]>;
    findOne(id: number): Promise<Route>;
    update(id: number, updateRouteDto: UpdateRouteDto): Promise<Route>;
    remove(id: number): Promise<string>;
}
