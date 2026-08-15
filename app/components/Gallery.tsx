"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryItems } from "../data/gallery";
import Masonry, { MasonryItem } from "./Masonry";
import { Sparkles, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Filter gallery items by category
  const filteredGalleryItems = useMemo(() => {
    if (activeCategory === "all") return galleryItems;
    return galleryItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Map galleryItems to React Bits Masonry items with GPU height patterns
  const masonryItems: MasonryItem[] = useMemo(() => {
    const heightPatterns = [520, 400, 620, 460, 500, 380, 580, 420];
    return filteredGalleryItems.map((item, idx) => ({
      ...item,
      img: item.image,
      height: heightPatterns[idx % heightPatterns.length]
    }));
  }, [filteredGalleryItems]);

  const selectedItem = selectedItemIndex !== null ? filteredGalleryItems[selectedItemIndex] || null : null;

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedItemIndex(prev => (prev !== null ? (prev + 1) % filteredGalleryItems.length : null));
  }, [filteredGalleryItems.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedItemIndex(prev => (prev !== null ? (prev - 1 + filteredGalleryItems.length) % filteredGalleryItems.length : null));
  }, [filteredGalleryItems.length]);

  const handleItemClick = useCallback((item: MasonryItem, idx: number) => {
    setSelectedItemIndex(idx);
  }, []);

  // Keyboard navigation for modal viewer (Arrow keys & Escape)
  useEffect(() => {
    if (selectedItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItemIndex(null);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedItemIndex(prev => (prev !== null ? (prev + 1) % filteredGalleryItems.length : null));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedItemIndex(prev => (prev !== null ? (prev - 1 + filteredGalleryItems.length) % filteredGalleryItems.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, filteredGalleryItems.length]);

  const renderOverlay = useCallback((item: MasonryItem) => (
    <div className="absolute inset-0 bg-gradient-to-t from-[#030109]/95 via-[#030109]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 pointer-events-auto">
      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
        {item.title}
      </h3>
      <p className="text-purple-300 text-[11px] mt-0.5 flex items-center gap-1 font-medium">
        <Sparkles className="w-3 h-3 text-purple-400" />
        {item.categoryLabel}
      </p>
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/20 backdrop-blur-md">
        <Maximize2 className="w-3.5 h-3.5" />
      </div>
    </div>
  ), []);

  const categories = useMemo(() => [
    { id: "all", label: "All Photos" },
    { id: "ambience", label: "Clinic Ambience" },
    { id: "technology", label: "Advanced Tech" },
    { id: "care", label: "Doctor Care" }
  ], []);

  return (
    <section id="gallery" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-[#030109] flex flex-col justify-center">
      
      {/* Oversized Low-Opacity Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
        <span className="text-[13vw] font-black text-purple-955/[0.025] tracking-[0.2em] uppercase leading-none select-none">
          GALLERY
        </span>
      </div>

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 right-[5%] w-[21.875rem] sm:w-[28.125rem] h-[21.875rem] sm:h-[28.125rem] bg-purple-600/[0.025] rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-[5%] w-[21.875rem] sm:w-[28.125rem] h-[21.875rem] sm:h-[28.125rem] bg-purple-500/[0.025] rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center mb-8 lg:mb-10"
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

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 z-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedItemIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40 border border-purple-400/30"
                    : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                {isActive && <Sparkles className="w-3 h-3 text-purple-200" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Optimized GPU-Accelerated React Bits Masonry Grid */}
        <div className="w-full relative min-h-[31.25rem]">
          <Masonry
            items={masonryItems}
            ease="power3.out"
            duration={0.5}
            stagger={0.03}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.97}
            blurToFocus={true}
            colorShiftOnHover={false}
            onItemClick={handleItemClick}
            renderOverlay={renderOverlay}
          />
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
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-50 p-2.5 sm:p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-purple-600/60 transition-all cursor-pointer shadow-xl"
              aria-label="Close enlarged photo"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Previous Chevron Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/80 border border-white/20 text-white hover:bg-purple-600/60 transition-all cursor-pointer shadow-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            {/* Next Chevron Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/80 border border-white/20 text-white hover:bg-purple-600/60 transition-all cursor-pointer shadow-xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
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
