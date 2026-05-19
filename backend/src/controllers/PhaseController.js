const PhaseService = require("../services/PhaseService");

class PhaseController {
  /**
   * GET /api/phases
   * Lista todas as fases com o status de progresso do usuário
   */
  async getAll(req, res) {
    const phases = await PhaseService.getAllWithProgress(req.userId);
    return res.status(200).json({ phases });
  }

  /**
   * GET /api/phases/:id
   * Retorna detalhes de uma fase específica
   */
  async getById(req, res) {
    const phase = await PhaseService.getByIdWithProgress(
      Number(req.params.id),
      req.userId
    );
    return res.status(200).json({ phase });
  }
}

module.exports = new PhaseController();
