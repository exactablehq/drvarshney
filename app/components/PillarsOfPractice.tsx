"use client";

import { motion } from "framer-motion";
import {
  Compass,
  ShieldCheck,
  Award,
  HeartHandshake,
  Scale,
  Sparkles,
  CheckCircle2,
  Lock,
  Medal,
  Star
} from "lucide-react";

interface PillarItem {
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
    firstLetter: "I",
    restOfWord: "NTEGRITY",
    subtitle: "Transparent Clinical Recommendations",
    description: "We prescribe only necessary treatments with complete honesty, keeping your long-term health as our single priority.",
    tag: "100% Patient-First",
    icon: ShieldCheck,
    badgeColor: "from-purple-500 via-fuchsia-500 to-indigo-500",
    glowColor: "rgba(216, 180, 254, 0.25)"
  },
  {
    firstLetter: "T",
    restOfWord: "RUST",
    subtitle: "Enduring Patient Relationships",
    description: "Earned over decades through compassionate care, consistent outcomes, and unwavering patient safety protocols.",
    tag: "Decades of Legacy",
    icon: HeartHandshake,
    badgeColor: "from-indigo-500 via-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.25)"
  },
  {
    firstLetter: "P",
    restOfWord: "RINCIPLES",
    subtitle: "Evidence-Based Clinical Excellence",
    description: "Built on rigorous scientific standards, modern technology, and meticulous attention to anatomical precision.",
    tag: "Scientific Rigor",
    icon: Scale,
    badgeColor: "from-violet-500 via-indigo-500 to-purple-500",
    glowColor: "rgba(129, 140, 248, 0.25)"
  },
  {
    firstLetter: "E",
    restOfWord: "THICS",
    subtitle: "Uncompromised Medical Care",
    description: "Strict adherence to gold-standard sterilization, fair transparent pricing, and uncompromised medical ethics.",
    tag: "Gold Sterilization",
    icon: Award,
    badgeColor: "from-pink-500 via-purple-500 to-violet-500",
    glowColor: "rgba(236, 72, 153, 0.25)"
  }
];

export default function PillarsOfPractice() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section
      id="pillars"
      className="relative pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-[#090611] border-t border-[#35063e]/30 selection:bg-purple-500/40 selection:text-white"
    >
      {/* Background oversized low-opacity typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
        <span className="text-[16vw] font-black text-purple-950/[0.04] tracking-[0.2em] uppercase leading-none select-none">
          VALUES
        </span>
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/6 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-purple-600/[0.04] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/6 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-indigo-600/[0.04] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: "-2s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center mb-14 lg:mb-20"
        >
          {/* Glowing glassmorphism pill label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0516]/80 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2),_inset_0_1px_0_rgba(255,255,255,0.15)] text-xs font-semibold text-purple-300 tracking-wider uppercase backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <Compass className="w-3.5 h-3.5 text-purple-300" />
            <span>Core Practice Pillars</span>
          </div>

          {/* Large main heading matching website theme */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            THE PILLARS OF <span className="beautiful-smiles-glow">DR. VARSHNEY'S DENTAL</span>
          </h2>

          {/* Supporting description */}
          <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Our values aren't just words on a wall; they are the clinical compass that guides our practice every single day. In an era of "corporate dentistry," we believe true healing requires a foundation that never shifts.
          </p>
        </motion.div>

        {/* Content Layout: 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 4 Glowing Luxury Pillar Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {pillarsData.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    borderColor: "rgba(168, 85, 247, 0.45)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.15)"
                  }}
                  className="p-6 sm:p-7 rounded-[28px] bg-gradient-to-b from-[#120a24]/80 via-[#0a0516]/90 to-[#080312]/95 border border-purple-500/20 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Subtle soft purple glow behind card on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />
                  
                  {/* Top glowing line indicator */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent group-hover:via-purple-400 transition-all duration-500" />

                  <div>
                    {/* Header: Large Word with 3D Glowing First Letter Badge + Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D8B4FE] to-[#a855f7] inline-block tracking-tight drop-shadow-[0_4px_12px_rgba(168,85,247,0.4)] font-sans">
                          {pillar.firstLetter}
                        </span>
                        <span className="text-xl sm:text-2xl font-extrabold text-white/95 tracking-wider font-sans uppercase">
                          {pillar.restOfWord}
                        </span>
                      </div>

                      {/* Icon Badge */}
                      <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-110 group-hover:border-purple-400/50 group-hover:text-white group-hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <h3 className="text-sm font-semibold text-white/95 mb-2.5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{pillar.subtitle}</span>
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bottom Accent Footer with Tag */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-medium text-purple-300">
                      {pillar.tag}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 group-hover:text-purple-300 transition-colors">
                      Pillar 0{idx + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column: High-Tech Layered Glass Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Ambient Radial Spotlight */}
            <div className="absolute inset-0 bg-purple-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="w-full max-w-md p-4 sm:p-6 rounded-[36px] bg-gradient-to-b from-[#120a24]/90 via-[#0a0516]/85 to-[#070312]/95 border border-purple-500/35 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7),_0_0_40px_rgba(168,85,247,0.2),_inset_0_1px_0_rgba(255,255,255,0.15)] relative overflow-hidden group">
              
              {/* Main Image Container */}
              <div className="relative w-full aspect-square rounded-[28px] overflow-hidden border border-purple-500/30 shadow-2xl group-hover:border-purple-400/50 transition-colors duration-500">
                <img
                  src="/dental_pillars_compass.png"
                  alt="Dr. Varshney's Dental Clinical Compass & Foundation"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0516]/85 via-transparent to-transparent pointer-events-none" />

                {/* Internal Top Left Tag */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0516]/75 border border-purple-500/30 backdrop-blur-md text-[10px] font-bold text-purple-300 tracking-wider uppercase shadow-lg">
                  <Star className="w-3 h-3 text-purple-400 fill-purple-400/30" />
                  <span>Clinical Excellence</span>
                </div>
              </div>

              {/* Bottom Text Banner */}
              <div className="mt-6 text-center relative z-10 space-y-2">
                <h4 className="text-lg font-bold text-white tracking-tight font-sans">
                  Guided Toward True Healing
                </h4>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-xs font-medium text-purple-200 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Unwavering Foundation Since Day 1</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

