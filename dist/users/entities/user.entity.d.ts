import { UserType } from 'src/user-types/entities/user-type.entity';
export declare class User {
    id: number;
    name: string;
    password: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: number;
    userType: UserType;
    hashPassword(): Promise<void>;
}
