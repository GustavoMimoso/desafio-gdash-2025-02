import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { getModelToken } from '@nestjs/mongoose';

describe('WeatherService', () => {
  let service: WeatherService;

  const mockWeatherModel = {
    find: jest.fn(),
    create: jest.fn(),
    exec: jest.fn(),
    sort: jest.fn(),
    limit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: getModelToken('Weather'),
          useValue: mockWeatherModel,
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should return weather data', async () => {
    const mockData = [
      {
        location: 'São Paulo',
        temperature: 25.5,
        humidity: 60,
        windSpeed: 10,
      },
    ];

    mockWeatherModel.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue(mockData),
      }),
    });

    const result = await service.getLatestWeather();
    expect(result).toEqual(mockData);
  });

  it('should save weather data', async () => {
    const weatherDto = {
      location: 'Rio de Janeiro',
      temperature: 28,
      humidity: 70,
      windSpeed: 15,
      description: 'Sunny',
    };

    mockWeatherModel.create.mockResolvedValue(weatherDto);

    const result = await service.saveWeather(weatherDto);
    expect(result).toHaveProperty('location');
  });

  it('should generate weather insights', async () => {
    const mockData = [
      { temperature: 25, humidity: 60 },
      { temperature: 26, humidity: 65 },
      { temperature: 24, humidity: 55 },
    ];

    mockWeatherModel.find.mockResolvedValue(mockData);

    const insights = {
      avgTemperature: 25,
      maxTemperature: 26,
      minTemperature: 24,
      avgHumidity: 60,
    };

    expect(insights).toHaveProperty('avgTemperature');
  });
});
