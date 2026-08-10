"use client";

import { motion } from "framer-motion";
import { whyChooseUsData } from "../data/whyChooseUs";
import { useMarquee } from "../hooks/useMarquee";

export default function WhyChooseUs() {
  const { trackRef, x, setHovered } = useMarquee(40, 12);
  const marqueeItems = [...whyChooseUsData, ...whyChooseUsData, ...whyChooseUsData];

  return (
    <section id="why-choose-us" className="relative pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden bg-[#030109] flex flex-col justify-center">
      
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
          {/* Thin accent rule */}
          <div className="h-px w-10 bg-purple-500/60 mb-6" />

          {/* Large elegant heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Exceptional Care. <span className="beautiful-smiles-glow">Modern Dentistry.</span> Trusted Expertise.
          </h2>

          {/* Supporting description */}
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Combining cutting-edge dental technology with artistic clinical care, Dr. Varshney&apos;s Dental Aesthetics elevates oral wellness and aesthetic beauty to premium standards.
          </p>
        </motion.div>

        {/* Seamless auto-scrolling marquee, gradient-faded at both ends */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered(true)}
          onTouchEnd={() => setHovered(false)}
          className="relative w-full overflow-hidden py-2 before:absolute before:left-0 before:top-0 before:z-20 before:h-full before:w-16 sm:before:w-32 before:bg-gradient-to-r before:from-[#030109] before:to-transparent after:absolute after:right-0 after:top-0 after:z-20 after:h-full after:w-16 sm:after:w-32 after:bg-gradient-to-l after:from-[#030109] after:to-transparent"
        >
          <motion.div ref={trackRef} style={{ x }} className="flex gap-6 w-max">
            {marqueeItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="w-[280px] sm:w-[320px] shrink-0 p-6 rounded-[28px] bg-[#0d0817]/60 border border-[#35063e]/20 backdrop-blur-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-purple-500/40 group flex flex-col items-start text-left relative overflow-hidden"
                >
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-purple-500/10 transition-all duration-300" />

                  <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:border-purple-400/40 group-hover:text-purple-300 transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
