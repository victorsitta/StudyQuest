import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Play, Star, Zap, Crown, Rocket, Scroll, Lock, CheckCircle2, LogOut } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { motion } from "framer-motion";

// Ícones por matéria
const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  "Física":    <Rocket className="w-8 h-8" />,
  "Química":   <Zap className="w-8 h-8" />,
  "Biologia":  <Star className="w-8 h-8" />,
};

// Gradientes por matéria
const SUBJECT_COLORS: Record<string, string> = {
  "Física":   "from-blue-600 to-cyan-400",
  "Química":  "from-purple-600 to-pink-400",
  "Biologia": "from-emerald-600 to-teal-400",
};

const Dashboard = () => {
  const { user, phases, isLoggedIn, logout } = useGame();
  const navigate = useNavigate();

  // Proteção de rota — redireciona para login se não autenticado
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  const xpPercent = Math.round((user.xp / user.maxXp) * 100);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#070714] text-white overflow-x-hidden relative font-sans">

      {/* Fundo estático — sem movimento para não distrair */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[5%] left-[10%] w-[40rem] h-[40rem] bg-purple-900/15 blur-[160px] rounded-full" />
        <div className="absolute bottom-[5%] right-[5%] w-[30rem] h-[30rem] bg-blue-900/15 blur-[140px] rounded-full" />
      </div>

      {/* ── HUD HEADER ─────────────────────────────────────────────────────── */}
      <header className="relative z-50 pt-5 px-4 md:px-8">
        <div className="max-w-5xl mx-auto bg-[#13132B]/90 backdrop-blur-xl border-2 border-slate-700/50 rounded-[2rem] px-5 py-4 shadow-xl flex items-center gap-4">

          {/* Avatar + nível */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl border-4 border-[#070714] shadow-lg select-none">
              {user.avatar}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-pink-600 text-white text-xs font-black px-2 py-0.5 rounded-full border-2 border-[#070714]">
              {user.level}
            </div>
          </div>

          {/* Nome + XP */}
          <div className="flex-1 min-w-0">
            <p className="font-black text-white text-base truncate">
              {user.name || "Estudante"}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-3 bg-[#070714] rounded-full overflow-hidden border border-slate-700/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                />
              </div>
              <span className="text-xs text-slate-400 font-bold shrink-0">
                {user.xp}/{user.maxXp} XP
              </span>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/profile" aria-label="Ver perfil">
              <div className="w-11 h-11 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center text-xl transition-colors border border-slate-700/50">
                👤
              </div>
            </Link>
            <button
              onClick={handleLogout}
              aria-label="Sair da conta"
              className="w-11 h-11 bg-slate-800 hover:bg-rose-900/50 rounded-xl flex items-center justify-center transition-colors border border-slate-700/50 text-slate-400 hover:text-rose-400"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── CONTEÚDO PRINCIPAL ─────────────────────────────────────────────── */}
      <main className="relative z-10 px-4 md:px-8 pt-10 pb-20 max-w-5xl mx-auto">

        {/* Saudação clara — o usuário sabe onde está */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white">
            Olá, {user.name || "Estudante"}! 👋
          </h1>
          <p className="text-slate-400 mt-1 text-base">
            Escolha uma fase para continuar sua jornada.
          </p>
        </div>

        {/* ── TRILHA DE FASES ──────────────────────────────────────────────── */}
        <section aria-label="Trilha de fases">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
            Trilha de Estudos
          </h2>

          <div className="flex flex-col gap-4">
            {phases.map((phase, index) => {
              const color = SUBJECT_COLORS[phase.subject] || "from-slate-600 to-slate-500";
              const icon = SUBJECT_ICONS[phase.subject] || <Star className="w-8 h-8" />;
              const isUnlocked = phase.unlocked;
              const isCompleted = phase.completed;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                >
                  <button
                    disabled={!isUnlocked}
                    onClick={() => isUnlocked && navigate("/play", { state: { phaseId: phase.id } })}
                    aria-label={`${phase.title} — ${phase.subject}${isCompleted ? " — Concluída" : ""}${!isUnlocked ? " — Bloqueada" : ""}`}
                    className={`
                      w-full text-left rounded-[1.5rem] border-2 p-5 flex items-center gap-5 transition-all duration-200
                      ${isUnlocked
                        ? "bg-[#13132B] border-slate-700/50 hover:border-white/20 hover:bg-[#1a1a38] cursor-pointer active:scale-[0.99]"
                        : "bg-[#0d0d20] border-slate-800/50 cursor-not-allowed opacity-60"
                      }
                    `}
                  >
                    {/* Ícone da fase */}
                    <div
                      className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center shrink-0
                        ${isUnlocked
                          ? `bg-gradient-to-br ${color} text-white shadow-lg`
                          : "bg-slate-800 text-slate-600"
                        }
                      `}
                    >
                      {isUnlocked ? icon : <Lock className="w-7 h-7" />}
                    </div>

                    {/* Texto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold uppercase tracking-wider ${isUnlocked ? "text-slate-400" : "text-slate-600"}`}>
                          {phase.subject}
                        </span>
                        {isCompleted && (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" /> Concluída
                          </span>
                        )}
                      </div>
                      <p className={`font-black text-lg mt-0.5 ${isUnlocked ? "text-white" : "text-slate-600"}`}>
                        {phase.title}
                      </p>
                    </div>

                    {/* Seta / cadeado */}
                    <div className="shrink-0">
                      {isUnlocked ? (
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
                          <Play className="w-5 h-5 text-white" fill="white" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                          <Lock className="w-5 h-5 text-slate-600" />
                        </div>
                      )}
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── JOGOS ESPECIAIS ──────────────────────────────────────────────── */}
        <section aria-label="Jogos especiais" className="mt-14">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
            Módulos Especiais
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Leis de Newton",
                subject: "Física — Dinâmica",
                icon: <Rocket className="w-8 h-8" />,
                color: "from-blue-600 to-cyan-400",
                route: "/newton",
                description: "Teoria, simulador interativo e quiz",
              },
              {
                title: "Esportes Paralímpicos",
                subject: "Educação Física",
                icon: <Scroll className="w-8 h-8" />,
                color: "from-amber-500 to-orange-400",
                route: "/sports",
                description: "Goalball, Futebol e Handebol",
              },
            ].map((game) => (
              <motion.div
                key={game.route}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => navigate(game.route)}
                  className="w-full text-left rounded-[1.5rem] bg-[#13132B] border-2 border-slate-700/50 hover:border-white/20 hover:bg-[#1a1a38] p-5 flex items-center gap-4 transition-all duration-200 active:scale-[0.99] cursor-pointer"
                  aria-label={`Abrir módulo: ${game.title}`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white shrink-0 shadow-lg`}>
                    {game.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{game.subject}</span>
                    <p className="font-black text-white text-base mt-0.5">{game.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{game.description}</p>
                  </div>
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center shrink-0 shadow-md`}>
                    <Play className="w-4 h-4 text-white" fill="white" />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
