const UserRepository = require("../repositories/UserRepository");
const ProgressRepository = require("../repositories/ProgressRepository");
const AppError = require("../utils/AppError");

class UserService {
  /**
   * Busca usuário por ID (sem senha)
   * @param {string} userId
   */
  async findById(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    const { passwordHash, ...safe } = user;
    return safe;
  }

  /**
   * Atualiza nome e/ou avatar do usuário
   * @param {string} userId
   * @param {{ name?: string, avatar?: string }} data
   */
  async update(userId, data) {
    const user = await UserRepository.update(userId, data);
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    const { passwordHash, ...safe } = user;
    return safe;
  }

  /**
   * Retorna estatísticas de desempenho do usuário
   * @param {string} userId
   */
  async getStats(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    const progress = await ProgressRepository.findByUserId(userId);

    const totalPhases = progress.length;
    const completedPhases = progress.filter((p) => p.completed).length;
    const totalAnswers = progress.reduce((acc, p) => acc + (p.totalAnswers || 0), 0);
    const correctAnswers = progress.reduce((acc, p) => acc + (p.correctAnswers || 0), 0);
    const accuracy = totalAnswers > 0
      ? Math.round((correctAnswers / totalAnswers) * 100)
      : 0;

    return {
      level: user.level,
      xp: user.xp,
      maxXp: user.maxXp,
      completedPhases,
      totalPhases,
      totalAnswers,
      correctAnswers,
      accuracy,
    };
  }
}

module.exports = new UserService();
