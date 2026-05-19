import { Link } from "react-router-dom";
import { useGame } from "@/contexts/GameContext";
import { ArrowLeft, Lock, Trophy, Flame, Star, Zap, ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";

const Profile = () => {
  const { user, badges } = useGame();

  // Animação em cascata para as cartas de conquista
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#070714] text-white relative overflow-x-hidden font-sans selection:bg-purple-500/30 pb-20">
      
      {/* --- FUNDO ANIMADO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[150px] rounded-full" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 12, repeat: Infinity }} className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full" />
      </div>

      {/* --- HEADER (BOTÃO VOLTAR) --- */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 pt-8 mb-4">
        <Link to="/dashboard">
          <motion.div whileHover={{ scale: 1.05, x: -5 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-3 bg-[#13132B] border-4 border-slate-700/50 hover:border-purple-500 px-6 py-3 rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-[0_5px_0_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all">
            <ArrowLeft className="w-5 h-5" strokeWidth={3} /> Base Secreta
          </motion.div>
        </Link>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        
        {/* =========================================
            PLAYER CARD (CARTÃO DO JOGADOR)
        ========================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring" }}
          className="rounded-[2.5rem] bg-[#13132B] border-4 border-slate-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden mb-12 relative"
        >
          {/* Banner Decorativo no Topo */}
          <div className="h-32 md:h-40 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay" />
            <motion.div animate={{ x: [-100, 1000] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }} className="absolute top-0 bottom-0 w-20 bg-white/30 skew-x-[45deg] blur-md" />
          </div>

          <div className="px-6 pb-10 pt-0 relative flex flex-col items-center text-center">
            
            {/* Avatar Gigante sobreposto ao banner */}
            <div className="relative -mt-16 md:-mt-20 mb-6 group cursor-pointer">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#070714] to-slate-900 rounded-[2rem] p-2 shadow-2xl flex items-center justify-center text-6xl md:text-7xl border-8 border-[#13132B] group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-slate-800 rounded-[1.2rem] flex items-center justify-center border-2 border-slate-700">
                  {user?.avatar || "🦊"}
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-400 text-[#070714] text-sm md:text-base font-black px-6 py-1.5 rounded-full border-4 border-[#13132B] shadow-lg whitespace-nowrap flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#070714]" /> LVL {user?.level || 1}
              </div>
            </div>

            {/* Nome e Título */}
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-md mb-2">
              {user?.name || "Herói Desconhecido"}
            </h1>
            <p className="text-amber-400 font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2 mb-8 bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20">
              <ShieldCheck className="w-4 h-4" /> Conta Verificada
            </p>

            {/* Status Rápidos (Estatísticas do Jogador) */}
            <div className="w-full grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#070714] border-2 border-slate-700/50 rounded-3xl p-4 flex flex-col items-center justify-center shadow-inner">
                <Flame className="w-8 h-8 text-orange-500 mb-1" fill="currentColor" />
                <span className="text-2xl font-black text-white">3 Dias</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ofensiva</span>
              </div>
              <div className="bg-[#070714] border-2 border-slate-700/50 rounded-3xl p-4 flex flex-col items-center justify-center shadow-inner">
                <Trophy className="w-8 h-8 text-amber-400 mb-1" fill="currentColor" />
                <span className="text-2xl font-black text-white">12</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Fases Vencidas</span>
              </div>
            </div>

            {/* Barra de XP Gigante */}
            <div className="w-full bg-[#070714] border-4 border-slate-700/50 rounded-3xl p-4 md:p-6 shadow-inner relative overflow-hidden">
              <div className="flex justify-between text-xs md:text-sm font-black text-slate-300 uppercase tracking-widest mb-3">
                <span className="flex items-center gap-2 text-cyan-400"><Zap className="w-5 h-5" fill="currentColor"/> Experiência Global</span>
                <span className="bg-[#13132B] px-3 py-1 rounded-full border border-slate-700">{user?.xp || 0} / {user?.maxXp || 100}</span>
              </div>
              <div className="h-6 md:h-8 w-full bg-[#13132B] rounded-full p-1.5 relative overflow-hidden shadow-inner border border-slate-800">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${((user?.xp || 0) / (user?.maxXp || 100)) * 100}%` }} transition={{ duration: 1.5, type: "spring" }}
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full relative"
                >
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/30 rounded-full" />
                </motion.div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* =========================================
            SALA DE TROFÉUS (BADGES)
        ========================================== */}
        <div className="mb-10 text-center md:text-left flex items-center justify-center md:justify-start gap-4">
          <div className="w-12 h-12 bg-amber-400/20 rounded-2xl flex items-center justify-center border border-amber-400/50">
            <Trophy className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter drop-shadow-md">
            Sala de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Troféus</span>
          </h2>
        </div>

        <motion.div 
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {badges?.map((badge: any, index: number) => (
            <motion.div
              key={badge.id || index}
              variants={cardVariants}
              whileHover={badge.unlocked ? { y: -10, scale: 1.05 } : {}}
              className={`
                relative rounded-[2rem] p-6 text-center shadow-lg transition-all duration-300 border-4 flex flex-col items-center justify-center min-h-[180px]
                ${badge.unlocked
                  ? "bg-[#13132B] border-slate-700/50 hover:border-amber-400/50 hover:shadow-[0_15px_30px_rgba(251,191,36,0.2)] cursor-pointer overflow-hidden"
                  : "bg-[#070714] border-slate-800 opacity-70 grayscale cursor-not-allowed"
                }
              `}
            >
              {/* Efeito de brilho de fundo se desbloqueado */}
              {badge.unlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-purple-600/5 pointer-events-none" />
              )}

              {/* ÍCONE DO TROFÉU */}
              <div className={`text-5xl md:text-6xl mb-4 relative z-10 ${badge.unlocked ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "opacity-50"}`}>
                {badge.unlocked ? (
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                    {badge.icon || "🏅"}
                  </motion.div>
                ) : (
                  <div className="relative">
                    <div className="blur-sm opacity-50">{badge.icon || "🏅"}</div>
                    <Lock className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500 drop-shadow-xl" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* TEXTOS */}
              <div className="relative z-10">
                <p className={`font-black text-sm md:text-base uppercase tracking-tight leading-tight mb-2 ${badge.unlocked ? "text-white" : "text-slate-500"}`}>
                  {badge.name || "Conquista Oculta"}
                </p>
                <p className={`text-[10px] font-bold uppercase tracking-widest leading-snug ${badge.unlocked ? "text-slate-400" : "text-slate-600"}`}>
                  {badge.description || "Continue jogando para revelar."}
                </p>
              </div>

              {/* Faixa de "Novo!" (Exemplo condicional visual) */}
              {badge.unlocked && index === 0 && (
                <div className="absolute top-4 -right-8 bg-pink-500 text-white text-[9px] font-black uppercase tracking-widest px-8 py-1 rotate-45 shadow-md">
                  Recente
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;