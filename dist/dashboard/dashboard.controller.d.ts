import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    carsByLogistics(): Promise<any[]>;
    totalByLogistics(): Promise<{
        name: string;
        y: any;
    }[]>;
}
