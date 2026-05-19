const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const phaseRoutes = require("./phase.routes");
const questionRoutes = require("./question.routes");
const badgeRoutes = require("./badge.routes");
const progressRoutes = require("./progress.routes");

// ─── Health check ──────────────────────────────────────────────────────────
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "StudyQuest API",
  });
});

// ─── Módulos ───────────────────────────────────────────────────────────────
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/phases", phaseRoutes);
router.use("/questions", questionRoutes);
router.use("/badges", badgeRoutes);
router.use("/progress", progressRoutes);

module.exports = router;
