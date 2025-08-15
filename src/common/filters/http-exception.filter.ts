import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determine status and message
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error'; // Default to English for consistency, or localize as needed
    let details: any = null; // For development mode

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any)?.message || exception.message;
    } else if (exception instanceof Error) {
      message = exception.message || message;
    }

    // Environment-based handling
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment) {
      // Include detailed error info in dev
      details = {
        stack: (exception as Error)?.stack,
        path: request.url,
        method: request.method,
      };
    } else {
      // In production, override message for unknown errors to be user-friendly and secure
      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        message = 'An unexpected error occurred. Please try again later.';
      }
    }

    // Enhanced logging: Include request info and full stack in all envs (but log securely)
    this.logger.error(
      `Status: ${status} | Method: ${request.method} | Path: ${request.url} | Error: ${message}`,
      (exception as Error)?.stack,
    );

    // User-friendly response structure
    response.status(status).json({
      success: false,
      message, // User-facing message
      statusCode: status,
      timestamp: new Date().toISOString(),
      ...(isDevelopment && details ? { details } : {}), // Conditionally add details in dev
    });
  }
}