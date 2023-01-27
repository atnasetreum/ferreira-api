import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommonService } from 'src/common/common.service';
export declare class JwtValidateGuard implements CanActivate {
    private readonly commonService;
    constructor(commonService: CommonService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
