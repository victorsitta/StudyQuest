const ProgressService = require("../services/ProgressService");

class ProgressController {
  /**
   * GET /api/progress
   * Retorna o progresso completo do usuário (fases, XP, nível, badges)
   */
  async getProgress(req, res) {
    const progress = await ProgressService.getFullProgress(req.userId);
    return res.status(200).json({ progress });
  }

  /**
   * POST /api/progress/phase/:phaseId/complete
   * Marca uma fase como concluída e concede XP + verifica badges
   */
  async completePhase(req, res) {
    const result = await ProgressService.completePhase(
      req.userId,
      Number(req.params.phaseId)
    );

    return res.status(200).json({
      message: "Fase concluída!",
      xpGained: result.xpGained,
      newBadges: result.newBadges,
      user: result.user,
    });
  }

  /**
   * POST /api/progress/xp
   * Adiciona XP ao usuário (ex: bônus por sequência)
   * Body: { amount }
   */
  async addXp(req, res) {
    const { amount } = req.body;
    const user = await ProgressService.addXp(req.userId, Number(amount));
    return res.status(200).json({ message: `+${amount} XP adicionado!`, user });
  }
}

module.exports = new ProgressController();
