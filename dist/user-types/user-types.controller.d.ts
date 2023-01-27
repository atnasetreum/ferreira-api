import { UserTypesService } from './user-types.service';
import { CreateUserTypeDto, UpdateUserTypeDto } from './dto';
export declare class UserTypesController {
    private readonly userTypesService;
    constructor(userTypesService: UserTypesService);
    create(createUserTypeDto: CreateUserTypeDto): Promise<import("./entities/user-type.entity").UserType>;
    findAll(): Promise<import("./entities/user-type.entity").UserType[]>;
    findOne(id: string): Promise<import("./entities/user-type.entity").UserType>;
    update(id: string, updateUserTypeDto: UpdateUserTypeDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<string>;
}
