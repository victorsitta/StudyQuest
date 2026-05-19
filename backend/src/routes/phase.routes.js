const express = require("express");
const router = express.Router();
const PhaseController = require("../controllers/PhaseController");
const authMiddleware = require("../middlewares/auth");

// GET /api/phases — lista todas as fases (com status do usuário se autenticado)
router.get("/", authMiddleware, PhaseController.getAll);

// GET /api/phases/:id — detalhes de uma fase
router.get("/:id", authMiddleware, PhaseController.getById);

module.exports = router;
