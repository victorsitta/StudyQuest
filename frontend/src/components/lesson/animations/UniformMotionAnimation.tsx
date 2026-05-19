import { motion } from "framer-motion";

export function UniformMotionAnimation() {
  // MU: pontos igualmente espaçados
  const muPositions = [0, 16.6, 33.3, 50, 66.6, 83.3, 100];
  // MUV: espaços crescentes
  const muvPositions = [0, 5, 13, 25, 41, 62, 88];

  return (
    <div className="w-full rounded-2xl bg-[#0d0d20] border border-slate-700/40 p-6 space-y-6">
      {/* MU */}
      <div>
        <p className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-wider">
          Movimento Uniforme (MU) — espaços iguais
        </p>
        <div className="relative h-8">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700" />
          {muPositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 border-2 border-cyan-300"
              style={{ left: `${pos}%`, marginLeft: "-8px" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15, duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
            />
          ))}
        </div>
      </div>

      {/* MUV */}
      <div>
        <p className="text-xs font-bold text-amber-400 mb-3 uppercase tracking-wider">
          Movimento Variado (MUV) — espaços crescentes
        </p>
        <div className="relative h-8">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700" />
          {muvPositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400 border-2 border-amber-300"
              style={{ left: `${pos}%`, marginLeft: "-8px" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15, duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
