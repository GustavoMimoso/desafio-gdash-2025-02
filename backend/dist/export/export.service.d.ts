import { Model } from 'mongoose';
import { Weather } from '../weather/schemas/weather.schema';
export declare class ExportService {
    private weatherModel;
    constructor(weatherModel: Model<Weather>);
    generateCsv(): Promise<string>;
    generateXlsx(): Promise<Buffer>;
}
//# sourceMappingURL=export.service.d.ts.map