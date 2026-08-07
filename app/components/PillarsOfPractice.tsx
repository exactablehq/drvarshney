"use client";

import { motion } from "framer-motion";
import {
  Compass,
  ShieldCheck,
  Award,
  HeartHandshake,
  Scale,
  CheckCircle2,
  Star
} from "lucide-react";

interface PillarItem {
  id: number;
  firstLetter: string;
  restOfWord: string;
  subtitle: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor: string;
  glowColor: string;
}

const pillarsData: PillarItem[] = [
  {
    id: 1,
    firstLetter: "I",
    restOfWord: "NTEGRITY",
    subtitle: "Transparent Clinical Care",
    description: "We prescribe only necessary treatments with complete honesty, prioritizing long-term health.",
    tag: "100% Patient-First",
    icon: ShieldCheck,
    badgeColor: "from-purple-500 via-fuchsia-500 to-indigo-500",
    glowColor: "rgba(216, 180, 254, 0.25)"
  },
  {
    id: 2,
    firstLetter: "T",
    restOfWord: "RUST",
    subtitle: "Enduring Relationships",
    description: "Earned over decades through compassionate care, consistent outcomes, and safety protocols.",
    tag: "Decades of Legacy",
    icon: HeartHandshake,
    badgeColor: "from-indigo-500 via-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.25)"
  },
  {
    id: 3,
    firstLetter: "P",
    restOfWord: "RINCIPLES",
    subtitle: "Evidence-Based Science",
    description: "Built on rigorous scientific standards, modern technology, and anatomical precision.",
    tag: "Scientific Rigor",
    icon: Scale,
    badgeColor: "from-violet-500 via-indigo-500 to-purple-500",
    glowColor: "rgba(129, 140, 248, 0.25)"
  },
  {
    id: 4,
    firstLetter: "E",
    restOfWord: "THICS",
    subtitle: "Uncompromised Standards",
    description: "Strict adherence to gold-standard sterilization, fair pricing, and uncompromised medical ethics.",
    tag: "Gold Sterilization",
    icon: Award,
    badgeColor: "from-pink-500 via-purple-500 to-violet-500",
    glowColor: "rgba(236, 72, 153, 0.25)"
  }
];

export default function PillarsOfPractice() {
  // Stagger container for left cards (Cards 1 & 2)
  const leftContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Stagger container for right cards (Cards 3 & 4)
  const rightContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Left cards shoot outward from behind center image to left position (fast & smooth)
  const leftItemVariants = {
    hidden: { opacity: 0, x: "90%", scale: 0.5, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: "0%",
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  // Right cards shoot outward from behind center image to right position (fast & smooth)
  const rightItemVariants = {
    hidden: { opacity: 0, x: "-90%", scale: 0.5, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: "0%",
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const renderPillarCard = (pillar: PillarItem, variants: typeof leftItemVariants) => {
    const IconComponent = pillar.icon;
    return (
      <motion.div
        key={pillar.id}
        variants={variants}
        whileHover={{
          y: -6,
          borderColor: "rgba(168, 85, 247, 0.45)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.55), 0 0 20px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.15)"
        }}
        className="p-5 sm:p-6 rounded-[22px] bg-gradient-to-b from-[#120a24]/80 via-[#0a0516]/90 to-[#080312]/95 border border-purple-500/20 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.45)] transition-all duration-500 group flex flex-col justify-between relative overflow-hidden w-full z-10"
      >
        {/* Soft purple glow behind card on hover */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />
        
        {/* Top glowing line indicator */}
        <div className="absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent group-hover:via-purple-400 transition-all duration-500" />

        <div>
          {/* Header: Large Word with 3D Glowing First Letter Badge + Icon */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-1">
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + pillar.id * 0.08, type: "spring", stiffness: 220 }}
                className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D8B4FE] to-[#a855f7] inline-block tracking-tight drop-shadow-[0_4px_12px_rgba(168,85,247,0.4)] font-sans"
              >
                {pillar.firstLetter}
              </motion.span>
              <span className="text-lg sm:text-xl font-extrabold text-white/95 tracking-wider font-sans uppercase">
                {pillar.restOfWord}
              </span>
            </div>

            {/* Icon Badge */}
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-110 group-hover:border-purple-400/50 group-hover:text-white group-hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.1)]">
              <IconComponent className="w-4 h-4" />
            </div>
          </div>

          {/* Subtitle */}
          <h3 className="text-xs sm:text-sm font-semibold text-white/95 mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>{pillar.subtitle}</span>
          </h3>

          {/* Description */}
          <p className="text-white/60 text-xs leading-relaxed font-light">
            {pillar.description}
          </p>
        </div>

        {/* Bottom Accent Footer with Tag */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] font-medium text-purple-300">
            {pillar.tag}
          </span>
          <span className="text-[9px] uppercase font-mono tracking-widest text-white/40 group-hover:text-purple-300 transition-colors">
            Pillar 0{pillar.id}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="pillars"
      className="relative pt-10 pb-14 lg:pt-12 lg:pb-16 overflow-hidden bg-[#090611] border-t border-[#35063e]/30 selection:bg-purple-500/40 selection:text-white"
    >
      {/* Background oversized low-opacity typography with subtle scroll scale */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10"
      >
        <span className="text-[16vw] font-black text-purple-950/[0.04] tracking-[0.2em] uppercase leading-none select-none">
          VALUES
        </span>
      </motion.div>

      {/* Ambient background glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/4 left-1/6 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-purple-600/[0.04] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        className="absolute bottom-1/4 right-1/6 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-indigo-600/[0.04] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow"
        style={{ animationDelay: "-2s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center mb-8 lg:mb-10"
        >
          {/* Glowing glassmorphism pill label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0a0516]/80 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15),_inset_0_1px_0_rgba(255,255,255,0.15)] text-[11px] font-semibold text-purple-300 tracking-wider uppercase backdrop-blur-md mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <Compass className="w-3.5 h-3.5 text-purple-300" />
            <span>Core Practice Pillars</span>
          </motion.div>

          {/* Large main heading matching website theme */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-white tracking-tight leading-[1.15] mb-3">
            THE PILLARS OF <span className="beautiful-smiles-glow">DR. VARSHNEY'S DENTAL</span>
          </h2>

          {/* Supporting description */}
          <p className="text-white/65 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
            Our values aren't just words on a wall; they are the clinical compass that guides our practice every single day. In an era of "corporate dentistry," we believe true healing requires a foundation that never shifts.
          </p>
        </motion.div>

        {/* Content Layout: 3 Columns on Desktop (Left Cards Shoot Left | Middle Artwork Showcase z-20 | Right Cards Shoot Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: First 2 Pillar Cards (Integrity & Trust) - Shoots from behind center to left */}
          <motion.div
            variants={leftContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 order-1 relative z-10"
          >
            {renderPillarCard(pillarsData[0], leftItemVariants)}
            {renderPillarCard(pillarsData[1], leftItemVariants)}
          </motion.div>

          {/* Middle Column: High-Tech Layered Glass Showcase (Clinical Compass Artwork - Z-20 Foreground) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-center justify-center relative order-3 lg:order-2 z-20"
          >
            {/* Ambient Radial Spotlight */}
            <div className="absolute inset-0 bg-purple-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-xs sm:max-w-sm p-4 rounded-[28px] bg-gradient-to-b from-[#120a24]/90 via-[#0a0516]/85 to-[#070312]/95 border border-purple-500/35 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65),_0_0_30px_rgba(168,85,247,0.15),_inset_0_1px_0_rgba(255,255,255,0.15)] relative overflow-hidden group"
            >
              
              {/* Main Image Container */}
              <div className="relative w-full aspect-square rounded-[22px] overflow-hidden border border-purple-500/30 shadow-xl group-hover:border-purple-400/50 transition-colors duration-500">
                <img
                  src="/dental_pillars_compass.png"
                  alt="Dr. Varshney's Dental Clinical Compass & Foundation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0516]/85 via-transparent to-transparent pointer-events-none" />

                {/* Internal Top Left Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0a0516]/75 border border-purple-500/30 backdrop-blur-md text-[9px] font-bold text-purple-300 tracking-wider uppercase shadow-lg">
                  <Star className="w-2.5 h-2.5 text-purple-400 fill-purple-400/30" />
                  <span>Clinical Excellence</span>
                </div>
              </div>

              {/* Bottom Text Banner */}
              <div className="mt-4 text-center relative z-10 space-y-1.5">
                <h4 className="text-base font-bold text-white tracking-tight font-sans">
                  Guided Toward True Healing
                </h4>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-[11px] font-medium text-purple-200 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Unwavering Foundation Since Day 1</span>
                </div>
              </div>

            </motion.div>
          </motion.div>

          {/* Rightmost Column: Last 2 Pillar Cards (Principles & Ethics) - Shoots from behind center to right */}
          <motion.div
            variants={rightContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 order-2 lg:order-3 relative z-10"
          >
            {renderPillarCard(pillarsData[2], rightItemVariants)}
            {renderPillarCard(pillarsData[3], rightItemVariants)}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
