import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { CreateUserTypeDto, UpdateUserTypeDto } from './dto';
import { UserType } from './entities/user-type.entity';
export declare class UserTypesService {
    private readonly userTypeRepository;
    private readonly commonService;
    private readonly logger;
    constructor(userTypeRepository: Repository<UserType>, commonService: CommonService);
    create(createUserTypeDto: CreateUserTypeDto): Promise<UserType>;
    findAll(): Promise<UserType[]>;
    findOne(id: number): Promise<UserType>;
    update(id: number, updateUserTypeDto: UpdateUserTypeDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<string>;
}
