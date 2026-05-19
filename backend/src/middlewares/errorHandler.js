const AppError = require("../utils/AppError");

/**
 * Middleware global de tratamento de erros
 * Deve ser o último middleware registrado no server.js
 */
// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  // Erro operacional conhecido (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Erro de JWT malformado
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "error",
      message: "Token inválido ou expirado.",
    });
  }

  // Erro inesperado — não expõe detalhes em produção
  console.error("❌ Erro inesperado:", err);

  return res.status(500).json({
    status: "error",
    message:
      process.env.NODE_ENV === "production"
        ? "Erro interno do servidor."
        : err.message,
  });
};
