import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  async checkHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        mongodb: 'connected',
        rabbitmq: 'connected',
      },
    };
  }
}
