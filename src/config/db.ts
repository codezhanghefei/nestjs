import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.DB_HOST || 'cluster01.proxysql.staging.internal',
  port: process.env.DB_PORT || 6032,
  username: process.env.DB_USER || 'gifshow_15514_v1_rw',
  password: process.env.DB_PASS || 'Kv1HoZN2VBu04hnfDXLKORAYUPCjFGMy',
  database: process.env.DB || 'gifshow',
  logging: process.env.DB_LOG === 'false' ? false : console.log,
}));
