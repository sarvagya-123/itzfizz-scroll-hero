import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="min-h-[220vh] bg-[#050508] text-white">
      {/* Hero section with scroll animations */}
      <Hero />

      {/* Content section below hero */}
      <section className="relative z-30 max-w-5xl mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
          Next-Generation Dynamics
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Engineered with GPU hardware acceleration, sub-millisecond event listeners, and 60 FPS motion scrub interpolation.
        </p>
      </section>
    </main>
  );
}