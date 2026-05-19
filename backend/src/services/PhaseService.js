const PhaseRepository = require("../repositories/PhaseRepository");
const ProgressRepository = require("../repositories/ProgressRepository");
const AppError = require("../utils/AppError");

class PhaseService {
  /**
   * Retorna todas as fases com o status de progresso do usuário
   * @param {string} userId
   */
  async getAllWithProgress(userId) {
    const phases = await PhaseRepository.findAll();
    const userProgress = await ProgressRepository.findByUserId(userId);

    return phases.map((phase) => {
      const progress = userProgress.find((p) => p.phaseId === phase.id);
      return {
        ...phase,
        unlocked: progress ? progress.unlocked : phase.id === 1,
        completed: progress ? progress.completed : false,
      };
    });
  }

  /**
   * Retorna uma fase específica com o status do usuário
   * @param {number} phaseId
   * @param {string} userId
   */
  async getByIdWithProgress(phaseId, userId) {
    const phase = await PhaseRepository.findById(phaseId);
    if (!phase) throw new AppError("Fase não encontrada.", 404);

    const progress = await ProgressRepository.findByUserAndPhase(userId, phaseId);

    return {
      ...phase,
      unlocked: progress ? progress.unlocked : phaseId === 1,
      completed: progress ? progress.completed : false,
    };
  }
}

module.exports = new PhaseService();
