import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from '../weather/schemas/weather.schema';

@Injectable()
export class ExportService {
  constructor(@InjectModel(Weather.name) private weatherModel: Model<Weather>) {}

  async generateCsv(): Promise<string> {
    const data = await this.weatherModel.find().lean();
    
    if (!data.length) return 'Sem dados para exportar';

    const headers = ['Data', 'Temperatura (°C)', 'Umidade (%)', 'Pressão (mb)', 'Vento (km/h)', 'Localização'];
    const rows = data.map((d: any) => [
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

  async generateXlsx(): Promise<Buffer> {
    // Para XLSX, seria necessário instalar 'xlsx' package
    // Por enquanto retornamos um erro
    throw new Error('XLSX export requer pacote adicional. Instale com: npm install xlsx');
  }
}
