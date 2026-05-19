const QuestionRepository = require("../repositories/QuestionRepository");
const ProgressRepository = require("../repositories/ProgressRepository");
const AppError = require("../utils/AppError");

class QuestionService {
  /**
   * Retorna questões de uma fase SEM revelar a resposta correta
   * @param {number} phaseId
   */
  async getByPhase(phaseId) {
    const questions = await QuestionRepository.findByPhase(phaseId);
    if (!questions.length) throw new AppError("Nenhuma questão encontrada para esta fase.", 404);

    // Remove o campo 'correct' antes de enviar ao cliente
    return questions.map(({ correct, ...q }) => q);
  }

  /**
   * Verifica a resposta do usuário e retorna feedback
   * @param {{ userId: string, questionId: number, phaseId: number, selectedOption: number }} data
   */
  async checkAnswer({ userId, questionId, phaseId, selectedOption }) {
    const question = await QuestionRepository.findById(questionId);
    if (!question) throw new AppError("Questão não encontrada.", 404);

    const isCorrect = question.correct === selectedOption;

    // Registra a resposta no progresso
    await ProgressRepository.recordAnswer(userId, phaseId, isCorrect);

    return {
      isCorrect,
      correctOption: question.correct,
      explanation: question.explanation || null,
      xpGained: isCorrect ? 20 : 0,
    };
  }
}

module.exports = new QuestionService();
