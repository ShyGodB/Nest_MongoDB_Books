import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('default')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/123')
  getHello(): string {
    return this.appService.getHello();
  }
  
}
