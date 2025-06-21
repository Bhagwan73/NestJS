import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// catch all HttpExceptions including validation errors
@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = 'BAD REQUEST';
    let error = true;
    let data = null;

    // handle validation exception (BadRequestException)
    if (status === HttpStatus.BAD_REQUEST) {
      typeof exceptionResponse === 'string'
        ? (message = exceptionResponse)
        : (message = (exceptionResponse as any).message[0] || 'Invalid data');
    } else {
      message = exceptionResponse['message'] || 'Internal Server Error';
    }

    // format the error response
    response.status(status).json({
      message,
      error,
      data,
    });
  }
}
