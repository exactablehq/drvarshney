"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  category: "transformations" | "ambience" | "technology" | "care";
  categoryLabel: string;
  description: string;
  image: string;
  tag: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Smile Aesthetic Transformation",
    category: "transformations",
    categoryLabel: "Smile Design",
    description: "Complete cosmetic veneer & smile restoration achieved through digital smile design precision.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=85",
    tag: "Cosmetic Dentistry"
  },
  {
    id: "gal-2",
    title: "Modern Clinical Suite",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Ultra-sterile, tranquil, and comfortable treatment rooms designed for patient relaxation.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85",
    tag: "Infrastructure"
  },
  {
    id: "gal-3",
    title: "3D Digital Imaging & Diagnostics",
    category: "technology",
    categoryLabel: "Advanced Tech",
    description: "High-precision digital intraoral scanners & 3D CBCT imaging for painless diagnostic accuracy.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=85",
    tag: "Digital Tech"
  },
  {
    id: "gal-4",
    title: "Precision Dental Implantology",
    category: "transformations",
    categoryLabel: "Restorative",
    description: "Natural-looking permanent dental implants crafted for optimal functionality & speech alignment.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1400&q=85",
    tag: "Implants"
  },
  {
    id: "gal-5",
    title: "Sterile Procedure Setup",
    category: "ambience",
    categoryLabel: "Safety First",
    description: "Gold-standard autoclave sterilization protocols and surgical hygiene standards.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=85",
    tag: "Hygiene"
  },
  {
    id: "gal-6",
    title: "Invisalign & Clear Aligners",
    category: "transformations",
    categoryLabel: "Orthodontics",
    description: "Virtually invisible aligner solutions tailored to straighten teeth seamlessly without metal braces.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1400&q=85",
    tag: "Orthodontics"
  }
];

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
    <section id="gallery" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-[#090611] border-t border-[#35063e]/20 flex flex-col justify-center">
      
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
          {/* Glassmorphism pill badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a0516]/65 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1),_inset_0_1px_0_rgba(255,255,255,0.1)] text-xs font-semibold text-purple-300 tracking-wider uppercase backdrop-blur-[10px] mb-6">
            <Camera className="w-3.5 h-3.5 text-purple-400" />
            <span>Clinic Showcase</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Visual Excellence. <span className="beautiful-smiles-glow">Beautiful Smiles.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Explore our clinical environment, digital dental technology, and smile transformations. Click any photo to enlarge.
          </p>
        </motion.div>

        {/* Pure Photo Gallery Grid (No Filter Categories) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedItemIndex(idx)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] bg-[#0e071b] border border-purple-500/20 cursor-pointer shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_12px_35px_rgba(168,85,247,0.25)]"
            >
              {/* Photo Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Subtle Ambient Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090611]/90 via-[#090611]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                {/* Top Category Tag */}
                <div className="flex justify-start">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#0a0516]/80 border border-purple-500/40 text-purple-300 backdrop-blur-md">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Title & Zoom Icon */}
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-purple-300 text-xs mt-0.5 flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      {item.categoryLabel}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-purple-600/80 text-white flex items-center justify-center shrink-0 border border-purple-400/50 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
              <div className="w-full bg-[#0a0516]/90 border-t border-purple-500/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
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
