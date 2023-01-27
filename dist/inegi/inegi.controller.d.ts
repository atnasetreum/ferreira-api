import { InegiService } from './inegi.service';
export declare class InegiController {
    private readonly inegiService;
    constructor(inegiService: InegiService);
    entidades(): Promise<any>;
    municipios(entidad: string): Promise<any>;
    localidades(entidad: string, municipio: string): Promise<any>;
}
