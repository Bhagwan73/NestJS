import { Injectable, LoggerService } from '@nestjs/common';
import {
  redBright,
  yellowBright,
  cyan,
  white,
  gray,
  bgRed,
  bold,
} from 'colorette';

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
    console.log(white(this.formatMessage('log', message, optionalParams)));
  }

  fatal(message: any, ...optionalParams: any[]) {
    const formatted = this.formatMessage('fatal', message, optionalParams);
    console.error(bgRed(bold(white(formatted))));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(
      redBright(this.formatMessage('error', message, optionalParams)),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      yellowBright(this.formatMessage('warn', message, optionalParams)),
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(gray(this.formatMessage('debug', message, optionalParams)));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(cyan(this.formatMessage('verbose', message, optionalParams)));
  }
}
