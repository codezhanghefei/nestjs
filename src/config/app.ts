import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: 'dev',
  port: process.env.PORT,
}));
