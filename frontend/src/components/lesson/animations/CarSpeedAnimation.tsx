import { motion } from "framer-motion";

export function CarSpeedAnimation() {
  return (
    <div className="w-full rounded-2xl bg-[#0d0d20] border border-slate-700/40 p-6 overflow-hidden">
      <div className="relative h-28">
        {/* Estrada */}
        <div className="absolute bottom-4 left-0 right-0 h-1 bg-slate-600 rounded-full" />
        {/* Marcações da estrada */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-3.5 h-3 w-6 bg-slate-500 rounded-sm"
            style={{ left: `${i * 25}%` }}
            animate={{ x: [0, -200] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
          />
        ))}
        {/* Carro lento */}
        <motion.div
          className="absolute bottom-5 text-3xl"
          animate={{ x: [0, 120, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ left: "5%" }}
        >
          🚗
        </motion.div>
        {/* Carro rápido */}
        <motion.div
          className="absolute bottom-12 text-3xl"
          animate={{ x: [0, 240, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ left: "5%" }}
        >
          🏎️
        </motion.div>
        {/* Labels */}
        <div className="absolute top-0 right-4 flex flex-col gap-1 text-right">
          <span className="text-xs text-cyan-400 font-bold">🏎️ Rápido — percorre mais</span>
          <span className="text-xs text-slate-400 font-bold">🚗 Devagar — percorre menos</span>
        </div>
      </div>
    </div>
  );
}
