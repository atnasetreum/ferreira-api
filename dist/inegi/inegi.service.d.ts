import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { Inegi } from './entities/inegi.entity';
export declare class InegiService {
    private readonly inegiRepository;
    private readonly commonService;
    private readonly logger;
    constructor(inegiRepository: Repository<Inegi>, commonService: CommonService);
    entidades(): Promise<any>;
    municipios(entidad: string): Promise<any>;
    localidades(entidad: string, municipio: string): Promise<any>;
}
