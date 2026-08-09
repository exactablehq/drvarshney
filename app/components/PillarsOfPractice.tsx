"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

interface PillarItem {
  id: number;
  number: string;
  word: string;
  subtitle: string;
  description: string;
  tag: string;
}

const pillarsData: PillarItem[] = [
  {
    id: 1,
    number: "01",
    word: "INTEGRITY",
    subtitle: "Transparent Clinical Care",
    description: "We prescribe only necessary treatments with complete honesty, prioritizing long-term health.",
    tag: "100% Patient-First"
  },
  {
    id: 2,
    number: "02",
    word: "TRUST",
    subtitle: "Enduring Relationships",
    description: "Earned over decades through compassionate care, consistent outcomes, and safety protocols.",
    tag: "Decades of Legacy"
  },
  {
    id: 3,
    number: "03",
    word: "PRINCIPLES",
    subtitle: "Evidence-Based Science",
    description: "Built on rigorous scientific standards, modern technology, and anatomical precision.",
    tag: "Scientific Rigor"
  },
  {
    id: 4,
    number: "04",
    word: "ETHICS",
    subtitle: "Uncompromised Standards",
    description: "Strict adherence to gold-standard sterilization, fair pricing, and uncompromised medical ethics.",
    tag: "Gold Sterilization"
  }
];

export default function PillarsOfPractice() {
  return (
    <section
      id="pillars"
      className="relative py-16 sm:py-24 lg:py-[140px] overflow-hidden bg-[var(--background)] border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10 w-full">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14 sm:mb-20"
        >
          {/* Kicker line — folded from the old artwork banner */}
          <p className="text-[11px] font-semibold text-[var(--primary-tint)] tracking-[0.2em] uppercase mb-3">
            Unwavering Foundation Since Day 1
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--primary)]/30 text-[11px] font-semibold text-[var(--primary-tint)] tracking-wider uppercase mb-5">
            <Compass className="w-3.5 h-3.5" />
            <span>Core Practice Pillars</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-4">
            THE PILLARS OF DR. VARSHNEY&apos;S DENTAL
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
            Our values aren&apos;t just words on a wall; they are the clinical compass that guides our practice every single day. In an era of &ldquo;corporate dentistry,&rdquo; we believe true healing requires a foundation that never shifts.
          </p>
        </motion.div>

        {/* Numbered Manifesto */}
        <div>
          {pillarsData.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
              className={idx > 0 ? "pt-10 sm:pt-14 mt-10 sm:mt-14 border-t border-white/[0.08]" : ""}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12">
                {/* Large low-opacity numeral — the only graphic element */}
                <div className="shrink-0">
                  <span
                    className="font-serif font-bold leading-none select-none block text-[64px] sm:text-[110px] lg:text-[150px]"
                    style={{ color: "rgba(139, 61, 255, 0.18)" }}
                  >
                    {pillar.number}
                  </span>
                </div>

                <div className="flex-1 sm:pt-3 lg:pt-6">
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-1.5">
                    {pillar.word} <span className="text-white/45 font-normal text-base sm:text-lg lg:text-xl">— {pillar.subtitle}</span>
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light max-w-xl mb-4">
                    {pillar.description}
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--primary)]/25 text-[11px] font-medium text-[var(--primary-tint)]">
                    {pillar.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
