"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { doctorsData } from "../data/doctors";
import { Award, Stethoscope, Phone, ChevronLeft, ChevronRight } from "lucide-react";

export default function DoctorProfile() {
    const [activeIndex, setActiveIndex] = useState(0);

    const doctor = doctorsData[activeIndex];

    const prevDoctor = () => {
        setActiveIndex((prev) => (prev === 0 ? doctorsData.length - 1 : prev - 1));
    };

    const nextDoctor = () => {
        setActiveIndex((prev) => (prev === doctorsData.length - 1 ? 0 : prev + 1));
    };

    return (
        <section id="doctor" className="relative py-20 lg:py-28 bg-[#030109] flex flex-col justify-center overflow-hidden">
            {/* Oversized Background Typography - "DOCTOR" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
                <span className="text-[10vw] sm:text-[12vw] lg:text-[10vw] font-black text-purple-950/[0.035] tracking-[0.15em] uppercase leading-none select-none">
                    DOCTOR
                </span>
            </div>

            {/* Ambient Radial Glows */}
            <div className="absolute top-1/4 left-[5%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-purple-600/[0.03] rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-[5%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-purple-500/[0.03] rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" as const }}
                    className="text-center max-w-3xl mx-auto flex flex-col items-center mb-14"
                >
                    <div className="h-px w-10 bg-purple-500/60 mb-6" />
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15]">
                        Meet the <span className="beautiful-smiles-glow">Team</span>
                    </h2>
                </motion.div>

                {/* Active Doctor Spread */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, { offset, velocity }) => {
                                const swipe = offset.x;
                                if (swipe < -40 || velocity.x < -400) nextDoctor();
                                else if (swipe > 40 || velocity.x > 400) prevDoctor();
                            }}
                            style={{ touchAction: "pan-y" }}
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -24 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                        >
                            {/* Left: full-bleed portrait with vignette, no floating box */}
                            <div className="lg:col-span-5">
                                <div className="relative w-full max-w-sm mx-auto lg:max-w-none aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#130b21] to-[#05020a]">
                                    <Image
                                        src={`/${doctor.image}`}
                                        alt={`${doctor.name} - Dental Surgeon`}
                                        fill
                                        sizes="(min-width: 1024px) 420px, 90vw"
                                        priority={activeIndex === 0}
                                        className="object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#030109] via-transparent to-transparent" />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none" />
                                </div>
                            </div>

                            {/* Right: editorial content */}
                            <div className="lg:col-span-7 space-y-5 text-left">
                                <div>
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white leading-[1.05] tracking-tight">
                                        {doctor.name}
                                    </h3>
                                    <p className="mt-2 text-xs sm:text-sm font-semibold text-purple-300 tracking-[0.1em] uppercase">
                                        {doctor.credentials}
                                    </p>
                                    <p className="mt-1 text-[11px] text-white/35 tracking-wide">
                                        {doctor.regNo}
                                    </p>
                                </div>

                                <p className="text-white/55 text-sm leading-relaxed font-light max-w-lg">
                                    {doctor.bio}
                                </p>

                                <div className="grid sm:grid-cols-2 gap-6 border-t border-white/10 pt-5">
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
                                                        className="text-[10.5px] text-white/70 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02]"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {(doctor.phone || doctor.whatsapp) && (
                                    <div className="pt-1 flex flex-col sm:flex-row gap-3">
                                        {doctor.phone && (
                                            <motion.a
                                                href={`tel:${doctor.phone.replace(/\s+/g, '')}`}
                                                whileHover={{ y: -2, scale: 1.01 }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                                                className="inline-flex w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-colors duration-300 items-center justify-center gap-2 cursor-pointer border border-white/10 hover:border-white/20"
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
                                                whileHover={{ y: -2, scale: 1.01, boxShadow: "0 0 24px rgba(168,85,247,0.35)" }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                                                className="inline-flex w-full sm:w-auto px-6 py-2.5 rounded-full bg-purple-500/15 hover:bg-purple-500/25 text-purple-100 font-semibold text-sm transition-colors duration-300 items-center justify-center gap-2 cursor-pointer border border-purple-500/40"
                                            >
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                                <span>Book on WhatsApp</span>
                                            </motion.a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Avatar filmstrip selector — replaces the old wrapping text-pill wall */}
                <div className="mt-14 flex items-center justify-center gap-3">
                    <button
                        onClick={prevDoctor}
                        className="hidden sm:flex w-9 h-9 shrink-0 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 items-center justify-center transition-colors cursor-pointer"
                        aria-label="Previous Doctor"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2.5 overflow-x-auto px-2 py-1 max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {doctorsData.map((doc, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <motion.button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.94 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                                    aria-label={doc.name}
                                    className="relative shrink-0"
                                >
                                    <div
                                        className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden transition-all duration-300 ${
                                            isActive
                                                ? "ring-2 ring-purple-400 ring-offset-2 ring-offset-[#030109]"
                                                : "opacity-40 hover:opacity-75"
                                        }`}
                                    >
                                        <Image
                                            src={`/${doc.image}`}
                                            alt={doc.name}
                                            fill
                                            sizes="48px"
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    <button
                        onClick={nextDoctor}
                        className="hidden sm:flex w-9 h-9 shrink-0 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 items-center justify-center transition-colors cursor-pointer"
                        aria-label="Next Doctor"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
