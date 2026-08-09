"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Cpu,
  ClipboardList,
  Award,
  Shield,
  Heart,
  CalendarDays
} from "lucide-react";

// Feature item type definitions
interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// Content preserved verbatim from the previous grid implementation
const whyChooseUsData: FeatureItem[] = [
  {
    icon: Cpu,
    title: "Advanced Digital Technology",
    description: "Equipped with state-of-the-art diagnostic equipment and digital imaging systems for ultra-precise treatment planning."
  },
  {
    icon: ClipboardList,
    title: "Personalized Treatment Plans",
    description: "Every smile is unique. We craft individualized dental solutions tailored precisely to your anatomy and aesthetic goals."
  },
  {
    icon: Award,
    title: "Experienced Dental Team",
    description: "Led by Dr. Ayush Varshney, our team utilizes advanced clinical expertise to provide modern and gentle dental procedures."
  },
  {
    icon: Shield,
    title: "Sterile & Hygienic Environment",
    description: "We adhere to gold-standard sterilization protocols and clinical hygiene measures for your absolute safety."
  },
  {
    icon: Heart,
    title: "Comfortable & Painless Procedures",
    description: "Designed with patient comfort in mind, using advanced pain-free techniques and a soothing ambient environment."
  },
  {
    icon: CalendarDays,
    title: "Flexible Appointment Scheduling",
    description: "Book appointments effortlessly online, with flexible slots designed to fit seamlessly into your busy calendar."
  }
];

export default function WhyChooseUs() {
  // Duplicate content 3x for a seamless marquee loop
  const marqueeItems = [...whyChooseUsData, ...whyChooseUsData, ...whyChooseUsData];

  return (
    <section
      id="why-choose-us"
      className="relative py-16 sm:py-24 lg:py-[140px] overflow-hidden bg-[var(--background)] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-8 relative z-10 w-full flex flex-col">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/30 text-xs font-semibold text-[var(--primary-tint)] tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Choose Us</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15]">
            Exceptional Care. Modern Dentistry. Trusted Expertise.
          </h2>
        </motion.div>
      </div>

      {/* Marquee row — duplicated content, pauses on hover (desktop only), never pauses on touch */}
      <div className="group/marquee relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-4 sm:gap-6 px-4 animate-marquee [animation-duration:55s] sm:[animation-duration:42s] group-hover/marquee:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="w-[280px] sm:w-[340px] shrink-0 p-6 sm:p-8 rounded-2xl bg-[var(--charcoal-2)]/60 border border-white/[0.06] flex flex-col items-start text-left"
              >
                <div className="w-11 h-11 rounded-full border border-[var(--primary)]/25 flex items-center justify-center text-[var(--primary-tint)] mb-5 shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2.5">
                  {item.title}
                </h3>
                <p className="text-white/55 text-xs sm:text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
