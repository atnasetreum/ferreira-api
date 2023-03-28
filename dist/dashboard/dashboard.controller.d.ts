import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    carsByLogistics(): Promise<any[]>;
    totalByLogistics(): Promise<any[][]>;
    rutasByLogistics(): Promise<{
        name: string;
        y: any;
    }[]>;
    rutasByLogisticsTimeLine(): Promise<{
        categories: any;
        series: any[];
    }>;
    rutasByDrivers(): Promise<{
        categories: unknown[];
        data: any[];
    }>;
    stateCountDashboard(): Promise<{
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
