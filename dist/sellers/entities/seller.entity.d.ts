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
    createdAt: string;
    updatedAt: number;
    referencePhones: ReferencePhone[];
    references: Reference[];
    parent: Seller;
    sellers: Seller[];
}
