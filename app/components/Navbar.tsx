"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Calendar } from "lucide-react";

const LINKS = [
  { id: "services", label: "Services" },
  { id: "doctor", label: "Doctor" },
  { id: "contact", label: "Contact" },
];

const WHATSAPP_LINK =
  "https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const trackedIds = ["hero", ...LINKS.map((l) => l.id)];
      const headerOffset = 160;
      let current = "hero";
      for (const id of trackedIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset && rect.bottom > 80) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflowY = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4 sm:px-6">
      <nav
        className={`relative flex w-full max-w-3xl items-center justify-between rounded-full transition-all duration-500 px-5 py-3 sm:px-7 sm:py-3.5 transform-gpu ${
          scrolled
            ? "bg-black/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "bg-transparent shadow-none backdrop-blur-none"
        }`}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          aria-label="Dr. Varshney's Dental Aesthetics — Home"
          whileHover={{ scale: 1.05, filter: "brightness(1.15)" }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex shrink-0 items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#030109] border border-purple-500/30 shrink-0">
            <Image
              src="/logo.png"
              alt="Dr. Varshney's Logo"
              width={28}
              height={28}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="hidden sm:block font-semibold text-sm tracking-wide text-white leading-none">
            Dr. Varshney&apos;s
          </span>
        </motion.a>

        {/* Desktop links — 3 only, centered */}
        <ul className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
          {LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className={`relative font-medium text-xs tracking-wider uppercase transition-colors duration-300 ${
                    isActive ? "text-purple-300" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveDot"
                      className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 24px rgba(168,85,247,0.4)",
            }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/15 px-5 py-2.5 font-semibold text-xs tracking-wide text-purple-200 backdrop-blur-sm transition-colors duration-300"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book
          </motion.a>

          <button
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 active:scale-95 md:hidden"
          >
            <Menu className={`w-4 h-4 transition-transform duration-300 ${menuOpen ? "rotate-90" : ""}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-full left-0 right-0 z-40 mt-3 overflow-hidden rounded-3xl bg-black/80 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl md:hidden"
            >
              <ul className="flex flex-col gap-5">
                {LINKS.map((link, idx) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className={`flex items-center justify-between font-serif text-xl transition-colors ${
                        activeSection === link.id ? "text-purple-300" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {activeSection === link.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                      )}
                    </a>
                  </motion.li>
                ))}
                <div className="pt-2">
                  <motion.a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    className="block rounded-full border border-purple-500/40 bg-purple-500/15 py-3.5 text-center font-semibold text-xs tracking-wide text-purple-200 uppercase transition-colors hover:bg-purple-500 hover:text-black"
                  >
                    Book Appointment
                  </motion.a>
                </div>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
