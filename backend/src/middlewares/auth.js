const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

/**
 * Middleware de autenticação JWT
 * Verifica o token no header Authorization: Bearer <token>
 * Injeta req.userId para uso nos controllers
 */
module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Token de autenticação não fornecido.", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch {
    throw new AppError("Token inválido ou expirado.", 401);
  }
};
