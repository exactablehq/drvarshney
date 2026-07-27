"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Clock,
    Award,
    Stethoscope,
    CalendarDays,
    GraduationCap,
    Brain,
    Heart,
    Shield,
    Users,
    Phone,
    Mail,
    MapPin,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

// Doctor Profile Data List
export const doctorsData = [
    {
        name: "Dr. Ayush Varshney",
        credentials: "B.D.S. (Dental Surgeon)",
        regNo: "Reg. No.: A-22861",
        experience: "8+ Years of Clinical Practice",
        education: "B.D.S. from M.G.D.M. Hospital & Dental College",
        specialization: "Aesthetic & Restorative Dentistry, Implantology, Root Canal Therapy",
        bio: "A dedicated and compassionate dental surgeon with over eight years of experience in transforming smiles and restoring oral health. Dr. Varshney combines advanced clinical techniques with a gentle, patient-centric approach to deliver exceptional care. Committed to continuous learning and innovation, he specializes in modern aesthetic restorations, pain-free root canal treatments, and long-lasting dental implant solutions.",
        expertise: [
            "Aesthetic Smile Makeovers",
            "Pain-Free Root Canal Treatments",
            "Dental Implant Surgery",
            "Cosmetic Bonding & Veneers"
        ],
        image: "about-dentist.png",
        phone: "+91 79774 54648",
        whatsapp: "https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment."
    },
    {
        name: "Dr. Riya Varshney",
        credentials: "M.D.S. (Orthodontist & Dentofacial Orthopedist)",
        regNo: "Reg. No.: A-23145",
        experience: "6+ Years of Specialization",
        education: "M.D.S. from Renowned Dental Sciences College",
        specialization: "Clear Aligners, Invisible Braces, Pediatric Orthodontics",
        bio: "A highly skilled orthodontist specializing in designing beautiful, aligned smiles for children and adults. Dr. Riya Varshney is certified in modern clear aligner systems (like Invisalign) and dedicated to providing comfortable, state-of-the-art orthodontic treatment. Her warm approach ensures a pleasant experience for patients of all ages seeking to perfect their bite and smile alignment.",
        expertise: [
            "Clear Aligner Systems",
            "Invisible & Ceramic Braces",
            "Pediatric Orthodontics",
            "Bite Correction & Alignment"
        ],
        image: "about-dentist-2.png",
        phone: "+91 79774 54648",
        whatsapp: "https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment."
    }
];

// Custom Logo Component (reused from main)
function VarshneyLogo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M26.4 46.1C26.4 33.3 35.8 24.2 49.3 23C62.7 21.8 70 29.5 70 41C70 47.9 66 53 58.7 54.2C51.5 55.4 44.9 51.5 45.4 42.1C45.9 33.7 52.8 28.5 61.3 28.5"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
            />
            <path
                d="M22 60.5C22.6 48.7 33.2 40.5 46 40C58.8 39.5 69.3 46 70.5 57.5C71.7 69 63 76.5 53 76.5C43 76.5 35 70 33 60"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
            />
            <path
                d="M24 76.5C25.2 65.5 35 58 47.3 58.5C59.6 59 68.3 67 68.3 78.5C68.3 90 57.3 97 45.5 97C33.7 97 27.2 88.5 24 76.5Z"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
            />
            <path
                d="M26.5 82C29.2 92.5 35.5 101.2 41 106.5C42.5 108 44 105 44 102.5C44 95 38.5 87 34 82H26.5Z"
                fill="currentColor"
            />
            <path
                d="M66.5 75.5C69.3 80.5 72.8 85.5 75.7 89.2"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
            />
            <rect x="68" y="87" width="18" height="4.5" rx="2.2" fill="currentColor" transform="rotate(8 68 87)" />
            <rect x="70.5" y="93.5" width="15" height="4.5" rx="2.2" fill="currentColor" transform="rotate(8 70.5 93.5)" />
            <rect x="73" y="100" width="12" height="4" rx="2" fill="currentColor" transform="rotate(8 73 100)" />
            <rect x="75.5" y="106" width="9" height="3.5" rx="1.7" fill="currentColor" transform="rotate(8 75.5 106)" />
            <rect x="77.5" y="111.5" width="6" height="3" rx="1.5" fill="currentColor" transform="rotate(8 77.5 111.5)" />
        </svg>
    );
}

export default function DoctorProfile() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth 
                : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section id="doctor" className="relative min-h-[85vh] lg:min-h-[80vh] pt-8 pb-12 lg:pt-12 lg:pb-16 overflow-hidden bg-[#090611] border-t border-[#35063e]/20 flex flex-col justify-center">
            {/* Oversized Background Typography - "DOCTOR" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
                <span className="text-[10vw] sm:text-[12vw] lg:text-[10vw] font-black text-purple-950/[0.035] tracking-[0.15em] uppercase leading-none select-none">
                    DOCTOR
                </span>
            </div>

            {/* Ambient Radial Glows */}
            <div className="absolute top-1/4 left-[5%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-purple-600/[0.03] rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-[5%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-purple-500/[0.03] rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" as const }}
                    className="text-center max-w-3xl mx-auto flex flex-col items-center mb-8 lg:mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15]">
                        Doctor's <span className="beautiful-smiles-glow">Profile</span>
                    </h2>
                </motion.div>

                {/* Relative Wrapper for Carousel & Side Arrows */}
                <div className="relative w-full px-4 sm:px-12 lg:px-0">
                    {/* Left Navigation Arrow */}
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-0 lg:-left-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-purple-500/30 bg-[#0a0516]/80 text-purple-300 hover:text-white hover:border-purple-400 flex items-center justify-center transition-all backdrop-blur-[12px] cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.15)] active:scale-95 z-30"
                        aria-label="Previous Doctor"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Right Navigation Arrow */}
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-0 lg:-right-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-purple-500/30 bg-[#0a0516]/80 text-purple-300 hover:text-white hover:border-purple-400 flex items-center justify-center transition-all backdrop-blur-[12px] cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.15)] active:scale-95 z-30"
                        aria-label="Next Doctor"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Horizontal Scrollable Container */}
                    <div 
                        ref={scrollRef}
                        className="w-full flex gap-12 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {doctorsData.map((doctor, index) => (
                            <div 
                                key={index}
                                className="w-full shrink-0 snap-center snap-always grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center"
                            >
                                {/* Left Column: Large Portrait (~45%) */}
                                <motion.div
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
                                    className="lg:col-span-5 flex justify-center lg:justify-start"
                                >
                                    <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-[4/5] rounded-[32px] overflow-visible">
                                        {/* Ambient Glow Behind Portrait */}
                                        <div className="absolute inset-[-12px] bg-purple-500/10 rounded-[40px] blur-[30px] pointer-events-none -z-10" />

                                        {/* Floating Animation Wrapper */}
                                        <motion.div
                                            animate={{ y: [0, -6, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="relative w-full h-full"
                                        >
                                            {/* Transparent Frame */}
                                            <div className="relative w-full h-full overflow-visible bg-transparent">
                                                <img
                                                    src={doctor.image}
                                                    alt={`${doctor.name} - Dental Surgeon`}
                                                    className="w-full h-full object-contain transition-transform duration-700 hover:scale-102"
                                                />
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Right Column: Editorial Content (~55%) */}
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
                                    className="lg:col-span-7 space-y-4 lg:space-y-5 text-left"
                                >
                                    {/* Badge: "Meet Your Doctor" */}
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0516]/65 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1),_inset_0_1px_0_rgba(255,255,255,0.1)] text-[10px] font-semibold text-purple-300 tracking-wider uppercase backdrop-blur-[10px]">
                                        <Sparkles className="w-3 h-3 text-purple-400" />
                                        <span>Meet Your Doctor</span>
                                    </div>

                                    {/* Editorial Heading */}
                                    <div className="space-y-1">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-[1.05] tracking-tight font-sans">
                                            {doctor.name}
                                        </h2>
                                        <p className="text-sm sm:text-base font-semibold text-purple-300 tracking-wide">
                                            {doctor.credentials} · {doctor.regNo}
                                        </p>
                                    </div>

                                    {/* Professional Description - Compact */}
                                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                                        {doctor.bio}
                                    </p>

                                    {/* Grouped Information Panels (2-3 premium glass panels) - Compact */}
                                    <motion.div
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1"
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        variants={{
                                            hidden: {},
                                            show: {
                                                transition: {
                                                    staggerChildren: 0.1
                                                }
                                            }
                                        }}
                                    >
                                        {/* Panel 1: Qualifications & Experience */}
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
                                            }}
                                            className="p-4 rounded-2xl bg-gradient-to-b from-[#120a24]/40 to-[#0a0516]/60 border border-white/10 backdrop-blur-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.35),_inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-purple-500/35 transition-all duration-300 group"
                                        >
                                            <div className="flex items-start gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Award className="w-3.5 h-3.5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-purple-300 font-bold uppercase tracking-wider block mb-0.5">Qualifications & Experience</span>
                                                    <p className="text-xs font-semibold text-white/90 leading-relaxed group-hover:text-white transition-colors">
                                                        {doctor.experience}
                                                    </p>
                                                    <p className="text-[10px] text-white/50 mt-0.5 leading-relaxed">
                                                        {doctor.education}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Panel 2: Areas of Expertise */}
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.05 } }
                                            }}
                                            className="p-4 rounded-2xl bg-gradient-to-b from-[#120a24]/40 to-[#0a0516]/60 border border-white/10 backdrop-blur-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.35),_inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-purple-500/35 transition-all duration-300 group"
                                        >
                                            <div className="flex items-start gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Stethoscope className="w-3.5 h-3.5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-purple-300 font-bold uppercase tracking-wider block mb-0.5">Areas of Expertise</span>
                                                    <ul className="space-y-0.5">
                                                        {doctor.expertise.map((item, idx) => (
                                                            <li key={idx} className="text-[10px] text-white/70 flex items-start gap-1.5">
                                                                <span className="text-purple-400">•</span>
                                                                <span className="group-hover:text-white/90 transition-colors">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>

                                    {/* CTA Buttons: Call Us & Book Appointment on WhatsApp - Compact */}
                                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                        <motion.a
                                            href={`tel:${doctor.phone.replace(/\s+/g, '')}`}
                                            whileHover={{ y: -2, scale: 1.01, boxShadow: "0px 10px 25px -5px rgba(255, 255, 255, 0.05)" }}
                                            whileTap={{ scale: 0.98 }}
                                            className="inline-flex w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out items-center justify-center gap-2 cursor-pointer border border-white/10 hover:border-white/20"
                                        >
                                            <Phone className="w-4 h-4 text-purple-400" />
                                            <span>Call {doctor.phone}</span>
                                        </motion.a>

                                        <motion.a
                                            href={doctor.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -2, scale: 1.01, boxShadow: "0px 10px 25px -5px rgba(168, 85, 247, 0.3)" }}
                                            whileTap={{ scale: 0.98 }}
                                            className="inline-flex w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#35063e] hover:bg-[#4a0956] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300 ease-out items-center justify-center gap-2 cursor-pointer border border-purple-500/50 hover:border-purple-400"
                                        >
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            <span>Book Appointment on WhatsApp</span>
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}