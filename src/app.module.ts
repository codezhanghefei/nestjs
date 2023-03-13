import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, LoggerModule } from '@/share/modules';
import { DemoModule } from '@/modules';
import { AllExceptionsFilter } from './filters';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessInterceptor } from './interceptors';
import { ScheduleModule } from '@nestjs/schedule';
import { DemoScheduleService } from '@/schedules'
@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    DemoModule,
    // 定时任务
    DemoScheduleService,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AccessInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },],
})
export class AppModule {}
