import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WeatherService } from './weather.service';

@ApiTags('weather')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get()
  async findAll(@Query('limit') limit = 100) {
    return this.weatherService.findAll(limit);
  }

  @Get('insights')
  async getInsights() {
    return this.weatherService.getInsights();
  }
}
