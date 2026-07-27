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

// Spacing, typography, and card tokens matching the rest of the application
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
  // Staggered reveal variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
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
    <section id="why-choose-us" className="relative pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden bg-[#090611] border-t border-[#35063e]/20 flex flex-col justify-center">
      
      {/* Oversized Background Typography - "CARE" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
        <span className="text-[14vw] font-black text-purple-955/[0.025] tracking-[0.2em] uppercase leading-none select-none">
          CARE
        </span>
      </div>

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/3 left-[10%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-600/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-[10%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center mb-12 lg:mb-16"
        >
          {/* Small glassmorphism pill label */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a0516]/65 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1),_inset_0_1px_0_rgba(255,255,255,0.1)] text-xs font-semibold text-purple-300 tracking-wider uppercase backdrop-blur-[10px] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Why Choose Us</span>
          </div>

          {/* Large elegant heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Exceptional Care. <span className="beautiful-smiles-glow">Modern Dentistry.</span> Trusted Expertise.
          </h2>

          {/* Supporting description */}
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Combining cutting-edge dental technology with artistic clinical care, Dr. Varshney's Dental Aesthetics elevates oral wellness and aesthetic beauty to premium standards.
          </p>
        </motion.div>

        {/* Feature Cards Grid (3x2 Desktop, 2x2 Tablet, 1x1 Mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {whyChooseUsData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ 
                  y: -6, 
                  borderColor: "rgba(168, 85, 247, 0.4)",
                  boxShadow: "0 12px 30px rgba(168, 85, 247, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                }}
                className="p-6 sm:p-8 rounded-[28px] bg-[#0e071b]/60 border border-[#35063e]/20 backdrop-blur-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-colors duration-300 group flex flex-col items-start text-left relative overflow-hidden"
              >
                {/* Subtle soft purple glow behind icon */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-purple-500/10 transition-all duration-300" />
                
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:border-purple-400/40 group-hover:text-purple-300 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Feature Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Feature Description */}
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
