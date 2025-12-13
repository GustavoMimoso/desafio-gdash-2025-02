import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Weather extends Document {
  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ required: true })
  pressure: number;

  @Prop({ required: true })
  windSpeed: number;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
