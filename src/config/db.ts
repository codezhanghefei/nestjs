import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
}));
