const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { validateRegister, validateLogin } = require("../validators/auth.validator");

// POST /api/auth/register
router.post("/register", validateRegister, AuthController.register);

// POST /api/auth/login
router.post("/login", validateLogin, AuthController.login);

// POST /api/auth/logout
router.post("/logout", AuthController.logout);

module.exports = router;
