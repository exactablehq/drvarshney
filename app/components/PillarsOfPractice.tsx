"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Compass } from "lucide-react";
import { pillarsData, type PillarItem } from "../data/pillars";
import DotField from "./DotField";

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
      initial={{
        opacity: 0,
        y: 60,
        rotateX: -25,
        rotateY: idx % 2 === 0 ? -12 : 12,
      }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: idx * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative ${OFFSETS[idx % OFFSETS.length]}`}
    >
      {/* Connector node — aligns with the SVG constellation line behind the row */}
      <div className="hidden lg:block absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.9)]" />

      {/* Ambient float loop + magnetic pull toward the cursor */}
      <motion.div
        ref={cardRef}
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: {
            duration: 5 + idx * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.4,
          },
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
        className="group relative overflow-hidden p-6 sm:p-7 rounded-[28px] bg-gradient-to-b from-purple-300/10 to-purple-300/1 border border-white/10 backdrop-blur-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:border-purple-400/40 h-full"
      >
        {/* Top accent gradient bar */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/70 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Faint corner grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Soft glow that intensifies on hover */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex items-center justify-between mb-5">
          <span className="font-serif text-4xl sm:text-5xl text-purple-400/70 leading-none tabular-nums">
            0{pillar.id}
          </span>

          {/* Icon in a glowing chip with a pulsing ring */}
          <div className="relative flex items-center justify-center w-10 h-10">
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.3,
              }}
              className="absolute inset-0 rounded-full border border-purple-400/50"
            />
            <div className="relative w-8 h-8 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-300/50 transition-colors duration-300">
              <IconComponent className="w-4 h-4 text-purple-300" />
            </div>
          </div>
        </div>

        <h3 className="relative text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2 group-hover:text-purple-200 transition-colors duration-300">
          {pillar.word}
        </h3>
        <p className="relative text-xs font-semibold text-purple-300/90 mb-3">
          {pillar.subtitle}
        </p>
        <p className="relative text-white/55 text-xs sm:text-sm leading-relaxed font-light">
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
      {/* Interactive dot-grid backdrop — replaces the old particle sprinkle with a live,
          cursor-reactive field. Positive z-index (not negative) because this <section> has
          no z-index of its own, so it never establishes a stacking context — negative-z
          children would escape to the nearest ancestor that does, painting behind unrelated
          page content instead of just this section. */}
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={4}
          dotSpacing={25}
          cursorRadius={220}
          bulgeStrength={55}
          glowRadius={0}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(192, 132, 252, 0.55)"
          gradientTo="rgba(129, 140, 248, 0.35)"
          glowColor="#2a1745"
        />
      </div>

      {/* Top scrim so the navbar stays legible over the photo */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#030109] to-transparent pointer-events-none z-[6]" />
      {/* Bottom seam — blends the hero into the Services section background */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030109] via-[#030109]/45 to-transparent pointer-events-none" />
      {/* Left Seam */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#030109]/70 via-[#030109]/45 to-transparent pointer-events-none" />
      {/* Right Seam */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#030109]/70 via-[#030109]/45 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          {/* Emblem — concentric rotating rings around a compass icon */}
          <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-purple-400/40"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-dashed border-purple-300/30"
            />
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-3 rounded-full bg-purple-500/15 blur-md"
            />
            <div className="relative w-9 h-9 rounded-full bg-[#0d0817] border border-purple-400/40 flex items-center justify-center">
              <Compass className="w-4 h-4 text-purple-300" />
            </div>
          </div>

          <div className="h-px w-10 bg-purple-500/60 mb-6" />
          <span className="text-xs font-semibold tracking-[0.25em] text-purple-300/80 uppercase mb-4">
            What We Stand On
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.1]">
            The Pillars of{" "}
            <span className="beautiful-smiles-glow">
              Dr. Varshney&apos;s Dental Aesthetics
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/55 font-light leading-relaxed max-w-xl">
            Not slogans on a wall — the standard every diagnosis, material, and
            conversation in this practice is held to.
          </p>
        </div>

        {/* Floating 3D row — each card tilts in on scroll, then drifts + pulls toward the cursor */}
        <div className="relative">
          {/* Constellation connector line threading through the card nodes (desktop only) */}
          <svg
            className="hidden lg:block absolute -top-4 left-0 w-full h-4 pointer-events-none -z-10"
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="12.5"
              y1="2"
              x2="87.5"
              y2="2"
              stroke="rgba(168,85,247,0.35)"
              strokeWidth="0.3"
              strokeDasharray="1 2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            style={{ perspective: "1400px" }}
          >
            {pillarsData.map((pillar, idx) => (
              <PillarCard key={pillar.id} pillar={pillar} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
