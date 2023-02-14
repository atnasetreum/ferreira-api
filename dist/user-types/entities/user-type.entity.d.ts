import { User } from 'src/users/entities/user.entity';
export declare enum EUserType {
    ADMIN = "ADMIN",
    DRIVER = "DRIVER"
}
export declare class UserType {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: number;
    users: User[];
}
