import { Document } from 'mongoose';
export declare class Weather extends Document {
    temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    description: string;
    location: string;
    timestamp: Date;
}
export declare const WeatherSchema: import("mongoose").Schema<Weather, import("mongoose").Model<Weather, any, any, any, Document<unknown, any, Weather, any, {}> & Weather & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Weather, Document<unknown, {}, import("mongoose").FlatRecord<Weather>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Weather> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=weather.schema.d.ts.map