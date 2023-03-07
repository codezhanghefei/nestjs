import { Controller, Get, Query } from '@nestjs/common';
import { DemoService } from './demo.services';

@Controller('demo')
export class DemoController {
  constructor(private demoService: DemoService) {}
  @Get('get')
  getDemo(@Query() query): string {
    console.log('query', query);
    return this.demoService.getDemo();
  }
}
