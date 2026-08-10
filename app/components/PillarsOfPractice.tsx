"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { pillarsData, type PillarItem } from "../data/pillars";

// Vertical stagger offsets so the row feels art-directed, not a rigid grid.
const OFFSETS = ["lg:mt-0", "lg:mt-10", "lg:-mt-4", "lg:mt-6"];

function PillarCard({ pillar, idx }: { pillar: PillarItem; idx: number }) {
  const IconComponent = pillar.icon;

  // Magnetic pull toward the cursor, spring-smoothed.
  const cardRef = useRef<HTMLDivElement>(null);
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const springX = useSpring(magX, { stiffness: 150, damping: 15 });
  const springY = useSpring(magY, { stiffness: 150, damping: 15 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -25, rotateY: idx % 2 === 0 ? -12 : 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: idx * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformStyle: "preserve-3d" }}
      className={OFFSETS[idx % OFFSETS.length]}
    >
      {/* Ambient float loop + magnetic pull toward the cursor */}
      <motion.div
        ref={cardRef}
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: { duration: 5 + idx * 0.6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 },
        }}
        style={{ x: springX, y: springY }}
        onMouseMove={(e) => {
          const el = cardRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
          magX.set(Math.cos(angle) * 10);
          magY.set(Math.sin(angle) * 10);
        }}
        onMouseLeave={() => {
          magX.set(0);
          magY.set(0);
        }}
        whileHover={{ scale: 1.03 }}
        className="group relative p-6 sm:p-7 rounded-[28px] bg-gradient-to-b from-white/[0.04] to-white/[0.015] border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:border-purple-400/40 h-full"
      >
        {/* Soft glow that intensifies on hover */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex items-center justify-between mb-5">
          <span className="font-serif text-4xl sm:text-5xl text-purple-400/30 leading-none tabular-nums">
            0{pillar.id}
          </span>
          <IconComponent className="w-5 h-5 text-purple-400" />
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2 group-hover:text-purple-200 transition-colors duration-300">
          {pillar.word}
        </h3>
        <p className="text-xs font-semibold text-purple-300/90 mb-3">
          {pillar.subtitle}
        </p>
        <p className="text-white/55 text-xs sm:text-sm leading-relaxed font-light">
          {pillar.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function PillarsOfPractice() {
  return (
    <section
      id="pillars"
      className="relative py-24 lg:py-32 overflow-hidden bg-[#030109]"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
        <span className="text-[16vw] font-black text-purple-950/[0.04] tracking-[0.2em] uppercase leading-none select-none">
          VALUES
        </span>
      </div>
      <div className="absolute top-1/4 left-1/6 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-purple-600/[0.05] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/6 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-indigo-600/[0.05] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="h-px w-10 bg-purple-500/60 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.1]">
            The Pillars of <span className="beautiful-smiles-glow">Dr. Varshney&apos;s Dental</span>
          </h2>
        </div>

        {/* Floating 3D row — each card tilts in on scroll, then drifts + pulls toward the cursor */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          style={{ perspective: "1400px" }}
        >
          {pillarsData.map((pillar, idx) => (
            <PillarCard key={pillar.id} pillar={pillar} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
