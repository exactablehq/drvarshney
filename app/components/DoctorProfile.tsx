"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { doctorsData } from "../data/doctors";
import {
  Award,
  Stethoscope,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AUTO_ADVANCE_MS = 5500;
const RING_RADIUS = 23;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const contentStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const contentItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// Traversal distance shapes how far the slide travels — hopping 4 doctors at once
// should visibly cover more ground than a single step, not just flip the same 90px.
const travelForDistance = (distance: number) => {
  const magnitude = Math.min(Math.abs(distance), 5);
  return 70 + magnitude * 40;
};

export default function DoctorProfile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [travel, setTravel] = useState({ direction: 1, distance: 1 });
  const [isPaused, setIsPaused] = useState(false);
  const dragActiveRef = useRef(false);
  const totalDoctors = doctorsData.length;

  const doctor = doctorsData[activeIndex];

  // Scroll-scrubbed parallax — the portrait drifts and settles as the section arrives.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["8%", "0%", "-8%"],
  );
  const portraitScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.94, 1, 0.96],
  );

  // Subtle cursor-tilt on the portrait, same magnetic/tilt language as Pillars & the hero CTA.
  const tiltRef = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springRotateX = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const springRotateY = useSpring(tiltY, { stiffness: 150, damping: 18 });

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 14);
    tiltX.set(py * -14);
  };

  const handlePortraitMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Shortest signed hop count around the loop (so jumping from the last thumbnail
  // to the first still reads as "+1", not a huge traversal in the wrong direction).
  const signedDistance = (from: number, to: number) => {
    const raw = to - from;
    const wrapped =
      ((raw + totalDoctors / 2 + totalDoctors) % totalDoctors) -
      totalDoctors / 2;
    return Math.round(wrapped) || raw;
  };

  const goTo = (nextIndex: number) => {
    const distance = signedDistance(activeIndex, nextIndex);
    setTravel({ direction: distance >= 0 ? 1 : -1, distance });
    setActiveIndex(nextIndex);
  };

  const prevDoctor = () => {
    setTravel({ direction: -1, distance: -1 });
    setActiveIndex((prev) => (prev === 0 ? totalDoctors - 1 : prev - 1));
  };

  const nextDoctor = () => {
    setTravel({ direction: 1, distance: 1 });
    setActiveIndex((prev) => (prev === totalDoctors - 1 ? 0 : prev + 1));
  };

  // Auto-advance on inactivity — pauses on hover/drag and restarts its countdown
  // on every change (manual or automatic) so it never fights the visitor.
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setTravel({ direction: 1, distance: 1 });
      setActiveIndex((prev) => (prev + 1) % totalDoctors);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [isPaused, activeIndex, totalDoctors]);

  // Left/right arrow-key navigation, scoped so it doesn't hijack typing elsewhere on the page.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") prevDoctor();
      else if (e.key === "ArrowRight") nextDoctor();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slideVariants = {
    enter: ({ direction, distance }: typeof travel) => ({
      opacity: 0,
      x:
        direction > 0
          ? travelForDistance(distance)
          : -travelForDistance(distance),
    }),
    center: { opacity: 1, x: 0 },
    exit: ({ direction, distance }: typeof travel) => ({
      opacity: 0,
      x:
        direction > 0
          ? -travelForDistance(distance)
          : travelForDistance(distance),
    }),
  };

  return (
    <section
      id="doctor"
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#030109] flex flex-col justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient radial glows — the section's only backdrop, nothing boxed */}
      <div
        className="absolute pointer-events-none rounded-full blur-[160px] z-[5]"
        style={{
          width: "45rem",
          height: "45rem",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.34) 0%, transparent 70%)",
          right: "16%",
          top: "-30%",
        }}
      />
      <div className="absolute inset-0 w-full h-full bg-purple-500/10" />
      {/* Top scrim so the navbar stays legible over the photo */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#030109] to-transparent pointer-events-none z-[6]" />
      {/* Bottom seam — blends the hero into the Services section background */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030109] via-[#030109]/45 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center mb-12 lg:mb-14"
        >
          <div className="h-px w-10 bg-purple-500/60 mb-6" />
          <span className="text-xs font-semibold tracking-[0.25em] text-purple-300/80 uppercase mb-4">
            The Specialists Behind Your Smile
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15]">
            Meet the <span className="beautiful-smiles-glow">Team</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/55 font-light leading-relaxed max-w-xl">
            Decades of combined clinical experience across every specialty —
            each doctor bringing precision, patience, and a genuinely gentle
            hand to your care.
          </p>
        </motion.div>

        {/* Seamless pane — no card, no border, just the figure and gradients.
                    Fixed min-height so the avatar filmstrip below never jumps as bio length varies. */}
        <div className="relative min-h-[45rem] sm:min-h-[40rem] lg:min-h-[30rem]">
          {/* Left Chevron Navigation Button */}
          <button
            onClick={prevDoctor}
            className="absolute -left-3 sm:-left-8 lg:-left-12 top-[55%] lg:top-2/3 -translate-y-1/2 z-30 p-3 rounded-full text-white/70 hover:text-white hover:bg-purple-500/20 hover:border-purple-400/40 backdrop-blur-md transition-all duration-300 shadow-xl flex items-center justify-center group"
            aria-label="Previous specialist"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300 text-purple-300" />
          </button>

          {/* Right Chevron Navigation Button */}
          <button
            onClick={nextDoctor}
            className="absolute -right-3 sm:-right-8 lg:-right-12 top-[55%] lg:top-2/3 -translate-y-1/2 z-30 p-3 rounded-full text-white/70 hover:text-white hover:bg-purple-500/20 hover:border-purple-400/40 backdrop-blur-md transition-all duration-300 shadow-xl flex items-center justify-center group"
            aria-label="Next specialist"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300 text-purple-300" />
          </button>

          <AnimatePresence mode="wait" custom={travel}>
            <motion.div
              key={activeIndex}
              custom={travel}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => {
                dragActiveRef.current = true;
                setIsPaused(true);
              }}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -40 || velocity.x < -400) nextDoctor();
                else if (swipe > 40 || velocity.x > 400) prevDoctor();
                dragActiveRef.current = false;
                setIsPaused(false);
              }}
              ref={tiltRef}
              className="absolute inset-0 w-full grid grid-cols-1 lg:grid-cols-12 items-center"
            >
              {/* Left: portrait floats free, edges dissolving into the page */}
              <div className="relative lg:col-span-5 flex justify-center lg:justify-end px-6 lg:px-0">
                <motion.div
                  style={{ y: portraitY, scale: portraitScale }}
                  className="relative w-full max-w-[18.75rem] sm:max-w-sm lg:max-w-none lg:w-full aspect-[4/5]"
                >
                  {/* Soft ambient glow behind the figure — no box, just light */}
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-purple-500/10 blur-[70px] rounded-full scale-75"
                  />
                  <Image
                    src={`/${doctor.image}`}
                    alt={`${doctor.name} - Dental Surgeon`}
                    fill
                    sizes="(min-width: 1024px) 420px, 90vw"
                    priority={activeIndex === 0}
                    className="object-contain object-bottom"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, black 76%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 76%, transparent 100%)",
                    }}
                  />
                </motion.div>
              </div>

              {/* Right: editorial content, staggered in on every change */}
              <motion.div
                variants={contentStagger}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 space-y-5 text-left p-8 sm:p-10 lg:p-14"
              >
                <motion.div variants={contentItem}>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white leading-[1.05] tracking-tight">
                    {doctor.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-semibold text-purple-300 tracking-[0.1em] uppercase">
                    {doctor.credentials}
                  </p>
                  <p className="mt-1 text-[11px] text-white/35 tracking-wide">
                    {doctor.regNo}
                  </p>
                </motion.div>

                <motion.p
                  variants={contentItem}
                  className="text-white/55 text-sm leading-relaxed font-light max-w-lg"
                >
                  {doctor.bio}
                </motion.p>

                <motion.div
                  variants={contentItem}
                  className="grid sm:grid-cols-2 gap-6 pt-1"
                >
                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-purple-300/80 font-semibold uppercase tracking-[0.14em] block mb-1">
                        Experience
                      </span>
                      <p className="text-xs font-medium text-white/85 leading-relaxed">
                        {doctor.experience}
                      </p>
                      <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">
                        {doctor.education}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Stethoscope className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-[10px] text-purple-300/80 font-semibold uppercase tracking-[0.14em] block mb-1.5">
                        Expertise
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {doctor.expertise.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[10.5px] text-white/70 px-2.5 py-1 rounded-full bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* {(doctor.phone || doctor.whatsapp) && (
                  <motion.div
                    variants={contentItem}
                    className="pt-1 flex flex-col sm:flex-row gap-3"
                  >
                    {doctor.phone && (
                      <motion.a
                        href={`tel:${doctor.phone.replace(/\s+/g, "")}`}
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 22,
                        }}
                        className="inline-flex w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.05] text-white font-semibold text-sm transition-colors duration-300 items-center justify-center gap-2 cursor-pointer"
                      >
                        <Phone className="w-4 h-4 text-purple-400" />
                        <span>Call {doctor.phone}</span>
                      </motion.a>
                    )}

                    {doctor.whatsapp && (
                      <motion.a
                        href={doctor.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          y: -2,
                          scale: 1.01,
                          boxShadow: "0 0 24px rgba(168,85,247,0.35)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 22,
                        }}
                        className="inline-flex w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-b from-purple-500/25 to-purple-500/10 hover:from-purple-500/35 hover:to-purple-500/15 text-purple-100 font-semibold text-sm transition-colors duration-300 items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span>Book on WhatsApp</span>
                      </motion.a>
                    )}
                  </motion.div>
                )} */}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile-only dash indicators — the full filmstrip gets visually dense
                    with 14 doctors on a narrow screen, so dots take over as the "you are here" cue. */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 pt-8 pb-1">
          {doctorsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to doctor ${idx + 1}`}
              className="p-1"
            >
              <motion.span
                animate={{
                  width: idx === activeIndex ? 18 : 5,
                  backgroundColor:
                    idx === activeIndex
                      ? "rgba(216,180,254,0.9)"
                      : "rgba(255,255,255,0.2)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="block h-1.5 rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Avatar filmstrip — borderless, with name tooltips on hover (desktop) */}
        <div className="relative hidden sm:flex items-center justify-center gap-3 overflow-x-auto px-6 pt-6 lg:pt-30 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {doctorsData.map((doc, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.button
                key={idx}
                onClick={() => goTo(idx)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                aria-label={doc.name}
                className="group/thumb relative shrink-0 cursor-pointer"
              >
                {/* Hover tooltip */}
                <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  <span className="text-[10px] font-medium text-white bg-[#130b21]/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
                    {doc.name}
                  </span>
                </div>

                <div
                  className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "shadow-[0_0_0_2px_rgba(168,85,247,0.8)] opacity-100"
                      : "opacity-35 group-hover/thumb:opacity-80"
                  }`}
                >
                  <Image
                    src={`/${doc.image}`}
                    alt={doc.name}
                    fill
                    sizes="44px"
                    className="object-cover object-top"
                  />
                </div>
                {isActive && (
                  <svg
                    className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] -rotate-90 pointer-events-none"
                    viewBox="0 0 50 50"
                  >
                    {/* Dim track, always visible while active */}
                    <circle
                      cx="25"
                      cy="25"
                      r={RING_RADIUS}
                      fill="none"
                      stroke="rgba(168,85,247,0.2)"
                      strokeWidth="2"
                    />
                    {/* Progress sweep — a full lap = time until the next auto-advance.
                                            Omitted while paused so it visibly "holds" instead of ticking on. */}
                    {!isPaused && (
                      <motion.circle
                        key={`${activeIndex}-progress`}
                        cx="25"
                        cy="25"
                        r={RING_RADIUS}
                        fill="none"
                        stroke="rgb(216,180,254)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={RING_CIRCUMFERENCE}
                        initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{
                          duration: AUTO_ADVANCE_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </svg>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
