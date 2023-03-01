import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
// import { ConfigService } from 'nestjs-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const config: ConfigService = app.get(ConfigService);

  await app.listen(3000);
  Logger.log(`app is listening on port = ${3000} and env is`);
}
bootstrap();
