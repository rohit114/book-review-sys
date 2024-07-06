// src/common/filters/http-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ValidationError, isInstance } from 'class-validator';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (exception instanceof Array && exception.every(err => err instanceof ValidationError)) {
      message = exception.map(err => err.constraints)
    }

    if(exception instanceof NotFoundException){
      status = HttpStatus.NOT_FOUND;
      message = exception.getResponse();
    }

    if(exception instanceof  UnauthorizedException){
      status = HttpStatus.UNAUTHORIZED
      message = exception.getResponse();

    }



    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
