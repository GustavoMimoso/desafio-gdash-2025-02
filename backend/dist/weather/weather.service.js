"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const weather_schema_1 = require("./schemas/weather.schema");
let WeatherService = class WeatherService {
    constructor(weatherModel) {
        this.weatherModel = weatherModel;
    }
    async getWeather(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const data = await this.weatherModel
            .find()
            .skip(skip)
            .limit(limit)
            .sort({ timestamp: -1 })
            .lean();
        const total = await this.weatherModel.countDocuments();
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getInsights() {
        const data = await this.weatherModel.find().sort({ timestamp: -1 }).limit(100);
        if (!data.length) {
            return {
                message: 'Sem dados climáticos ainda',
                avgTemp: 0,
                maxTemp: 0,
                minTemp: 0,
            };
        }
        const temps = data.map((d) => d.temperature || 0);
        const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(2);
        const maxTemp = Math.max(...temps);
        const minTemp = Math.min(...temps);
        return {
            avgTemp: parseFloat(avgTemp),
            maxTemp,
            minTemp,
            lastUpdate: data[0].timestamp,
            totalRecords: data.length,
        };
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(weather_schema_1.Weather.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WeatherService);
//# sourceMappingURL=weather.service.js.map