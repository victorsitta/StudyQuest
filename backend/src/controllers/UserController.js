const UserService = require("../services/UserService");

class UserController {
  /**
   * GET /api/users/me
   * Retorna os dados do usuário autenticado
   */
  async getMe(req, res) {
    const user = await UserService.findById(req.userId);
    return res.status(200).json({ user });
  }

  /**
   * PUT /api/users/me
   * Atualiza nome ou avatar do usuário
   */
  async updateMe(req, res) {
    const { name, avatar } = req.body;
    const user = await UserService.update(req.userId, { name, avatar });
    return res.status(200).json({ message: "Perfil atualizado!", user });
  }

  /**
   * GET /api/users/me/stats
   * Retorna estatísticas de desempenho do usuário
   */
  async getStats(req, res) {
    const stats = await UserService.getStats(req.userId);
    return res.status(200).json({ stats });
  }
}

module.exports = new UserController();
