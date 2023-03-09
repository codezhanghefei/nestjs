import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@/share';
@Injectable()
export class DemoService {
  constructor(
    private config: ConfigService,
    private logger: Logger,
  ) {}
  getEnv(): string {
    // return process.env.PORT;
    // return this.config.get('DOMAIN');
    // return this.config.get('app.port');
    this.logger.log('test')
    return this.config.get('db.user');
  }
}
