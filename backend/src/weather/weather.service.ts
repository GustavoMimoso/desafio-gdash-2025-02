import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from './schemas/weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) {}

  async getWeather(page: number = 1, limit: number = 10) {
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

    const temps = data.map((d: any) => d.temperature || 0);
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
}
