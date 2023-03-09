import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../share';

@Injectable()
export class AccessInterceptor implements NestInterceptor {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const res = httpContext.getResponse();
    const statusCode = res.statusCode;
    const start = Date.now();

    return next.handle().pipe(
      map((data) => {
        if (![ '/api', '/', '/api/auth/token' ].includes(req.path)) {
          const end = Date.now();
          let logFormat = `${req.ip} / ${end -
            start}ms ${req.path} ${req.method} ${statusCode}`;
          if (this.config.get('app.logRes')) {
            logFormat += ` - res: ${JSON.stringify(data)}`;
          }
          this.logger.access(logFormat);

          if (statusCode >= 500) {
            this.logger.error(logFormat);
          } else if (statusCode >= 400) {
            this.logger.warn(logFormat);
          }
        }

        return data;
      }),
    );
  }
}
