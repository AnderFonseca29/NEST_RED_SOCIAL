/**
 * Clase encargada de construir las respuestas de la API del estandar
 */

export class ResponseHelper {
    /**
    * Construye una respuesta de éxito
    */

static succes(data: any, statusCode = 200) {
        return {
            succes: true,
            statusCode,
            data,
        };
    }

    /**
     * Construye una respuesta de error
     */

    static error(message: string, statusCode = 400) {
        return {
            succes: false,
            statusCode,
            message,
        };
    }

}
