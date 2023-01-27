import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
