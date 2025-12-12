import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Health check geral' })
  @ApiResponse({ status: 200, description: 'Sistema saudável' })
  check() {
    return this.health.check([
      () => this.db.pingCheck('mongodb', { timeout: 300 }),
    ]);
  }

  @Get('readiness')
  @ApiOperation({ summary: 'Readiness probe (Kubernetes)' })
  readiness() {
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('liveness')
  @ApiOperation({ summary: 'Liveness probe (Kubernetes)' })
  liveness() {
    return {
      status: 'alive',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('version')
  @ApiOperation({ summary: 'Versão da API' })
  version() {
    return {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      timestamp: new Date().toISOString(),
    };
  }
}
