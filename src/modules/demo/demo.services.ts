import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DemoService {
  constructor(private config: ConfigService) {}
  getEnv(): string {
    // return process.env.PORT;
    // return this.config.get('DOMAIN');
    // return this.config.get('app.port');
    return this.config.get('db.user');
  }
}
