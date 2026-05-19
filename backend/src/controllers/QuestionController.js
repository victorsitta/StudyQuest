const QuestionService = require("../services/QuestionService");

class QuestionController {
  /**
   * GET /api/questions/phase/:phaseId
   * Retorna as questões de uma fase (sem revelar a resposta correta)
   */
  async getByPhase(req, res) {
    const questions = await QuestionService.getByPhase(Number(req.params.phaseId));
    return res.status(200).json({ questions });
  }

  /**
   * POST /api/questions/answer
   * Recebe a resposta do usuário, valida e retorna feedback
   * Body: { questionId, phaseId, selectedOption }
   */
  async answer(req, res) {
    const { questionId, phaseId, selectedOption } = req.body;

    const result = await QuestionService.checkAnswer({
      userId: req.userId,
      questionId: Number(questionId),
      phaseId: Number(phaseId),
      selectedOption: Number(selectedOption),
    });

    return res.status(200).json(result);
  }
}

module.exports = new QuestionController();
