import { RouteSeller } from 'src/routes/entities';
import { ReferencePhone } from './reference-phone.entity';
import { Reference } from './reference.entity';
export declare class Seller {
    id: number;
    uuid: string;
    nombre: string;
    calle: string;
    numero: string;
    colonia: string;
    ciudad: string;
    municipio: string;
    estado: string;
    cp: number;
    linkUbicacion: string;
    image: string;
    personaQueAtiende?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    referencePhones: ReferencePhone[];
    references: Reference[];
    parent: Seller;
    sellers: Seller[];
    routeSeller: RouteSeller[];
}
