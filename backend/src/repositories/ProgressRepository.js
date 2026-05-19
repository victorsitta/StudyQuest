/**
 * Repositório de Progresso
 * Armazena o estado de cada fase por usuário.
 */

// { userId: [{ phaseId, unlocked, completed, totalAnswers, correctAnswers }] }
const progressStore = {};

class ProgressRepository {
  /**
   * Retorna todo o progresso de um usuário
   * @param {string} userId
   * @returns {object[]}
   */
  async findByUserId(userId) {
    return progressStore[userId] || [];
  }

  /**
   * Retorna o progresso de um usuário em uma fase específica
   * @param {string} userId
   * @param {number} phaseId
   * @returns {object|null}
   */
  async findByUserAndPhase(userId, phaseId) {
    const userProgress = progressStore[userId] || [];
    return userProgress.find((p) => p.phaseId === phaseId) || null;
  }

  /**
   * Marca uma fase como concluída
   * @param {string} userId
   * @param {number} phaseId
   */
  async completePhase(userId, phaseId) {
    this._ensureEntry(userId, phaseId);
    const entry = progressStore[userId].find((p) => p.phaseId === phaseId);
    entry.completed = true;
    entry.completedAt = new Date().toISOString();
  }

  /**
   * Desbloqueia uma fase para o usuário
   * @param {string} userId
   * @param {number} phaseId
   */
  async unlockPhase(userId, phaseId) {
    this._ensureEntry(userId, phaseId);
    const entry = progressStore[userId].find((p) => p.phaseId === phaseId);
    entry.unlocked = true;
  }

  /**
   * Registra uma resposta (correta ou não) no progresso da fase
   * @param {string} userId
   * @param {number} phaseId
   * @param {boolean} isCorrect
   */
  async recordAnswer(userId, phaseId, isCorrect) {
    this._ensureEntry(userId, phaseId);
    const entry = progressStore[userId].find((p) => p.phaseId === phaseId);
    entry.totalAnswers = (entry.totalAnswers || 0) + 1;
    if (isCorrect) {
      entry.correctAnswers = (entry.correctAnswers || 0) + 1;
    }
  }

  /**
   * Garante que existe uma entrada de progresso para o usuário/fase
   * @param {string} userId
   * @param {number} phaseId
   */
  _ensureEntry(userId, phaseId) {
    if (!progressStore[userId]) {
      progressStore[userId] = [];
    }
    const exists = progressStore[userId].some((p) => p.phaseId === phaseId);
    if (!exists) {
      progressStore[userId].push({
        phaseId,
        unlocked: phaseId === 1,
        completed: false,
        totalAnswers: 0,
        correctAnswers: 0,
      });
    }
  }
}

module.exports = new ProgressRepository();
