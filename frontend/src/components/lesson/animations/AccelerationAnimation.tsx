import { motion } from "framer-motion";

export function AccelerationAnimation() {
  return (
    <div className="w-full rounded-2xl bg-[#0d0d20] border border-slate-700/40 p-6 space-y-5">
      {/* Aceleração */}
      <div>
        <p className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">
          Aceleração — velocidade aumenta ↑
        </p>
        <div className="relative h-10 flex items-center">
          <motion.div
            className="text-2xl absolute"
            animate={{ x: [0, 260] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeIn", repeatDelay: 0.5 }}
          >
            🚗
          </motion.div>
          {/* Seta de velocidade crescente */}
          <motion.div
            className="absolute right-0 flex items-center gap-1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="h-1 bg-emerald-400 rounded-full" style={{ width: "80px" }} />
            <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-emerald-400" />
          </motion.div>
        </div>
      </div>

      {/* Frenagem */}
      <div>
        <p className="text-xs font-bold text-rose-400 mb-2 uppercase tracking-wider">
          Frenagem — velocidade diminui ↓
        </p>
        <div className="relative h-10 flex items-center">
          <motion.div
            className="text-2xl absolute"
            animate={{ x: [260, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", repeatDelay: 0.5 }}
          >
            🚗
          </motion.div>
          <motion.div
            className="absolute left-0 flex items-center gap-1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-rose-400" />
            <div className="h-1 bg-rose-400 rounded-full" style={{ width: "80px" }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
