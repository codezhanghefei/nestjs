import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  evn: 'dev',
  port: process.env.PORT,
}));
