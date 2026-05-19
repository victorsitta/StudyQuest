/**
 * Middleware para rotas não encontradas (404)
 */
module.exports = function notFound(req, res) {
  res.status(404).json({
    status: "error",
    message: `Rota não encontrada: ${req.method} ${req.originalUrl}`,
  });
};
