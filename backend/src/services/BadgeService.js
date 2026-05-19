const BadgeRepository = require("../repositories/BadgeRepository");

class BadgeService {
  /**
   * Retorna todos os badges com status de desbloqueio do usuário
   * @param {string} userId
   */
  async getAllWithStatus(userId) {
    const allBadges = await BadgeRepository.findAll();
    const userBadges = await BadgeRepository.findByUserId(userId);
    const unlockedIds = new Set(userBadges.map((b) => b.badgeId));

    return allBadges.map((badge) => ({
      ...badge,
      unlocked: unlockedIds.has(badge.id),
    }));
  }

  /**
   * Verifica e concede badges com base no progresso atual do usuário
   * Chamado internamente após completar uma fase
   * @param {string} userId
   * @param {{ completedPhases: number, level: number, correctStreak: number }} stats
   * @returns {Badge[]} badges recém desbloqueados
   */
  async checkAndGrant(userId, stats) {
    const allBadges = await BadgeRepository.findAll();
    const userBadges = await BadgeRepository.findByUserId(userId);
    const unlockedIds = new Set(userBadges.map((b) => b.badgeId));

    const newBadges = [];

    for (const badge of allBadges) {
      if (unlockedIds.has(badge.id)) continue;

      const shouldUnlock = this._checkCondition(badge, stats);
      if (shouldUnlock) {
        await BadgeRepository.grantToUser(userId, badge.id);
        newBadges.push(badge);
      }
    }

    return newBadges;
  }

  /**
   * Avalia se um badge deve ser desbloqueado com base nas condições
   * @param {object} badge
   * @param {object} stats
   */
  _checkCondition(badge, stats) {
    switch (badge.condition) {
      case "first_phase":
        return stats.completedPhases >= 1;
      case "five_streak":
        return stats.correctStreak >= 5;
      case "three_phases":
        return stats.completedPhases >= 3;
      case "level_10":
        return stats.level >= 10;
      case "all_phases":
        return stats.completedPhases >= stats.totalPhases;
      default:
        return false;
    }
  }
}

module.exports = new BadgeService();
