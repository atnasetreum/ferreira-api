import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    carsByLogistics(): Promise<any[]>;
    totalByLogistics(): Promise<{
        name: string;
        y: any;
    }[]>;
    rutasByLogistics(): Promise<{
        name: string;
        y: any;
    }[]>;
    rutasByDrivers(): Promise<{
        categories: unknown[];
        data: any[];
    }>;
}
