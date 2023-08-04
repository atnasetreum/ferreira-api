import { CommonService } from 'src/common/common.service';
import { UserTypesService } from 'src/user-types/user-types.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly commonService;
    private readonly userTypeService;
    private readonly logger;
    constructor(userRepository: Repository<User>, commonService: CommonService, userTypeService: UserTypesService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    usersDrivers(): Promise<User[]>;
    usersLogin(): Promise<any[]>;
    findOne(id: number): Promise<User>;
    findOneBy(where: FindOptionsWhere<User>): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<"" | import("typeorm").UpdateResult>;
    remove(id: number): Promise<string>;
}
