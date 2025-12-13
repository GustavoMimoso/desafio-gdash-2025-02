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
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const weather_schema_1 = require("../weather/schemas/weather.schema");
let ExportService = class ExportService {
    constructor(weatherModel) {
        this.weatherModel = weatherModel;
    }
    async generateCsv() {
        const data = await this.weatherModel.find().lean();
        if (!data.length)
            return 'Sem dados para exportar';
        const headers = ['Data', 'Temperatura (°C)', 'Umidade (%)', 'Pressão (mb)', 'Vento (km/h)', 'Localização'];
        const rows = data.map((d) => [
            new Date(d.timestamp).toLocaleString('pt-BR'),
            d.temperature,
            d.humidity,
            d.pressure,
            d.windSpeed,
            d.location || 'N/A',
        ]);
        const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
        return csv;
    }
    async generateXlsx() {
        // Para XLSX, seria necessário instalar 'xlsx' package
        // Por enquanto retornamos um erro
        throw new Error('XLSX export requer pacote adicional. Instale com: npm install xlsx');
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(weather_schema_1.Weather.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ExportService);
//# sourceMappingURL=export.service.js.map