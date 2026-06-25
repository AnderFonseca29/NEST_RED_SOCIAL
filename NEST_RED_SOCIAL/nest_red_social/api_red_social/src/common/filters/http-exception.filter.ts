import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

/**
 * captura de errores globales
 */

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const responsen =
            host.switchToHttp().getResponse();

        const status = 
            exception.getStatus();

        responsen.status(status).json({
            success: false,
            statusCode: status,
            data: exception.getResponse(),
            
        });
    }
}
