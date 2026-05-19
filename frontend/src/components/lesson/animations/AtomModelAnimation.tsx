import { motion } from "framer-motion";

export function AtomModelAnimation() {
  return (
    <div className="w-full rounded-2xl bg-[#0d0d20] border border-slate-700/40 p-6 flex flex-col items-center gap-4">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Órbitas */}
        {[60, 80, 100].map((r, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-slate-600/50"
            style={{ width: r * 2, height: r * 2 }}
          />
        ))}

        {/* Núcleo */}
        <motion.div
          className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-white text-xs font-black shadow-[0_0_20px_rgba(239,68,68,0.5)] z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          núcleo
        </motion.div>

        {/* Elétrons orbitando */}
        {[
          { radius: 60, duration: 2, color: "#3b82f6", startAngle: 0 },
          { radius: 80, duration: 3, color: "#3b82f6", startAngle: 120 },
          { radius: 100, duration: 4, color: "#3b82f6", startAngle: 240 },
        ].map((e, i) => (
          <motion.div
            key={i}
            className="absolute w-5 h-5 rounded-full border-2 border-blue-300 flex items-center justify-center"
            style={{ backgroundColor: e.color + "33" }}
            animate={{
              rotate: [e.startAngle, e.startAngle + 360],
            }}
            transition={{ duration: e.duration, repeat: Infinity, ease: "linear" }}
            transformTemplate={({ rotate }) =>
              `rotate(${rotate}) translateX(${e.radius}px) rotate(-${rotate})`
            }
          >
            <div className="w-2 h-2 rounded-full bg-blue-400" />
          </motion.div>
        ))}
      </div>

      {/* Legenda */}
      <div className="flex gap-6 text-xs font-bold">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Prótons (+)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-400 inline-block" /> Nêutrons
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" /> Elétrons (-)
        </span>
      </div>
    </div>
  );
}
