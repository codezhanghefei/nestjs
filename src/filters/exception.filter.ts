import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Logger } from '@/share';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    let httpError: HttpException;

    let printStack = false;
    if (exception instanceof HttpException) {
      httpError = exception;
    } else if (exception instanceof Error) {
      printStack = true;
      const error: Error = exception;
      httpError = new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      httpError.stack = error.stack;
    }
    const statusCode = httpError.getStatus();
    const errorResponse = httpError.getResponse();

    if (statusCode !== 404 && statusCode !== 403) {
      let logFormat = `${req.ip} / ${req.path || req.url} ${
        req.method
      } ${statusCode}`;

      let errorLevel;

      if (printStack) {
        logFormat += ` - ${httpError.stack}`;
      }
      const body = req.body;

      const request = {
        params: req.params,
        query: req.query,
        body,
      };

     
      logFormat += ` & request = ${JSON.stringify(request)}`;
      this.logger.error(logFormat);
    }

    res.status(statusCode).json({
      statusCode,
      message: httpError.message,
      path: req.url,
      response: errorResponse,
    });
  }
}
