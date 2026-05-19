/**
 * Classe de erro operacional da aplicação
 * Erros lançados com AppError são tratados de forma controlada
 * pelo errorHandler — sem vazar stack traces para o cliente.
 */
class AppError extends Error {
  /**
   * @param {string} message - Mensagem amigável para o cliente
   * @param {number} statusCode - HTTP status code (padrão: 400)
   */
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
