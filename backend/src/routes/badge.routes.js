const express = require("express");
const router = express.Router();
const BadgeController = require("../controllers/BadgeController");
const authMiddleware = require("../middlewares/auth");

// GET /api/badges — todos os badges com status do usuário
router.get("/", authMiddleware, BadgeController.getAll);

module.exports = router;
