import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, Mail, Lock, User, Star, Zap, 
  Sparkles, ArrowRight, Github, Trophy, Hexagon
} from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useGame();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate("/dashboard");
  };

  // Variantes para o efeito de mola (Bounce) amigável para crianças
  const bounceTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20
  };

  return (
    <div className="min-h-screen bg-[#0A0A1A] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      
      {/* --- EFEITOS DE FUNDO DIVERTIDOS (ATENÇÃO DA CRIANÇA) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Orbes coloridos gigantes no fundo */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/30 blur-[150px] rounded-full" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/30 blur-[150px] rounded-full" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-500/20 blur-[120px] rounded-full" />

        {/* Ícones flutuantes (Boiando pela tela) */}
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[10%] text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
          <Star className="w-16 h-16 md:w-24 md:h-24" fill="currentColor" />
        </motion.div>
        
        <motion.div animate={{ y: [0, 40, 0], rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute bottom-[20%] left-[15%] text-purple-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">
          <Hexagon className="w-12 h-12 md:w-20 md:h-20" fill="currentColor" />
        </motion.div>

        <motion.div animate={{ y: [0, -40, 0], rotate: [0, -15, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[25%] right-[10%] text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]">
          <Zap className="w-16 h-16 md:w-24 md:h-24" fill="currentColor" />
        </motion.div>

        <motion.div animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[15%] right-[12%] text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.8)]">
          <Trophy className="w-14 h-14 md:w-20 md:h-20" fill="currentColor" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={bounceTransition}
        className="w-full max-w-[500px] z-10"
      >
        {/* LOGO GIGANTE E DIVERTIDA */}
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="inline-flex items-center justify-center w-28 h-28 rounded-[2rem] bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 p-1 mb-6 shadow-[0_15px_40px_rgba(217,70,239,0.4)] cursor-pointer"
          >
            <div className="w-full h-full bg-[#0A0A1A] rounded-[1.8rem] flex items-center justify-center border-4 border-[#0A0A1A]">
              <Gamepad2 className="w-16 h-16 text-white animate-pulse" />
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase drop-shadow-lg">
            Study<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Quest</span>
          </h1>
          <p className="text-slate-300 font-bold mt-3 text-sm md:text-base uppercase tracking-widest bg-white/10 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            Dê o Start na sua Aventura! 🚀
          </p>
        </div>

        {/* CARD PRINCIPAL (Mais gordinho e legível) */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-emerald-500 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-60 transition duration-500 animate-gradient-x" />
          
          <div className="relative rounded-[2rem] bg-[#12122A]/90 backdrop-blur-2xl border-4 border-white/10 p-6 md:p-10 shadow-2xl">
            <Tabs defaultValue="login" className="w-full">
              
              {/* ABAS GIGANTES E FÁCEIS DE CLICAR */}
              <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-[#0A0A1A] p-2 mb-10 border border-white/5 h-auto">
                <TabsTrigger 
                  value="login" 
                  className="rounded-xl py-4 font-black uppercase text-sm md:text-base tracking-widest data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all data-[state=active]:shadow-[0_0_20px_rgba(147,51,234,0.5)] text-slate-400"
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="rounded-xl py-4 font-black uppercase text-sm md:text-base tracking-widest data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all data-[state=active]:shadow-[0_0_20px_rgba(16,185,129,0.5)] text-slate-400"
                >
                  Criar Conta
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="login">
                  <motion.form 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSubmit} className="space-y-6"
                  >
                    {/* CAMPOS DE TEXTO MAIORES */}
                    <div className="space-y-3">
                      <Label className="text-slate-300 ml-2 text-sm md:text-base font-black uppercase tracking-wider flex items-center gap-2">
                        <Mail className="w-5 h-5 text-purple-400"/> E-mail do Jogador
                      </Label>
                      <Input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#0A0A1A] border-2 border-slate-700/50 rounded-2xl h-16 px-6 text-lg md:text-xl font-bold text-white focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all placeholder:text-slate-600"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-slate-300 ml-2 text-sm md:text-base font-black uppercase tracking-wider flex items-center gap-2">
                          <Lock className="w-5 h-5 text-purple-400"/> Senha Secreta
                        </Label>
                        <button type="button" className="text-xs md:text-sm uppercase font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full">Esqueci</button>
                      </div>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#0A0A1A] border-2 border-slate-700/50 rounded-2xl h-16 px-6 text-lg md:text-xl font-bold text-white focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all placeholder:text-slate-600"
                      />
                    </div>

                    {/* BOTÃO CHUNKY (Gordinho) */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="pt-4">
                      <Button type="submit" className="w-full rounded-2xl h-16 text-lg md:text-xl font-black uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-[0_10px_30px_rgba(217,70,239,0.4)] border-b-4 border-purple-800 active:border-b-0 active:translate-y-1 transition-all">
                        Dar Start <ArrowRight className="ml-3 w-6 h-6" />
                      </Button>
                    </motion.div>
                  </motion.form>
                </TabsContent>

                {/* FORM DE CADASTRO */}
                <TabsContent value="register">
                  <motion.form 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit} className="space-y-6"
                  >
                    <div className="space-y-3">
                      <Label className="text-slate-300 ml-2 text-sm md:text-base font-black uppercase tracking-wider flex items-center gap-2">
                        <User className="w-5 h-5 text-emerald-400"/> Nome do Herói
                      </Label>
                      <Input
                        placeholder="Como quer ser chamado?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#0A0A1A] border-2 border-slate-700/50 rounded-2xl h-16 px-6 text-lg md:text-xl font-bold text-white focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all placeholder:text-slate-600"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-slate-300 ml-2 text-sm md:text-base font-black uppercase tracking-wider flex items-center gap-2">
                        <Mail className="w-5 h-5 text-emerald-400"/> E-mail
                      </Label>
                      <Input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#0A0A1A] border-2 border-slate-700/50 rounded-2xl h-16 px-6 text-lg md:text-xl font-bold text-white focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all placeholder:text-slate-600"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-slate-300 ml-2 text-sm md:text-base font-black uppercase tracking-wider flex items-center gap-2">
                        <Lock className="w-5 h-5 text-emerald-400"/> Criar Senha
                      </Label>
                      <Input
                        type="password"
                        placeholder="Crie uma senha forte"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#0A0A1A] border-2 border-slate-700/50 rounded-2xl h-16 px-6 text-lg md:text-xl font-bold text-white focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all placeholder:text-slate-600"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="pt-4">
                      <Button type="submit" className="w-full rounded-2xl h-16 text-lg md:text-xl font-black uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white shadow-[0_10px_30px_rgba(16,185,129,0.4)] border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all">
                        Criar Personagem <Sparkles className="ml-3 w-6 h-6" />
                      </Button>
                    </motion.div>
                  </motion.form>
                </TabsContent>
              </AnimatePresence>
            </Tabs>

            {/* SEÇÃO SOCIAL EXTRA */}
            <div className="relative mt-10 mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-white/10"></div></div>
              <div className="relative flex justify-center text-xs md:text-sm uppercase font-black tracking-widest">
                <span className="bg-[#12122A] px-4 text-slate-400">Ou jogue com</span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="w-full rounded-2xl h-14 border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-base md:text-lg transition-all">
                <Github className="mr-3 w-6 h-6" /> Entrar com GitHub
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;