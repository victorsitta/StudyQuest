require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Segurança e utilitários ───────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ─── Body parsing ──────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Rotas ─────────────────────────────────────────────────────────────────
app.use("/api", routes);

// ─── Tratamento de erros (deve ser os últimos middlewares) ─────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Inicialização ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 StudyQuest API rodando em http://localhost:${PORT}`);
  console.log(`📚 Ambiente: ${process.env.NODE_ENV || "development"}\n`);
});

module.exports = app;
