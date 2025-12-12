import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { ExportModule } from './export/export.module';
import { HealthModule } from './health/health.module';
import { CatalogsModule } from './catalogs/catalogs.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
    }),
    AuthModule,
    UsersModule,
    WeatherModule,
    ExportModule,
    HealthModule,
    CatalogsModule,
  ],
})
export class AppModule {}
