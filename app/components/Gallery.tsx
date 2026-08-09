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

// Fixed repeating tile-shape pattern (grid-auto-flow: dense fills gaps)
// col-span/row-span cycle: 2x2, 1x1, 1x2, 1x1, 2x1, 1x1 ...
const tileShapes = [
  "sm:col-span-2 sm:row-span-2",
  "col-span-1 row-span-1",
  "sm:row-span-2",
  "col-span-1 row-span-1",
  "sm:col-span-2",
  "col-span-1 row-span-1"
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
    <section id="gallery" className="relative py-16 sm:py-24 lg:py-[140px] overflow-hidden bg-[var(--background)] border-t border-white/[0.06]">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 w-full flex flex-col items-center">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/30 text-xs font-semibold text-[var(--primary-tint)] tracking-wider uppercase mb-6">
            <Camera className="w-3.5 h-3.5" />
            <span>Clinic Showcase</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15]">
            Visual Excellence. Beautiful Smiles.
          </h2>
        </motion.div>

        {/* Gapless bento masonry — cycling fixed tile shapes, shared hairline borders */}
        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] gap-[1.5px] w-full [grid-auto-flow:dense] bg-white/[0.06]">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              onClick={() => setSelectedItemIndex(idx)}
              className={`group relative overflow-hidden cursor-pointer bg-[var(--charcoal-2)] ${tileShapes[idx % tileShapes.length]}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-sm font-semibold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-[var(--primary-tint)] text-[11px] mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  {item.categoryLabel}
                </p>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullsize photo viewer modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItemIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            <button
              onClick={() => setSelectedItemIndex(null)}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[var(--primary)]/60 transition-all cursor-pointer shadow-xl"
              aria-label="Close enlarged photo"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[var(--primary)]/60 transition-all cursor-pointer shadow-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[var(--primary)]/60 transition-all cursor-pointer shadow-xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-6xl max-h-[85vh] z-40 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--primary)]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-black"
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-w-full max-h-[75vh] object-contain select-none"
              />

              <div className="w-full bg-[var(--charcoal-2)]/90 border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-white/60 font-light mt-0.5">
                    {selectedItem.description}
                  </p>
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-[var(--primary)]/30 text-[var(--primary-tint)] shrink-0">
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
