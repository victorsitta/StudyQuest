import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Play, Star, Zap, Crown, Rocket, Sparkles, Brain, Scroll, FlaskConical, Globe } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useGame(); // Não precisamos mais do 'phases' vindo do context se vamos fixá-los aqui
  const navigate = useNavigate();
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 👇 DEFINIÇÃO CLARA DOS JOGOS E SUAS ROTAS 👇
  // Aqui você define exatamente o visual, o conteúdo e a ROTA de cada card.
  const activePhases = [
    { 
      id: 1, 
      title: "Treinamento de Newton", 
      subject: "Física - Dinâmica", 
      icon: <Rocket />, // Atualizado para combinar com Física
      color: "from-blue-600 to-cyan-400", 
      shadow: "shadow-cyan-500/50",
      route: "/newton" // Rota específica para este jogo
    },
    { 
      id: 2, 
      title: "Atividades Esportivas", 
      subject: "Física - Esportes", 
      icon: <Scroll />, 
      color: "from-amber-500 to-orange-400", 
      shadow: "shadow-orange-500/50",
      route: "/sports" // Rota específica (você precisa criar essa rota no App.tsx)
    },
    // { 
    //   id: 3, 
    //   title: "Caverna da Lógica", 
    //   subject: "Matemática", 
    //   icon: <Brain />, 
    //   color: "from-pink-500 to-purple-500", 
    //   shadow: "shadow-pink-500/50",
    //   route: "/caverna-logica" // Rota específica (você precisa criar essa rota no App.tsx)
    // },
  ];

  return (
    <div className="min-h-screen bg-[#070714] text-white overflow-hidden relative font-sans selection:bg-pink-500/30">
      
      {/* FUNDO INTERATIVO */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen" />
        
        <motion.div 
          animate={{ x: mousePos.x * -20, y: mousePos.y * -20 }} 
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute inset-0"
        >
          <div className="absolute top-[10%] left-[20%] w-[40rem] h-[40rem] bg-purple-900/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-blue-900/20 blur-[120px] rounded-full" />
        </motion.div>

        <motion.div 
          animate={{ x: mousePos.x * -60, y: mousePos.y * -60 }} 
          transition={{ type: "spring", stiffness: 70, damping: 25 }}
          className="absolute inset-0"
        >
          <Star className="absolute top-[15%] right-[25%] w-12 h-12 text-amber-300/40 animate-pulse" fill="currentColor" />
          <Star className="absolute bottom-[25%] left-[15%] w-8 h-8 text-pink-300/40 animate-pulse delay-1000" fill="currentColor" />
          <Sparkles className="absolute top-[40%] left-[45%] w-16 h-16 text-cyan-300/30" />
        </motion.div>
      </div>

      {/* HUD HEADER */}
      <div className="relative z-50 pt-6 px-6 md:px-10">
        <div className="max-w-7xl mx-auto bg-[#13132B]/80 backdrop-blur-xl border-4 border-slate-700/50 rounded-[2.5rem] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-1 shadow-lg flex items-center justify-center text-4xl md:text-5xl border-4 border-[#070714] group-hover:scale-105 transition-transform">
                {user?.avatar || "👨‍🎓"}
              </div>
              <div className="absolute -bottom-3 -right-3 bg-pink-600 text-white text-sm font-black px-3 py-1 rounded-full border-4 border-[#070714] shadow-md">
                LVL {user?.level || 3}
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="font-black text-white text-xl md:text-2xl uppercase tracking-tighter drop-shadow-md">{user?.name || "ESTUDANTE QUEST"}</p>
              <p className="text-xs text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                <Crown className="w-4 h-4" /> Mestre Supremo
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-[300px] md:max-w-[400px] mx-6 hidden sm:block">
            <div className="flex justify-between text-xs md:text-sm font-black text-slate-300 uppercase tracking-widest mb-2 px-1">
              <span className="flex items-center gap-1.5 text-cyan-400"><Zap className="w-4 h-4" fill="currentColor"/> Poder de EXP</span>
              <span>{user?.xp || 450} / {user?.maxXp || 1000}</span>
            </div>
            <div className="h-6 md:h-8 w-full bg-[#070714] rounded-full p-1.5 border-2 border-slate-700/50 relative overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }} animate={{ width: `${((user?.xp || 450) / (user?.maxXp || 1000)) * 100}%` }} transition={{ duration: 1.5, type: "spring" }}
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
              >
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/30 rounded-full" />
              </motion.div>
            </div>
          </div>

          <Link to="/profile">
            <motion.div whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}>
              <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-800 rounded-[1.5rem] flex items-center justify-center border-b-4 border-slate-900 shadow-xl cursor-pointer text-2xl hover:bg-slate-700 transition-colors">
                ⚙️
              </div>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* ÁREA DOS JOGOS */}
      <div className="relative z-10 px-6 md:px-10 pt-16 pb-32 max-w-[1600px] mx-auto min-h-[80vh] flex flex-col justify-center">
        
        <div className="text-center mb-16">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="inline-block bg-pink-500 text-white font-black uppercase tracking-widest text-sm px-6 py-2 rounded-full mb-4 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            Mundo Aberto Liberado
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-2xl flex items-center justify-center gap-4">
            Escolha seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Destino</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          
          {activePhases.map((phase: any, index: number) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
              className="group relative h-[280px] md:h-[320px] cursor-pointer perspective-1000"
            >
              <div className={`w-full h-full rounded-[2.5rem] bg-[#13132B] border-4 border-slate-700/50 p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 transform-gpu group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-white/20 relative`}>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${phase.color || "from-cyan-600 to-blue-500"} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full`} />

                <motion.div 
                  className={`w-24 h-24 rounded-3xl bg-[#070714] border-4 border-slate-700/50 flex items-center justify-center text-5xl mb-6 shadow-xl relative z-10 transition-transform duration-500 group-hover:-translate-y-6 group-hover:scale-110 group-hover:border-white/30`}
                >
                  <div className={`text-white drop-shadow-lg`}>
                    {phase.icon || <Play />}
                  </div>
                </motion.div>

                <div className="text-center relative z-10 transition-transform duration-500 group-hover:-translate-y-6">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                    {phase.subject}
                  </p>
                </div>

                <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
                  <button
                    onClick={() => {
                      // 👇 AQUI ESTÁ A MÁGICA 👇
                      // Ele vai navegar exatamente para a rota definida no objeto activePhases lá em cima
                      navigate(phase.route);
                    }}
                    className={`w-full py-4 rounded-2xl bg-gradient-to-r ${phase.color || "from-cyan-400 to-blue-500"} text-white font-black uppercase tracking-widest text-lg shadow-[0_8px_0_rgba(0,0,0,0.3)] hover:shadow-[0_4px_0_rgba(0,0,0,0.3)] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all flex items-center justify-center gap-3`}
                  >
                    <Play fill="currentColor" className="w-6 h-6" /> Entrar
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;