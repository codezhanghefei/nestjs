import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
    whitelist: true,
    transform: true, // 是否惊醒格式转换
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  const config = app.get(ConfigService);
  const port = config.get('app.port')
  // 使用 process.env 方式引入port
  // const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`app is listening on port = ${port} and env is ${process.env.NODE_ENV || 'dev'}`,
  );
}
bootstrap();
