import { ConfigService } from '@nestjs/config';
export declare class CommonService {
    private readonly request;
    private readonly configService;
    private secretKey;
    constructor(request: any, configService: ConfigService);
    private errorsAxios;
    private errorsNest;
    private errorsDB;
    handleExceptions({ ref, error, logger, }: {
        ref: string;
        error: any;
        logger: any;
    }): never;
    createJwt(payload: any): any;
    decodedJwt(token: string): any;
}
