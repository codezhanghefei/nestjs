import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@/share/modules';
import { DemoModule } from '@/modules';
@Module({
  imports: [ConfigModule, DemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
