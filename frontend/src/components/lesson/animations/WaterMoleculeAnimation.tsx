import { motion } from "framer-motion";

export function WaterMoleculeAnimation() {
  return (
    <div className="w-full rounded-2xl bg-[#0d0d20] border border-slate-700/40 p-6 flex flex-col items-center gap-6">
      {/* Molécula */}
      <div className="relative flex items-center justify-center w-64 h-40">
        {/* Ligações */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 160">
          <line x1="128" y1="80" x2="72" y2="120" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6,3" />
          <line x1="128" y1="80" x2="184" y2="120" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6,3" />
        </svg>

        {/* Oxigênio */}
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex flex-col items-center justify-center text-white font-black shadow-[0_0_25px_rgba(239,68,68,0.4)] z-10"
          style={{ top: "10px", left: "50%", transform: "translateX(-50%)" }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="text-2xl">O</span>
          <span className="text-[10px] opacity-70">Oxigênio</span>
        </motion.div>

        {/* Hidrogênio esquerdo */}
        <motion.div
          className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex flex-col items-center justify-center text-white font-black shadow-[0_0_15px_rgba(59,130,246,0.4)] z-10"
          style={{ bottom: "10px", left: "30px" }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <span className="text-xl">H</span>
          <span className="text-[9px] opacity-70">Hidrog.</span>
        </motion.div>

        {/* Hidrogênio direito */}
        <motion.div
          className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex flex-col items-center justify-center text-white font-black shadow-[0_0_15px_rgba(59,130,246,0.4)] z-10"
          style={{ bottom: "10px", right: "30px" }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <span className="text-xl">H</span>
          <span className="text-[9px] opacity-70">Hidrog.</span>
        </motion.div>
      </div>

      {/* Fórmula */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl px-8 py-3 text-center">
        <p className="text-3xl font-black text-white">H₂O</p>
        <p className="text-xs text-slate-400 mt-1">2 Hidrogênios + 1 Oxigênio</p>
      </div>
    </div>
  );
}
