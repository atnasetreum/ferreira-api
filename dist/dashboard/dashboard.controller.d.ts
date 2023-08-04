import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    carsByLogistics(): Promise<any[]>;
    totalByLogistics(startDate: string, endDate: string): Promise<any[][]>;
    rutasByLogistics(startDate: string, endDate: string): Promise<{
        name: string;
        y: any;
    }[]>;
    rutasByLogisticsTimeLine(): Promise<{
        categories: any;
        series: any[];
    }>;
    rutasByDrivers(startDate: string, endDate: string): Promise<{
        categories: unknown[];
        data: any[];
    }>;
    stateCountDashboard(startDate: string, endDate: string): Promise<{
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
