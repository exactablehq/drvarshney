"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { galleryItems } from "../data/gallery";
import { Sparkles, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const selectedItem = selectedItemIndex !== null ? galleryItems[selectedItemIndex] : null;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % galleryItems.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <section id="gallery" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-[#030109] flex flex-col justify-center">
      
      {/* Oversized Low-Opacity Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
        <span className="text-[13vw] font-black text-purple-955/[0.025] tracking-[0.2em] uppercase leading-none select-none">
          GALLERY
        </span>
      </div>

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 right-[5%] w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-purple-600/[0.025] rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-[5%] w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-purple-500/[0.025] rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center mb-10 lg:mb-14"
        >
          {/* Thin accent rule */}
          <div className="h-px w-10 bg-purple-500/60 mb-6" />

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Visual Excellence. <span className="beautiful-smiles-glow">Beautiful Smiles.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Explore our clinical environment, digital dental technology, and smile transformations. Click any photo to enlarge.
          </p>
        </motion.div>

        {/* Borderless, gapless bento grid — varied spans, no gutters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[200px] gap-0.5 w-full rounded-2xl overflow-hidden">
          {galleryItems.map((item, idx) => {
            const spanClass =
              [
                "col-span-2 row-span-2",
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
                "col-span-1 row-span-2",
                "col-span-1 row-span-1",
                "col-span-2 row-span-1",
              ][idx % 6] ?? "col-span-1 row-span-1";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                onClick={() => setSelectedItemIndex(idx)}
                className={`group relative overflow-hidden bg-[#0d0817] cursor-pointer ${spanClass}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  loading={idx < 4 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#030109]/95 via-[#030109]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-purple-300 text-[11px] mt-0.5 flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    {item.categoryLabel}
                  </p>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ------------------ FULLSIZE ENLARGED PHOTO VIEWER MODAL ------------------ */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItemIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedItemIndex(null)}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-purple-600/60 transition-all cursor-pointer shadow-xl"
              aria-label="Close enlarged photo"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Chevron Button */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-black/70 border border-white/20 text-white hover:bg-purple-600/60 transition-all cursor-pointer shadow-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Chevron Button */}
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-black/70 border border-white/20 text-white hover:bg-purple-600/60 transition-all cursor-pointer shadow-xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Enlarged Photo Container */}
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-6xl max-h-[85vh] z-40 flex flex-col items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-black"
            >
              {/* Image */}
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-w-full max-h-[75vh] object-contain select-none"
              />

              {/* Caption Overlay Bar */}
              <div className="w-full bg-[#0b0512]/90 border-t border-purple-500/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-white/60 font-light mt-0.5">
                    {selectedItem.description}
                  </p>
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/20 border border-purple-500/30 text-purple-300 shrink-0">
                  {selectedItem.tag}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
