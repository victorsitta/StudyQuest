/**
 * Repositório de Badges
 */

const badges = [
  { id: 1, name: "Primeiro Passo", description: "Completou a primeira fase", icon: "🚀", condition: "first_phase" },
  { id: 2, name: "Cientista Iniciante", description: "Acertou 5 questões seguidas", icon: "🧪", condition: "five_streak" },
  { id: 3, name: "Explorador", description: "Completou 3 fases diferentes", icon: "🗺️", condition: "three_phases" },
  { id: 4, name: "Mestre do Tempo", description: "Completou uma fase em menos de 2 min", icon: "⏱️", condition: "speed_phase" },
  { id: 5, name: "Sábio", description: "Alcançou nível 10", icon: "📚", condition: "level_10" },
  { id: 6, name: "Lendário", description: "Completou todas as fases", icon: "👑", condition: "all_phases" },
];

// Badges desbloqueados por usuário: { userId: [{ badgeId, unlockedAt }] }
const userBadges = {};

class BadgeRepository {
  /**
   * Retorna todos os badges disponíveis
   * @returns {object[]}
   */
  async findAll() {
    return [...badges];
  }

  /**
   * Retorna os badges desbloqueados por um usuário
   * @param {string} userId
   * @returns {object[]}
   */
  async findByUserId(userId) {
    return userBadges[userId] || [];
  }

  /**
   * Concede um badge a um usuário
   * @param {string} userId
   * @param {number} badgeId
   */
  async grantToUser(userId, badgeId) {
    if (!userBadges[userId]) {
      userBadges[userId] = [];
    }
    const alreadyHas = userBadges[userId].some((b) => b.badgeId === badgeId);
    if (!alreadyHas) {
      userBadges[userId].push({ badgeId, unlockedAt: new Date().toISOString() });
    }
  }
}

module.exports = new BadgeRepository();
