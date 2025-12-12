import { WeatherService } from './weather.service';
export declare class WeatherController {
    private readonly weatherService;
    constructor(weatherService: WeatherService);
    getWeather(page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<import("./schemas/weather.schema").Weather> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getInsights(): Promise<{
        message: string;
        avgTemp: number;
        maxTemp: number;
        minTemp: number;
        lastUpdate?: undefined;
        totalRecords?: undefined;
    } | {
        avgTemp: number;
        maxTemp: number;
        minTemp: number;
        lastUpdate: Date;
        totalRecords: number;
        message?: undefined;
    }>;
}
//# sourceMappingURL=weather.controller.d.ts.map