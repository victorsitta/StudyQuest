const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");
const AppError = require("../utils/AppError");

class AuthService {
  /**
   * Registra um novo usuário
   * @param {{ name: string, email: string, password: string }} data
   */
  async register({ name, email, password }) {
    const existing = await UserRepository.findByEmail(email);
    if (existing) {
      throw new AppError("Este e-mail já está em uso.", 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserRepository.create({
      name,
      email,
      passwordHash,
      avatar: "🧑‍🎓",
      level: 1,
      xp: 0,
      maxXp: 1000,
    });

    const token = this._generateToken(user.id);

    return { user: this._sanitize(user), token };
  }

  /**
   * Autentica um usuário existente
   * @param {{ email: string, password: string }} data
   */
  async login({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    const token = this._generateToken(user.id);

    return { user: this._sanitize(user), token };
  }

  /**
   * Gera um JWT para o usuário
   * @param {string} userId
   * @returns {string}
   */
  _generateToken(userId) {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
  }

  /**
   * Remove campos sensíveis antes de retornar ao cliente
   * @param {object} user
   */
  _sanitize(user) {
    const { passwordHash, ...safe } = user;
    return safe;
  }
}

module.exports = new AuthService();
