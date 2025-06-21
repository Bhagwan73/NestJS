import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLogger } from '../logger';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isDev = process.env.NODE_ENV === 'development';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = true;
    let data = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const resp: any = exceptionResponse;
        message =
          Array.isArray(resp.message) && resp.message.length
            ? resp.message.join(', ')
            : resp.message || resp.error || 'Bad request';
      }
    } else if (exception instanceof Error) {
      message = exception.message || message;
    }

    // Console log for dev/debug
    if (isDev) {
      this.logger.error(
        `[Exception] ${status} - ${request.method} ${request.url}: ${message}`,
        exception instanceof Error ? exception.stack : exception,
      );
    }

    const responseBody = isDev
      ? {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          message,
          error,
          data,
          stack: exception instanceof Error ? exception.stack : undefined,
        }
      : {
          message,
          error,
          data,
        };

    response.status(status).json(responseBody);
  }
  Inject: [CustomLogger];
}
