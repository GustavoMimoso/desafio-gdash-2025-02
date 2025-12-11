import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { parse } from 'fast-csv';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class ExportService {
  constructor(private weatherService: WeatherService) {}

  async exportCSV() {
    const data = await this.weatherService.findAll(1000);
    let csv = 'Location,Temperature,Humidity,WindSpeed,Description,Timestamp\n';
    
    data.forEach((item: any) => {
      csv += `${item.location},${item.temperature},${item.humidity},${item.windSpeed},"${item.description}",${item.timestamp}\n`;
    });

    return csv;
  }

  async exportXLSX() {
    const data = await this.weatherService.findAll(1000);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Weather');
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  }
}
