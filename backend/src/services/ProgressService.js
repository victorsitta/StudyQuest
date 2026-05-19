const UserRepository = require("../repositories/UserRepository");
const PhaseRepository = require("../repositories/PhaseRepository");
const ProgressRepository = require("../repositories/ProgressRepository");
const BadgeService = require("./BadgeService");
const AppError = require("../utils/AppError");

const XP_PER_PHASE = 100;

class ProgressService {
  /**
   * Retorna o progresso completo do usuário
   * @param {string} userId
   */
  async getFullProgress(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    const phases = await PhaseRepository.findAll();
    const userProgress = await ProgressRepository.findByUserId(userId);

    const phasesWithStatus = phases.map((phase) => {
      const progress = userProgress.find((p) => p.phaseId === phase.id);
      return {
        ...phase,
        unlocked: progress ? progress.unlocked : phase.id === 1,
        completed: progress ? progress.completed : false,
      };
    });

    const { passwordHash, ...safeUser } = user;

    return {
      user: safeUser,
      phases: phasesWithStatus,
    };
  }

  /**
   * Marca uma fase como concluída, concede XP e verifica badges
   * @param {string} userId
   * @param {number} phaseId
   */
  async completePhase(userId, phaseId) {
    const phase = await PhaseRepository.findById(phaseId);
    if (!phase) throw new AppError("Fase não encontrada.", 404);

    // Marca fase como concluída e desbloqueia a próxima
    await ProgressRepository.completePhase(userId, phaseId);
    await ProgressRepository.unlockPhase(userId, phaseId + 1);

    // Concede XP
    const user = await this.addXp(userId, XP_PER_PHASE);

    // Verifica badges
    const allPhases = await PhaseRepository.findAll();
    const userProgress = await ProgressRepository.findByUserId(userId);
    const completedPhases = userProgress.filter((p) => p.completed).length;

    const newBadges = await BadgeService.checkAndGrant(userId, {
      completedPhases,
      totalPhases: allPhases.length,
      level: user.level,
      correctStreak: 0, // TODO: implementar streak
    });

    return { xpGained: XP_PER_PHASE, newBadges, user };
  }

  /**
   * Adiciona XP ao usuário e sobe de nível se necessário
   * @param {string} userId
   * @param {number} amount
   */
  async addXp(userId, amount) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    let { xp, maxXp, level } = user;
    xp += amount;

    // Sobe de nível enquanto tiver XP suficiente
    while (xp >= maxXp) {
      xp -= maxXp;
      level += 1;
      maxXp = Math.round(maxXp * 1.2); // Cada nível exige 20% mais XP
    }

    const updated = await UserRepository.update(userId, { xp, maxXp, level });
    const { passwordHash, ...safe } = updated;
    return safe;
  }
}

module.exports = new ProgressService();
