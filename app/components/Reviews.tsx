"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { reviewsData } from "../data/reviews";
import { useMarquee } from "../hooks/useMarquee";
import {
  Sparkles,
  CheckCircle2,
  MapPin,
  Star,
  ShieldCheck,
} from "lucide-react";

export default function Reviews() {
  const { trackRef, x, setHovered } = useMarquee(35, 10);

  // Duplicate dataset for infinite seamless marquee loop
  const marqueeReviews = [...reviewsData, ...reviewsData, ...reviewsData];

  return (
    <section
      id="reviews"
      className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-[#030109] selection:bg-purple-500/40 selection:text-white"
    >
      {/* Background oversized low-opacity typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
        <span className="text-[15vw] font-black text-purple-950/[0.035] tracking-[0.2em] uppercase leading-none select-none font-sans">
          REVIEWS
        </span>
      </div>

      {/* Ambient Backlight Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center mb-10 lg:mb-12"
        >
          {/* Thin accent rule */}
          <div className="h-px w-10 bg-purple-500/60 mb-4" />

          {/* Heading matching website theme */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Loved by Patients.{" "}
            <span className="beautiful-smiles-glow">Trusted for Life.</span>
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light">
            Continuous real feedback from patients across Daman, Vapi, Silvassa,
            and Surat.
          </p>
        </motion.div>

        {/* Seamless Continuous Infinite Auto-Scrolling Marquee Track */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered(true)}
          onTouchEnd={() => setHovered(false)}
          className="relative w-full overflow-hidden py-2 before:absolute before:left-0 before:top-0 before:z-20 before:h-full before:w-16 sm:before:w-32 before:bg-gradient-to-r before:from-[#030109] before:to-transparent after:absolute after:right-0 after:top-0 after:z-20 after:h-full after:w-16 sm:after:w-32 after:bg-gradient-to-l after:from-[#030109] after:to-transparent"
        >
          <motion.div ref={trackRef} style={{ x }} className="flex gap-6 w-max">
            {marqueeReviews.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[300px] sm:w-[350px] shrink-0 p-5 rounded-2xl bg-[#0d0817]/50 border border-white/5 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-[#130b21]/70 hover:shadow-[0_10px_30px_rgba(168,85,247,0.1)] group flex flex-col justify-between"
              >
                <div>
                  {/* Top Author Row with Small Avatar & Rating */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      {/* Small subtle avatar image (not big) */}
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-500/30 shrink-0">
                        <Image
                          src={item.avatar}
                          alt={item.patientName}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight font-sans">
                          {item.patientName}
                        </h4>
                        <p className="text-[10px] text-purple-300/80 font-medium flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-purple-400" />
                          <span>{item.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Small Star Rating */}
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Highlight */}
                  <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-200 transition-colors mb-2 leading-snug font-sans">
                    {item.highlight}
                  </h5>

                  {/* Review Text */}
                  <p className="text-white/65 text-xs leading-relaxed font-light line-clamp-3">
                    {item.reviewText}
                  </p>
                </div>

                {/* Footer Line with Treatment & Verified Pill */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-purple-300">
                    {item.treatment}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-medium text-white/50">
                    <CheckCircle2 className="w-2.5 h-2.5 text-purple-400" />
                    <span>{item.verifiedSource}</span>
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Minimalist Trust Bar Below Auto-Scrolling Marquee */}
        <div className="mt-10 pt-5 border-t border-purple-500/15 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-white/60">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B4FE]" />
            <span>4.9 / 5.0 Google Rating</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>500+ Happy Patients</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>100% Sterile Clinical Care</span>
          </div>
        </div>
      </div>
    </section>
  );
}
