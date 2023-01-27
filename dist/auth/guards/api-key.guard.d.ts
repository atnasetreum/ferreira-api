import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ApiKeyGuard implements CanActivate {
    private readonly appKey;
    constructor(appKey: string);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
