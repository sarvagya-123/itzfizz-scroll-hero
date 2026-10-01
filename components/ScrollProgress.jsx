"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for indicator
  const scaleY = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30 
  });

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3 select-none pointer-events-none">
      <span className="text-[9px] font-mono tracking-widest text-neutral-500 rotate-90 mb-4">
        SCROLL
      </span>
      <div className="w-[2px] h-24 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="w-full h-full bg-red-500 shadow-[0_0_8px_#ff2a4b]"
        />
      </div>
    </div>
  );
}