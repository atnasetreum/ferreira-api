import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    carsByLogistics(): Promise<any[]>;
    totalByLogistics(startDate: Date, endDate: Date): Promise<any[][]>;
    rutasByLogistics(startDate: Date, endDate: Date): Promise<{
        name: string;
        y: any;
    }[]>;
    rutasByLogisticsTimeLine(): Promise<{
        categories: any;
        series: any[];
    }>;
    rutasByDrivers(startDate: Date, endDate: Date): Promise<{
        categories: unknown[];
        data: any[];
    }>;
    stateCountDashboard(startDate: Date, endDate: Date): Promise<{
        totales: {
            title: string;
            total: string;
        };
        promedioRuta: {
            title: string;
            total: number;
        };
        sellers: {
            title: string;
            total: number;
        };
        drivers: {
            title: string;
            total: number;
        };
    }>;
}
