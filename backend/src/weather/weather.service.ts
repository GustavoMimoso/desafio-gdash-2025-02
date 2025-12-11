import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from './schemas/weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) {}

  async findAll(limit: number) {
    return this.weatherModel.find().limit(limit).sort({ timestamp: -1 });
  }

  async getInsights() {
    const data = await this.weatherModel.find().sort({ timestamp: -1 }).limit(30);
    const temps = data.map(d => d.temperature);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);

    return {
      averageTemperature: avgTemp.toFixed(2),
      maxTemperature: maxTemp,
      minTemperature: minTemp,
      totalRecords: data.length,
      insights: [
        `Average temperature: ${avgTemp.toFixed(2)}°C`,
        `Maximum recorded: ${maxTemp}°C`,
        `Minimum recorded: ${minTemp}°C`,
      ],
    };
  }

  async create(data: any) {
    const weather = new this.weatherModel(data);
    return weather.save();
  }
}
