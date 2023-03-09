import * as path from 'path';
import * as Log4js from 'log4js';
import * as StackTrace from 'stacktrace-js';
import { LoggerService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerLevel, initLogger, buildLogConfig } from './logger';

@Injectable()
export class Logger implements LoggerService {
  logger: Log4js.Logger;
  httpLogger: Log4js.Logger;

  constructor(config: ConfigService) {
    initLogger(config.get('app.name'));
    Log4js.configure(
      buildLogConfig(config.get('app.env'), config.get('app.name')),
    );

    this.logger = Log4js.getLogger();
    this.logger.level = LoggerLevel.TRACE;
    this.httpLogger = Log4js.getLogger('http');
  }

  debug?(...args): void {
    this.logger.debug(Logger.getStackTrace(), ...args);
  }

  log(...args): void {
    this.logger.info(Logger.getStackTrace(), ...args);
  }

  warn(...args): void {
    this.logger.warn(Logger.getStackTrace(), ...args);
  }

  error(...args): void {
    this.logger.error(Logger.getStackTrace(), ...args);
  }

  access(...args): void {
    this.httpLogger.info(args);
  }

  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const fileName: string = stackInfo.fileName;
    const basename: string = path.basename(fileName);

    return `${basename}:`;
  }
}
