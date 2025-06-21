import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    optionalParams: any[],
  ): string {
    const timestamp = new Date().toISOString();
    const baseMessage =
      typeof message === 'string' ? message : JSON.stringify(message);
    const extraParams = optionalParams.length
      ? JSON.stringify(optionalParams)
      : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${baseMessage} ${extraParams}`;
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('fatal', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, optionalParams));
  }
}
