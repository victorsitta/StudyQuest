const BadgeService = require("../services/BadgeService");

class BadgeController {
  /**
   * GET /api/badges
   * Lista todos os badges com status de desbloqueio do usuário
   */
  async getAll(req, res) {
    const badges = await BadgeService.getAllWithStatus(req.userId);
    return res.status(200).json({ badges });
  }
}

module.exports = new BadgeController();
