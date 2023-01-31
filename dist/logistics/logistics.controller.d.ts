import { LogisticsService } from './logistics.service';
import { CreateLogisticDto, UpdateLogisticDto } from './dto';
export declare class LogisticsController {
    private readonly logisticsService;
    constructor(logisticsService: LogisticsService);
    create(createLogisticDto: CreateLogisticDto): Promise<import("./entities/logistic.entity").Logistic>;
    findAll(): Promise<import("./entities/logistic.entity").Logistic[]>;
    findOne(id: string): Promise<import("./entities/logistic.entity").Logistic>;
    update(id: string, updateLogisticDto: UpdateLogisticDto): Promise<import("./entities/logistic.entity").Logistic>;
    remove(id: string): Promise<import("./entities/logistic.entity").Logistic>;
}
