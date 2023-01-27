import { Request } from 'express';
import { CommonService } from 'src/common/common.service';
import { LoginAuthDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
export declare class AuthService {
    private readonly userService;
    private readonly commonService;
    constructor(userService: UsersService, commonService: CommonService);
    responseUserSession(user: User): {
        id: number;
        name: string;
        userType: string;
        token: any;
    };
    login(loginAuthDto: LoginAuthDto): Promise<{
        id: number;
        name: string;
        userType: string;
        token: any;
    }>;
    validateToken(request: Request): Promise<{
        id: number;
        name: string;
        userType: string;
        token: any;
    }>;
}
