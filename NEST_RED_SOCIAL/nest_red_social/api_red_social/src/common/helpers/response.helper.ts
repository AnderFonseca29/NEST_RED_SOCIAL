/**
 * clase encargada de construir la respuesta del api estandar
 */

export class ResponseHelper {
    /**
     * respuesta exitosa
     */

  static succes(data: any, statusCode = 200) {
    return {
      success: true,
      statusCode,
      data,
    };
  }
  /**
   * respuesta con error
   */
  static error(data: any, statusCode = 400) {
    return {
      success: false,
      statusCode,
      data,
    };
  }
}
