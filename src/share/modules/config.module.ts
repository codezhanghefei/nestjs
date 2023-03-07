import * as Path from 'path';
import { ConfigModule as Config } from '@nestjs/config';
import configs from '@/config';

// const env = process.env.NODE_ENV;
// const envFile = `.env${env ? '.' + env : ''}`;
const envFile = `.env.test`;

const envFilePath = Path.resolve(process.cwd(), 'env', envFile);
// console.log('envFilePath', envFilePath);

export const ConfigModule = Config.forRoot({
  envFilePath,
  isGlobal: true,
  load: configs,
});
