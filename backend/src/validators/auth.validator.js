const { body } = require("express-validator");

const validateRegister = [
  body("name")
    .trim()
    .notEmpty().withMessage("Nome é obrigatório.")
    .isLength({ min: 2, max: 60 }).withMessage("Nome deve ter entre 2 e 60 caracteres."),

  body("email")
    .trim()
    .notEmpty().withMessage("E-mail é obrigatório.")
    .isEmail().withMessage("Informe um e-mail válido.")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Senha é obrigatória.")
    .isLength({ min: 6 }).withMessage("A senha deve ter no mínimo 6 caracteres."),
];

const validateLogin = [
  body("email")
    .trim()
    .notEmpty().withMessage("E-mail é obrigatório.")
    .isEmail().withMessage("Informe um e-mail válido.")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Senha é obrigatória."),
];

module.exports = { validateRegister, validateLogin };
