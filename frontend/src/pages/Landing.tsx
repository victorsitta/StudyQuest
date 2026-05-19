import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Gamepad2, Zap, Target, Shield, Trophy, Brain, Sparkles, 
  HeartPulse, ChevronRight, Users, Flame, Gem, Crown, 
  Swords, Scroll, Compass, Github, Twitter, Disc 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

// --- DADOS DO MINIGAME ---
const DEMO_QUESTIONS = [
  { id: 1, question: "CRITICAL HIT! Quanto é 7 x 8?", options: ["54", "56", "64", "48"], answer: "56" },
  { id: 2, question: "LOOT DROP: Se você tem 15 poções e acha 12, total?", options: ["25", "37", "27", "32"], answer: "27" },
  { id: 3, question: "LEVEL UP: Qual é o dobro de 34?", options: ["68", "74", "64", "78"], answer: "68" },
];

// --- VARIANTES DE ANIMAÇÃO ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Landing = () => {
  // Estados do Minigame
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [gameFinished, setGameFinished] = useState(false);
  const [bossHealth, setBossHealth] = useState(100);
  const [showConfetti, setShowConfetti] = useState(false);

  // Animação de Score
  useEffect(() => {
    if (animatedScore < score) {
      const timer = setTimeout(() => setAnimatedScore(prev => prev + 5), 20);
      return () => clearTimeout(timer);
    }
  }, [score, animatedScore]);

  const handleAnswer = (selected: string) => {
    if (feedback !== "idle") return;
    const isCorrect = selected === DEMO_QUESTIONS[currentQ].answer;
    
    if (isCorrect) {
      setFeedback("correct");
      setScore((prev) => prev + 150);
      setBossHealth((prev) => Math.max(0, prev - 34));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      setFeedback("idle");
      if (currentQ < DEMO_QUESTIONS.length - 1) {
        setCurrentQ((prev) => prev + 1);
      } else {
        setGameFinished(true);
        if(isCorrect && bossHealth <= 34) setBossHealth(0);
      }
    }, 1600);
  };

  const restartDemo = () => {
    setCurrentQ(0);
    setScore(0);
    setAnimatedScore(0);
    setBossHealth(100);
    setGameFinished(false);
    setFeedback("idle");
  };

  return (
    <div className="min-h-screen bg-[#050509] text-slate-50 font-sans selection:bg-purple-500/30 overflow-x-hidden relative">
      
      {/* --- BACKGROUND VIVO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-emerald-600/10 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzI3QjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0i...')] opacity-10" />
      </div>

      {showConfetti && <Confetti numberOfPieces={300} recycle={false} gravity={0.3} colors={['#A855F7', '#10B981', '#F59E0B', '#3B82F6']} style={{ zIndex: 100 }} />}

      {/* --- NAVBAR --- */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-[#050509]/80 backdrop-blur-md border-b border-slate-800/50 shadow-lg"
      >
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 flex items-center gap-2.5 group cursor-pointer"
          >
            <Gamepad2 className="w-8 h-8 text-purple-400 group-hover:rotate-[-15deg] transition-transform duration-300" />
            STUDY_QUEST
          </motion.span>
          <div className="hidden md:flex gap-8 text-sm font-bold tracking-wider text-slate-300">
            <a href="#classes" className="hover:text-emerald-400 transition-colors">REINOS</a>
            <a href="#loot" className="hover:text-purple-400 transition-colors">RECOMPENSAS</a>
            <a href="#guilds" className="hover:text-blue-400 transition-colors">GUILDAS</a>
          </div>
          <Link to="/auth">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="rounded-full px-6 md:px-8 font-bold border-slate-700 hover:bg-emerald-500/10 hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300 uppercase text-xs tracking-widest">
                Login / Start
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <motion.section 
        initial="hidden" animate="visible" variants={fadeInUp}
        className="relative pt-48 pb-20 px-6 flex flex-col items-center text-center z-10"
      >
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900/80 backdrop-blur-sm border-2 border-slate-800 text-emerald-400 text-sm font-bold mb-8 shadow-[0_0_30px_rgba(52,211,153,0.15)]"
          >
            <Zap className="w-5 h-5 animate-pulse" /> Servidor Online - Season 1
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-100 leading-[0.9] max-w-6xl uppercase tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Estudar virou <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 animate-gradient-x p-2">
              GAMEPLAY
            </span>
          </h1>
          
          <p className="mt-8 text-lg md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed">
            Esqueça as apostilas chatas. Derrote os chefões das matérias escolares, farme XP real, suba de elo e desbloqueie recompensas lendárias.
          </p>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-14">
            <Link to="/auth">
              <Button className="rounded-full px-12 md:px-16 py-8 md:py-9 text-xl md:text-2xl font-black bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_50px_rgba(147,51,234,0.5)] transition-all duration-300 uppercase tracking-wider group">
                Criar Personagem <ChevronRight className="ml-2 w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* --- STATS BAR (PROVA SOCIAL) --- */}
      <div className="w-full bg-slate-900/50 border-y border-slate-800 backdrop-blur-sm relative z-20 py-8 mb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
          <div className="flex flex-col items-center">
            <Users className="w-8 h-8 text-blue-400 mb-2" />
            <span className="text-3xl font-black text-slate-100">10k+</span>
            <span className="text-xs text-slate-500 font-bold tracking-widest uppercase">Jogadores Ativos</span>
          </div>
          <div className="flex flex-col items-center">
            <Swords className="w-8 h-8 text-rose-400 mb-2" />
            <span className="text-3xl font-black text-slate-100">2.5M</span>
            <span className="text-xs text-slate-500 font-bold tracking-widest uppercase">Missões Concluídas</span>
          </div>
          <div className="flex flex-col items-center">
            <Flame className="w-8 h-8 text-orange-400 mb-2" />
            <span className="text-3xl font-black text-slate-100">98%</span>
            <span className="text-xs text-slate-500 font-bold tracking-widest uppercase">Melhora nas Notas</span>
          </div>
          <div className="flex flex-col items-center">
            <Trophy className="w-8 h-8 text-amber-400 mb-2" />
            <span className="text-3xl font-black text-slate-100">50+</span>
            <span className="text-xs text-slate-500 font-bold tracking-widest uppercase">Escolas Parceiras</span>
          </div>
        </div>
      </div>

      {/* --- BOSS BATTLE DEMO --- */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
        className="relative z-20 max-w-5xl mx-auto px-6 pb-32"
      >
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-emerald-400 tracking-[0.3em] uppercase mb-3">Zona de Tutorial</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase text-slate-100">Teste suas Habilidades</h3>
        </div>

        <div className="bg-slate-900 border-4 border-slate-800 rounded-3xl p-1.5 shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-500 opacity-20 blur-xl group-hover:opacity-60 transition-opacity duration-700 rounded-3xl" />
          
          <div className="bg-[#080810] rounded-[1.2rem] p-6 md:p-14 relative z-10 border border-slate-800">
            {/* Header HUD */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b-2 border-slate-800 pb-8">
              <div className="flex items-center gap-4">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                   <Brain className="text-purple-400 w-10 h-10 md:w-12 md:h-12" />
                </motion.div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight flex items-center gap-2">Boss Battle</h2>
                  <p className="text-slate-500 font-mono text-xs md:text-sm">Target: Matemática Básica</p>
                </div>
              </div>
              
              {/* Barra de Vida */}
              <div className="w-full md:w-64 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-mono text-emerald-400">
                  <span>MAT_BOSS.exe</span>
                  <span>{bossHealth}/100 HP</span>
                </div>
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                    animate={{ width: `${bossHealth}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* XP */}
              <div className="flex items-center gap-3 bg-slate-900 px-4 md:px-6 py-3 rounded-2xl border-2 border-slate-800">
                <Trophy className="text-amber-400 w-6 h-6" />
                <span className="font-mono text-2xl md:text-3xl font-black text-amber-400 tabular-nums">
                  {animatedScore.toString().padStart(4, '0')} <span className="text-xs text-amber-500/70">XP</span>
                </span>
              </div>
            </div>

            {/* Quiz Body */}
            <AnimatePresence mode="wait">
              {!gameFinished ? (
                <motion.div 
                  key={currentQ} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-slate-600 font-mono mb-3 text-sm tracking-widest uppercase">WAVE {currentQ + 1} / {DEMO_QUESTIONS.length}</span>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-10 text-center leading-tight tracking-tight text-slate-100 p-2 bg-slate-900/30 rounded-xl">
                    {DEMO_QUESTIONS[currentQ].question}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
                    {DEMO_QUESTIONS[currentQ].options.map((opt, idx) => {
                      let btnClasses = "text-xl md:text-2xl font-bold py-6 md:py-8 rounded-2xl border-4 transition-all duration-200 shadow-lg relative overflow-hidden group ";
                      if (feedback === "idle") {
                        btnClasses += "bg-slate-900 border-slate-800 text-slate-300 hover:border-purple-500 hover:bg-slate-800 hover:text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]";
                      } else {
                        if (opt === DEMO_QUESTIONS[currentQ].answer) {
                          btnClasses += "bg-emerald-950/50 border-emerald-500 text-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.5)] animate-pulse";
                        } else if (feedback === "wrong") {
                          btnClasses += "bg-slate-900 border-slate-900 opacity-40 scale-95";
                        }
                      }

                      return (
                        <motion.button
                          key={idx} onClick={() => handleAnswer(opt)} disabled={feedback !== "idle"}
                          whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.94, y: 2 }}
                          className={btnClasses}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="h-10 mt-8 flex items-center justify-center font-bold text-lg tracking-wide">
                    {feedback === "correct" && <span className="text-emerald-400 animate-bounce flex items-center gap-2.5"><Sparkles className="w-6 h-6"/> CRÍTICO! +150 XP</span>}
                    {feedback === "wrong" && <span className="text-rose-500 animate-shake">MISS! Tente focar no próximo alvo...</span>}
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 100 }} className="flex flex-col items-center py-12 text-center">
                  <motion.div animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 1 }}>
                    <Trophy className="w-24 h-24 md:w-28 md:h-28 text-amber-400 mb-8 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
                  </motion.div>
                  <h3 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                    VITÓRIA!
                  </h3>
                  <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-lg">O boss foi derrotado. Você coletou <span className="text-amber-400 font-bold tabular-nums">{score} XP</span>.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
                    <Button onClick={restartDemo} variant="outline" className="border-slate-700 text-slate-300 hover:text-white rounded-full px-8 py-6 text-lg font-bold w-full sm:w-auto h-auto">
                      Jogar Novamente
                    </Button>
                    <Link to="/auth" className="w-full sm:w-auto">
                      <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all uppercase w-full h-auto">
                        Salvar XP na Conta <Zap className="ml-2 w-5 h-5"/>
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* --- REINOS (MATÉRIAS) --- */}
      <motion.section id="classes" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-400 tracking-[0.3em] uppercase mb-3">Escolha seu Mapa</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase text-slate-100 flex justify-center items-center gap-4">
            <Compass className="text-blue-400 w-10 h-10" /> Explore os Reinos
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RealmCard title="Cavernas de Lógica" subject="Matemática" icon={<Brain />} color="bg-emerald-500" borderColor="border-emerald-500/50" />
          <RealmCard title="Ruínas do Tempo" subject="História" icon={<Scroll />} color="bg-amber-500" borderColor="border-amber-500/50" />
          <RealmCard title="Laboratório Tóxico" subject="Química" icon={<Zap />} color="bg-purple-500" borderColor="border-purple-500/50" />
          <RealmCard title="Torre de Babel" subject="Idiomas" icon={<Target />} color="bg-blue-500" borderColor="border-blue-500/50" />
        </div>
      </motion.section>

      {/* --- SISTEMA DE LOOT & RECOMPENSAS --- */}
      <motion.section id="loot" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} className="bg-slate-900/30 border-y border-slate-800/50 py-32 relative z-10 mb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-amber-400 tracking-[0.3em] uppercase mb-3">Sistema de Progressão</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase text-slate-100 mb-6 leading-tight">
              Farme itens e mostre seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Valor</span>
            </h3>
            <p className="text-xl text-slate-400 mb-8">
              Estudar não precisa ser em vão. Cada acerto gera XP e Coins. Use suas Coins na loja do jogo para comprar avatares exclusivos, bordas animadas e multiplicadores de XP.
            </p>
            <ul className="space-y-4 font-bold text-slate-300">
              <li className="flex items-center gap-3"><Gem className="text-purple-400"/> Skins de Perfil Lendárias</li>
              <li className="flex items-center gap-3"><Crown className="text-amber-400"/> Suba de Elo (Bronze ao Radiante)</li>
              <li className="flex items-center gap-3"><Flame className="text-orange-400"/> Sistema de Ofensiva (Streaks)</li>
            </ul>
          </div>
          <div className="relative">
            {/* Imagem Placeholder Criativa com CSS */}
            <div className="w-full aspect-square md:aspect-video lg:aspect-square bg-[#080810] rounded-3xl border-2 border-slate-800 flex items-center justify-center p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-500/10" />
              <div className="grid grid-cols-2 gap-4 w-full h-full relative z-10">
                <div className="bg-slate-900/80 rounded-2xl border border-slate-700 flex flex-col items-center justify-center p-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-1 mb-2">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center"><Crown className="text-amber-400"/></div>
                  </div>
                  <span className="font-bold text-sm text-amber-400">Elo: Ouro III</span>
                </div>
                <div className="bg-slate-900/80 rounded-2xl border border-purple-500/50 flex flex-col items-center justify-center p-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <Gem className="w-12 h-12 text-purple-400 mb-2 animate-pulse" />
                  <span className="font-bold text-sm text-purple-400">Baú Épico</span>
                </div>
                <div className="bg-slate-900/80 rounded-2xl border border-slate-700 flex flex-col items-center justify-center p-4 col-span-2">
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-bold text-sm">Passe de Batalha</span>
                    <span className="font-bold text-xs text-emerald-400">Nível 42</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden"><div className="w-[75%] h-full bg-emerald-500"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- SKILL TREE (HOW IT WORKS) --- */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="max-w-6xl mx-auto px-6 pb-40 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold text-purple-400 tracking-[0.3em] uppercase mb-3">Tutorial</h2>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black uppercase tracking-wider flex justify-center items-center gap-4 text-slate-100">
            Sua Árvore de Evolução
          </motion.h2>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 hidden md:block z-0" />
          <SkillNode step="LVL 1" icon={<Target className="w-8 h-8 text-emerald-400" />} title="Aceitar Missões" desc="Selecione matérias do seu ano letivo. Conteúdo dividido em fases pequenas para foco total." color="border-emerald-500" bgColor="bg-emerald-500/10" />
          <SkillNode step="LVL 5" icon={<Swords className="w-8 h-8 text-purple-400" />} title="Combate Direto" desc="Enfrente quizzes e mini-provas. Se errar, o jogo fornece poções de sabedoria (dicas visuais)." color="border-purple-500" bgColor="bg-purple-500/10" />
          <SkillNode step="MAX" icon={<Users className="w-8 h-8 text-blue-400" />} title="Formar Guildas" desc="Convide amigos da escola, criem uma guilda e compitam no ranking nacional pelo Top 1." color="border-blue-500" bgColor="bg-blue-500/10" />
        </div>
      </motion.section>

      {/* --- FINAL CTA (O Boss Final) --- */}
      <section className="relative py-32 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 bg-slate-900/80 p-12 md:p-20 rounded-[3rem] border-2 border-slate-800 backdrop-blur-xl shadow-[0_0_100px_rgba(147,51,234,0.15)]">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 text-slate-100">Pronto para o <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Desafio?</span></h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Sua jornada acadêmica está prestes a ficar muito mais interessante. O servidor está te aguardando.</p>
          <Link to="/auth">
            <Button className="rounded-full px-12 py-8 text-xl font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-300 uppercase tracking-widest hover:scale-105">
              Criar Conta Grátis
            </Button>
          </Link>
          <p className="mt-6 text-sm text-slate-500 font-bold uppercase tracking-widest">Sem cartão de crédito. É só dar Start.</p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#030305] border-t border-slate-800/50 pt-20 pb-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 flex items-center gap-2 mb-6">
              <Gamepad2 className="w-6 h-6 text-purple-400" /> STUDY_QUEST
            </span>
            <p className="text-slate-500 max-w-sm mb-6">A primeira plataforma de educação 100% gamificada do Brasil. Desenvolvida por gamers, para estudantes.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Disc size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Github size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-slate-100 font-bold uppercase tracking-widest mb-6 text-sm">Navegação</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Reinos (Matérias)</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Passe de Batalha</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Leaderboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-100 font-bold uppercase tracking-widest mb-6 text-sm">Suporte</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Patch Notes</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Discord Oficial</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-bold tracking-widest uppercase">
          <p>© 2026 Study Quest. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">Crafted with <HeartPulse className="w-3 h-3 text-rose-500" /> in Brazil</p>
        </div>
      </footer>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const RealmCard = ({ title, subject, icon, color, borderColor }: { title: string, subject: string, icon: React.ReactNode, color: string, borderColor: string }) => (
  <motion.div whileHover={{ y: -8 }} className={`bg-[#080810] border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-${color.replace('bg-', '')} transition-colors duration-300`}>
    <div className={`absolute top-0 left-0 w-full h-1 ${color} opacity-50 group-hover:opacity-100 transition-opacity`} />
    <div className={`w-14 h-14 rounded-2xl ${color}/10 flex items-center justify-center mb-6 text-${color.replace('bg-', '')} border border-${borderColor}`}>
      {React.cloneElement(icon as React.ReactElement, { className: "w-7 h-7" })}
    </div>
    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">{subject}</span>
    <h4 className="text-xl font-bold text-slate-100">{title}</h4>
  </motion.div>
);

const SkillNode = ({ step, icon, title, desc, color, bgColor }: { step: string, icon: React.ReactNode, title: string, desc: string, color: string, bgColor: string }) => (
  <motion.div 
    variants={fadeInUp}
    whileHover={{ y: -10, scale: 1.03 }}
    className={`relative z-10 p-8 md:p-10 bg-[#080810] border-2 ${color} rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center text-center group`}
  >
    <div className={`absolute -top-5 bg-[#050509] border-2 ${color} px-6 py-2 rounded-full font-mono font-black text-sm shadow-md`}>
      {step}
    </div>
    <div className={`rounded-full p-6 ${bgColor} border-2 ${color}/20 mb-8 mt-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-slate-100 tracking-tight">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm md:text-base">{desc}</p>
    <div className={`absolute inset-0 rounded-[2rem] border-4 ${color} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none`}/>
  </motion.div>
);

export default Landing;