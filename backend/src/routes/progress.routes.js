const express = require("express");
const router = express.Router();
const ProgressController = require("../controllers/ProgressController");
const authMiddleware = require("../middlewares/auth");

// GET /api/progress — progresso completo do usuário
router.get("/", authMiddleware, ProgressController.getProgress);

// POST /api/progress/phase/:phaseId/complete — conclui uma fase
router.post("/phase/:phaseId/complete", authMiddleware, ProgressController.completePhase);

// POST /api/progress/xp — adiciona XP manualmente (ex: bônus)
router.post("/xp", authMiddleware, ProgressController.addXp);

module.exports = router;
