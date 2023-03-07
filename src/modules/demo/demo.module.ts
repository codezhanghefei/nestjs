import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.services';
@Module({
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
