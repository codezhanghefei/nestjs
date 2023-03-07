import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);

  // const port = config.get('app.port') || process.env.PORT;
  const port = 3001;

  await app.listen(port);
  Logger.log(
    `app is listening on port = ${port} and env is ${
      process.env.NODE_ENV || 'dev'
    }`,
  );
}
bootstrap();
