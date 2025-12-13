import { Model } from 'mongoose';
import { Weather } from './schemas/weather.schema';
export declare class WeatherService {
    private weatherModel;
    constructor(weatherModel: Model<Weather>);
    getWeather(page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<Weather> & Required<{
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
//# sourceMappingURL=weather.service.d.ts.map