const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/auth");

// Todas as rotas de usuário exigem autenticação
router.use(authMiddleware);

// GET /api/users/me
router.get("/me", UserController.getMe);

// PUT /api/users/me
router.put("/me", UserController.updateMe);

// GET /api/users/me/stats
router.get("/me/stats", UserController.getStats);

module.exports = router;
