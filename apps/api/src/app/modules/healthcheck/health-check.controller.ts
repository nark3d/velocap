import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Healthcheck')

@Controller()
export class HealthCheckController {
  @Get()
  @ApiResponse({ status: 200, description: 'Health Check OK!' })
  getHello(): string {
    return 'Health Check OK!';
  }
}
