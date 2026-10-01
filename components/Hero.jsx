"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ControlDock from "./ControlDock";

gsap.registerPlugin(ScrollTrigger);

const STAT_ITEMS = [
  { target: 99.8, symbol: "%", label: "Real-time Precision", note: "Sub-millisecond render sync" },
  { target: 85.4, symbol: "%", label: "GPU Load Reduction", note: "Hardware accelerated layer composite" },
  { target: 100, symbol: "%", label: "Frame Rate Stability", note: "Locked 60 FPS scroll interpolation" },
];

const MAIN_TITLE = "WELCOME ITZ FIZZ";

// Smooth animated counter component
function StatCounter({ target, symbol }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1500; // ms
    const stepTime = 1000 / 60;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  const formattedVal = val % 1 === 0 ? val : val.toFixed(1);

  return (
    <span>
      {formattedVal}
      {symbol}
    </span>
  );
}

export default function Hero() {
  const [activeTab, setActiveTab] = useState("core");
  const [isProfilerOpen, setIsProfilerOpen] = useState(false);

  // Section refs
  const sectionRef = useRef(null);
  const visualWrapperRef = useRef(null);
  const coreGraphicRef = useRef(null);
  const headerRef = useRef(null);
  const statsGridRef = useRef(null);
  const bgCanvasRef = useRef(null);

  // Mouse tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const tiltY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const handlePointerMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized offset from center (-1 to 1 range scaled by 30)
    mouseX.set(((clientX / innerWidth) - 0.5) * 30);
    mouseY.set(((clientY / innerHeight) - 0.5) * 30);
  };

  // Particle background animation
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animId;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Initialize random floating particles
    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.dx;
        p.y += p.dy;

        // Wrap around screen edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 42, 75, ${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // GSAP scroll setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=160%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to(coreGraphicRef.current, {
          rotateX: 180,
          rotateY: 360,
          scale: 1.4,
          y: "15vh",
          ease: "power2.inOut",
        })
        .to(
          headerRef.current,
          {
            opacity: 0,
            y: -50,
            scale: 0.92,
            filter: "blur(6px)",
            ease: "power1.out",
          },
          0
        )
        .to(
          statsGridRef.current,
          {
            opacity: 0,
            y: -25,
            scale: 0.95,
            ease: "power1.out",
          },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      className="relative w-full h-screen bg-[#040406] text-white overflow-hidden flex flex-col justify-between px-6 py-8 md:px-16 md:py-12 select-none"
    >
      {/* Dynamic Background Elements */}
      <canvas ref={bgCanvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,42,75,0.16),transparent_65%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Profiler Toggle Button */}
      <div className="absolute top-6 right-6 md:top-8 md:right-16 z-30">
        <button
          onClick={() => setIsProfilerOpen((prev) => !prev)}
          className="px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-md text-[10px] font-mono text-red-400 hover:text-white hover:border-red-500/60 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,42,75,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>{isProfilerOpen ? "CLOSE HUD" : "HUD PROFILER"}</span>
        </button>
      </div>

      {/* System Profiler Card */}
      {isProfilerOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          className="absolute top-16 right-6 md:top-20 md:right-16 z-40 p-4 w-60 rounded-xl border border-white/10 bg-[#08080c]/90 backdrop-blur-xl font-mono text-[10px] space-y-2 shadow-2xl text-neutral-300"
        >
          <div className="text-red-400 font-semibold border-b border-white/10 pb-1.5 uppercase flex justify-between items-center">
            <span>System Profiler</span>
            <span className="text-[9px] text-emerald-400">ONLINE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Render Engine:</span>
            <span>WebGL 2.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Active Mesh:</span>
            <span className="text-amber-400 font-semibold">{activeTab.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Target Refresh:</span>
            <span>60 FPS</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Active Nodes:</span>
            <span>30 Particles</span>
          </div>
        </motion.div>
      )}

      {/* Hero Header Title */}
      <div ref={headerRef} className="pt-2 z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-xl mb-3 shadow-[0_0_20px_rgba(255,42,75,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-red-400 font-semibold">
            Interactive Experience
          </span>
        </motion.div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-[0.2em] md:tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-500 uppercase leading-tight pl-[0.2em]">
          {MAIN_TITLE.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.6,
                delay: 0.02 * index,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Analytics Grid */}
      <div
        ref={statsGridRef}
        className="z-10 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto w-full my-1"
      >
        {STAT_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.4 + idx * 0.1,
            }}
            className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] hover:border-red-500/40 transition-all duration-300 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl"
          >
            <span className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-100 to-red-400 bg-clip-text text-transparent font-mono">
              <StatCounter target={item.target} symbol={item.symbol} />
            </span>
            <span className="text-xs uppercase tracking-wider text-neutral-200 mt-1 font-semibold">
              {item.label}
            </span>
            <span className="text-[10px] text-neutral-500 mt-0.5">
              {item.note}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Dock Controls */}
      <ControlDock activeMode={activeTab} setActiveMode={setActiveTab} />

      {/* Center 3D Object Visual */}
      <div
        ref={visualWrapperRef}
        className="relative flex-1 flex items-center justify-center my-1 z-20"
      >
        <motion.div
          ref={coreGraphicRef}
          style={{ rotateX: tiltY, rotateY: tiltX }}
          className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px] flex items-center justify-center will-change-transform"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-amber-500/20 blur-[80px] rounded-full pointer-events-none animate-pulse" />

          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(255,42,75,0.35)]">
            <defs>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2a4b" />
                <stop offset="50%" stopColor="#ff7b00" />
                <stop offset="100%" stopColor="#111118" />
              </linearGradient>
            </defs>

            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#ff2a4b"
              strokeWidth="1.5"
              strokeDasharray="40 120"
              className="origin-center animate-[spin_20s_linear_infinite]"
            />

            <polygon
              points="100,35 156,67 156,133 100,165 44,133 44,67"
              fill={activeTab === "core" ? "none" : "rgba(255,42,75,0.04)"}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
              className="origin-center animate-[spin_25s_linear_infinite]"
            />

            {activeTab === "core" && (
              <circle cx="100" cy="100" r="38" fill="url(#glowGradient)" className="animate-pulse" />
            )}
            <circle cx="100" cy="100" r="18" fill="#ffffff" className="opacity-90 blur-[1px]" />
          </svg>
        </motion.div>
      </div>

      {/* Footer Telemetry Banner */}
      <div className="z-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Status: Optimal</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>FPS: 60.0</span>
          <span>Engine: WebGL / GSAP</span>
          <span>Latency: 0.2ms</span>
        </div>
      </div>
    </section>
  );
}