import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { DemoService } from './demo.services';
import { classValidatorBodyDto, classValidatorQueryDto } from './dtos/index.dto';

@Controller('demo')
export class DemoController {
  constructor(
    private demoService: DemoService
  ) {}

  @Get('env/get')
  getEnv(@Query() query): string {
    console.log('query', query);
    return this.demoService.getEnv();
  }

  @Post('class-validator/:id')
  PostClassValidator(
    @Param('id') id: string,
    @Query() query: classValidatorQueryDto,
    @Body() payload: classValidatorBodyDto,
  ): void {
    Logger.log('PostClassValidator', {
      id, query, payload
    });
  }
}
