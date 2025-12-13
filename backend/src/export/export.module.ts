import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { Weather, WeatherSchema } from "../weather/schemas/weather.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }])],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
