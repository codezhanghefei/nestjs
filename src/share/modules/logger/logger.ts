import * as Log4js from 'log4js'
import * as Moment from 'moment';
import * as Util from 'util';
import * as Path from 'path';


const baseLogPath = Path.join(process.cwd(), 'logs');

export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}

export function initLogger(appName: string): void {
  Log4js.addLayout(appName, (logConfig: any) => {
    return (logEvent: Log4js.LoggingEvent): string => {
      let moduleName = '';
      let position = '';

      const messageList: string[] = [];
      logEvent.data.forEach((value: any) => {
        if (value instanceof ContextTrace) {
          moduleName = value.context;
          if (value.lineNumber && value.columnNumber) {
            position = `${value.lineNumber}, ${value.columnNumber}`;
          }
          return;
        }

        if (typeof value !== 'string') {
          value = Util.inspect(value, false, 3, true);
        }

        messageList.push(value);
      });

      const messageOutput: string = messageList.join(' ');
      const positionOutput: string = position ? ` [${position}]` : '';
      // const typeOutput = `[${
      //   logConfig.type
      // }] ${logEvent.pid.toString()} - `;
      const dateOutput = `${Moment(logEvent.startTime).format(
        'YYYY-MM-DD HH:mm:ss',
      )}`;
      const moduleOutput: string = moduleName
        ? `[${moduleName}] `
        : '[LoggerService] ';
      let levelOutput = `[${logEvent.level}] ${messageOutput}`;

      // switch (logEvent.level.toString()) {
      //   case LoggerLevel.DEBUG:
      //     levelOutput = chalk.green(levelOutput);
      //     break;
      //   case LoggerLevel.INFO:
      //     levelOutput = chalk.cyan(levelOutput);
      //     break;
      //   case LoggerLevel.WARN:
      //     levelOutput = chalk.yellow(levelOutput);
      //     break;
      //   case LoggerLevel.ERROR:
      //     levelOutput = chalk.red(levelOutput);
      //     break;
      //   case LoggerLevel.FATAL:
      //     levelOutput = chalk.hex('#DD4C35')(levelOutput);
      //     break;
      //   default:
      //     levelOutput = chalk.grey(levelOutput);
      //     break;
      // }

      // return `${chalk.green(typeOutput)}${dateOutput}  ${chalk.yellow(moduleOutput)} ${positionOutput}`;
      return `${dateOutput}  ${moduleOutput}${levelOutput}${positionOutput}`;
    };
  });
}

export function buildLogConfig(env: string, appName: string): Log4js.Configuration {
  const consoleConfig: Log4js.ConsoleAppender = {
    type: 'console',
    layout: { type: appName },
  };

  const accessConfig: Log4js.DateFileAppender = {
    type: 'dateFile',
    filename: `${baseLogPath}/access/access.log`,
    alwaysIncludePattern: false,
    pattern: 'yyyyMMdd',
    // daysToKeep: KEEP_DAY,
    keepFileExt: true,
    layout: {
      type: 'pattern',
      pattern: '%z - [%d] [%p] %m',
    },
  };

  const appConfig: Log4js.DateFileAppender = {
    type: 'dateFile',
    filename: `${baseLogPath}/app/app.log`,
    alwaysIncludePattern: false,
    // 日志文件按日期（天）切割
    pattern: 'yyyyMMdd',
    // daysToKeep: KEEP_DAY,
    keepFileExt: true,
    layout: { type: appName },
  };

  const errFileConfig: Log4js.DateFileAppender = {
    type: 'dateFile',
    filename: `${baseLogPath}/errors/error.log`,
    alwaysIncludePattern: false,
    // 日志文件按日期（天）切割
    pattern: 'yyyyMMdd',
    // daysToKeep: KEEP_DAY,
    keepFileExt: true,
    layout: { type: appName },
  };

  let categories: {
    [name: string]: {
      appenders: string[];
      level: string;
      enableCallStack?: boolean;
    };
  } = {
    default: {
      appenders: [ 'console', 'app', 'errors' ],
      level: 'DEBUG',
    },
    info: { appenders: [ 'console', 'app', 'errors' ], level: 'info' },
    access: { appenders: [ 'console', 'app', 'errors' ], level: 'info' },
    http: { appenders: [ 'access' ], level: 'DEBUG' },
  };

  if (env === 'dev') {
    categories = {
      default: {
        appenders: [ 'console' ],
        level: 'DEBUG',
      },
    };
  }

  const log4jsConfig = {
    appenders: {
      console: consoleConfig,
      access: accessConfig,
      app: appConfig,
      errorFile: errFileConfig,
      errors: {
        type: 'logLevelFilter',
        level: 'ERROR',
        appender: 'errorFile',
      },
    },
    categories,
    // pm2: process.env.ENV === 'stg', // 使用 pm2 来管理项目时，打开
    // pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
  };

  return log4jsConfig;
};