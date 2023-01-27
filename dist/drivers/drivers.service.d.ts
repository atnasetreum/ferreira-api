import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
export declare class DriversService {
    create(createDriverDto: CreateDriverDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDriverDto: UpdateDriverDto): string;
    remove(id: number): string;
}
