import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { CreateLogisticDto, UpdateLogisticDto } from './dto';
import { Logistic } from './entities/logistic.entity';
export declare class LogisticsService {
    private readonly logisticRepository;
    private readonly commonService;
    private readonly logger;
    constructor(logisticRepository: Repository<Logistic>, commonService: CommonService);
    create(createLogisticDto: CreateLogisticDto): Promise<Logistic>;
    findAll(): Promise<Logistic[]>;
    findOne(id: number): Promise<Logistic>;
    update(id: number, updateLogisticDto: UpdateLogisticDto): Promise<Logistic>;
    remove(id: number): Promise<Logistic>;
}
