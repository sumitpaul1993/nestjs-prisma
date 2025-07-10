import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConfigService } from './config/config.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly configService: AppConfigService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('health')
  getHealthStatus() {
    return {
      status: 'Healthy',
      environment: this.configService.appEnv,
    };
  }
  
}
