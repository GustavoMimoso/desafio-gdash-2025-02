export declare class HealthController {
    checkHealth(): Promise<{
        status: string;
        timestamp: string;
        checks: {
            mongodb: string;
            rabbitmq: string;
        };
    }>;
}
//# sourceMappingURL=health.controller.d.ts.map