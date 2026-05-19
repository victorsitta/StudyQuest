const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/QuestionController");
const authMiddleware = require("../middlewares/auth");

// GET /api/questions/phase/:phaseId — questões de uma fase
router.get("/phase/:phaseId", authMiddleware, QuestionController.getByPhase);

// POST /api/questions/answer — registra resposta do usuário
router.post("/answer", authMiddleware, QuestionController.answer);

module.exports = router;
