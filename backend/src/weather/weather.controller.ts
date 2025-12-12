import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.weatherService.getWeather(page, limit);
  }

  @Get('insights')
  async getInsights() {
    return this.weatherService.getInsights();
  }
}
