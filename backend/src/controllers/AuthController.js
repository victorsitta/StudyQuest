const { validationResult } = require("express-validator");
const AuthService = require("../services/AuthService");

class AuthController {
  /**
   * POST /api/auth/register
   * Cria um novo usuário
   */
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const result = await AuthService.register({ name, email, password });

    return res.status(201).json({
      message: "Conta criada com sucesso!",
      user: result.user,
      token: result.token,
    });
  }

  /**
   * POST /api/auth/login
   * Autentica um usuário existente
   */
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await AuthService.login({ email, password });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: result.user,
      token: result.token,
    });
  }

  /**
   * POST /api/auth/logout
   * Invalida a sessão (stateless JWT — apenas confirmação)
   */
  async logout(req, res) {
    return res.status(200).json({ message: "Logout realizado com sucesso!" });
  }
}

module.exports = new AuthController();
