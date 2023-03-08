import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const port = process.env.PORT;

  await app.listen(port);
  Logger.log(`app is listening on port = ${port} and env is ${process.env.NODE_ENV || 'dev'}`,
  );
}
bootstrap();
