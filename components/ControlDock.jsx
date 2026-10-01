"use client";

import { motion } from "framer-motion";

const MODES = [
  { id: "core", label: "LUMINOUS CORE" },
  { id: "wireframe", label: "HUD MESH" },
];

export default function ControlDock({ activeMode, setActiveMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="z-20 flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl mx-auto my-2"
    >
      {MODES.map((mode) => {
        const isActive = activeMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              isActive
                ? "bg-red-500 text-white shadow-[0_0_15px_rgba(255,42,75,0.4)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {mode.label}
          </button>
        );
      })}
    </motion.div>
  );
}