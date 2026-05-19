import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGame } from "@/contexts/GameContext";
import { mockQuestions } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, Trophy, Zap } from "lucide-react";

// ─── Cores fixas por opção (A, B, C, D) — previsíveis, sem surpresa ──────────
const OPTION_LABELS = ["A", "B", "C", "D"];
const OPTION_COLORS = [
  { idle: "border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-200", label: "bg-blue-500" },
  { idle: "border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200", label: "bg-purple-500" },
  { idle: "border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200", label: "bg-amber-500" },
  { idle: "border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200", label: "bg-emerald-500" },
];

// ─── Tela de resultado final ──────────────────────────────────────────────────
function ResultScreen({
  score,
  total,
  xpGained,
  onBack,
}: {
  score: number;
  total: number;
  xpGained: number;
  onBack: () => void;
}) {
  const perfect = score === total;
  const emoji = perfect ? "🏆" : score >= total / 2 ? "⭐" : "💪";
  const message = perfect
    ? "Perfeito! Você acertou tudo!"
    : score >= total / 2
    ? "Muito bem! Continue assim."
    : "Boa tentativa! Você vai melhorar.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center gap-6 py-8"
    >
      <div className="text-7xl" role="img" aria-label={message}>
        {emoji}
      </div>

      <div>
        <h2 className="text-3xl font-black text-white">{message}</h2>
        <p className="text-slate-400 mt-2 text-lg">
          Você acertou{" "}
          <span className="text-white font-bold">{score}</span> de{" "}
          <span className="text-white font-bold">{total}</span> questões.
        </p>
      </div>

      {/* XP ganho */}
      <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-6 py-3 rounded-2xl">
        <Zap className="w-5 h-5 text-amber-400" fill="currentColor" />
        <span className="text-amber-400 font-black text-lg">+{xpGained} XP ganhos</span>
      </div>

      {/* Barra de acertos visual */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-xs text-slate-500 font-bold mb-2">
          <span>Acertos</span>
          <span>{Math.round((score / total) * 100)}%</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(score / total) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
          />
        </div>
      </div>

      <button
        onClick={onBack}
        className="mt-2 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg hover:opacity-90 transition-opacity active:scale-95"
        aria-label="Voltar ao mapa de fases"
      >
        <Trophy className="w-5 h-5" />
        Voltar ao Mapa
      </button>
    </motion.div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
const Play = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addXp, completePhase, isLoggedIn } = useGame();

  // Proteção de rota
  useEffect(() => {
    if (!isLoggedIn) navigate("/auth", { replace: true });
  }, [isLoggedIn, navigate]);

  const phaseId = (location.state as any)?.phaseId ?? 1;
  const questions = mockQuestions[phaseId] ?? mockQuestions[1];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const isCorrect = selected !== null && selected === current.correct;

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return; // Já respondeu esta questão

    setSelected(optionIndex);
    setShowFeedback(true);

    const correct = optionIndex === current.correct;
    if (correct) {
      setScore((s) => s + 1);
      setXpGained((x) => x + 20);
      addXp(20);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);

    if (isLast) {
      completePhase(phaseId);
      setFinished(true);
    } else {
      setSelected(null);
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleBack = () => navigate("/dashboard");

  if (!isLoggedIn) return null;

  const progress = ((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#070714] text-white flex flex-col">

      {/* ── BARRA SUPERIOR ─────────────────────────────────────────────────── */}
      <header className="px-4 pt-5 pb-3 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-4">
          {/* Botão voltar — sempre visível e claro */}
          <button
            onClick={handleBack}
            aria-label="Voltar ao mapa"
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors shrink-0 border border-slate-700/50"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>

          {/* Barra de progresso — mostra onde está na fase */}
          <div className="flex-1">
            <div className="flex justify-between text-xs text-slate-500 font-bold mb-1.5">
              <span>Questão {Math.min(currentIndex + 1, questions.length)} de {questions.length}</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Zap className="w-3 h-3" fill="currentColor" />
                {xpGained} XP
              </span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── CONTEÚDO ───────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {finished ? (
            <ResultScreen
              key="result"
              score={score}
              total={questions.length}
              xpGained={xpGained}
              onBack={handleBack}
            />
          ) : (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col gap-6"
            >
              {/* Pergunta */}
              <div className="bg-[#13132B] border-2 border-slate-700/50 rounded-[1.5rem] p-6 md:p-8">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Questão {currentIndex + 1}
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                  {current.question}
                </h2>
              </div>

              {/* Opções */}
              <div className="flex flex-col gap-3" role="group" aria-label="Opções de resposta">
                {current.options.map((option, i) => {
                  const colors = OPTION_COLORS[i] || OPTION_COLORS[0];
                  const isSelected = selected === i;
                  const isRight = i === current.correct;

                  let stateClass = "";
                  if (selected === null) {
                    stateClass = colors.idle;
                  } else if (isRight) {
                    stateClass = "border-emerald-500 bg-emerald-500/20 text-emerald-200";
                  } else if (isSelected && !isRight) {
                    stateClass = "border-rose-500 bg-rose-500/20 text-rose-200";
                  } else {
                    stateClass = "border-slate-700/30 bg-slate-800/30 text-slate-500 opacity-50";
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      whileTap={selected === null ? { scale: 0.98 } : {}}
                      className={`
                        w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4
                        transition-all duration-200 font-medium text-base
                        disabled:cursor-default
                        ${stateClass}
                      `}
                      aria-label={`Opção ${OPTION_LABELS[i]}: ${option}`}
                      aria-pressed={isSelected}
                    >
                      {/* Label da opção (A, B, C, D) */}
                      <span
                        className={`
                          w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white shrink-0
                          ${selected === null ? colors.label : isRight ? "bg-emerald-500" : isSelected ? "bg-rose-500" : "bg-slate-700"}
                        `}
                      >
                        {OPTION_LABELS[i]}
                      </span>
                      <span className="flex-1">{option}</span>

                      {/* Ícone de feedback */}
                      {selected !== null && (
                        isRight ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        ) : null
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback após responder */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className={`
                      rounded-2xl border-2 p-5 flex flex-col gap-3
                      ${isCorrect
                        ? "bg-emerald-500/10 border-emerald-500/40"
                        : "bg-rose-500/10 border-rose-500/40"
                      }
                    `}
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex items-center gap-3">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                          <div>
                            <p className="font-black text-emerald-400 text-base">Correto! +20 XP</p>
                            <p className="text-emerald-300/70 text-sm">Ótimo trabalho, continue assim.</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                          <div>
                            <p className="font-black text-rose-400 text-base">Não foi dessa vez.</p>
                            <p className="text-rose-300/70 text-sm">
                              A resposta certa era:{" "}
                              <span className="font-bold text-rose-300">
                                {current.options[current.correct]}
                              </span>
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Botão de avançar — grande e claro */}
                    <button
                      onClick={handleNext}
                      className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold py-3.5 rounded-xl transition-colors text-base"
                      aria-label={isLast ? "Ver resultado final" : "Próxima questão"}
                    >
                      {isLast ? "Ver Resultado" : "Próxima Questão"}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Play;
