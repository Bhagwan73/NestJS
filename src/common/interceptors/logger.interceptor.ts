import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CustomLogger } from '../logger';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLogger) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const startDate = Date.now();
    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const resTime = startDate - endTime;
        this.logger.log(
          `${request.method} ${request.path} ${response.statusCode} ${resTime}ms`,
        );
      }),
    );
  }
}
