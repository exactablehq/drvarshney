"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Award,
    Stethoscope,
    Phone,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

// Doctor Profile Data List — content preserved verbatim.
// Dr. Ayush Varshney (index 0) is the primary/hero doctor; the rest are secondary team members.
// NOTE: `philosophy` is an invented one-line philosophy statement per the redesign brief where the
// original data had no such line — derived from each doctor's existing `bio` field. Please review/edit.
export const doctorsData = [
    {
        name: "Dr. Ayush Varshney",
        credentials: "B.D.S. (Dental Surgeon)",
        regNo: "Reg. No.: A-22861",
        experience: "Chief Dental Surgeon at Dr. Varshney's Dental Aesthetics · 3+ Years of Clinical Practice (Dental Surgeon)",
        education: "B.D.S. from Gujarat University ",
        specialization: "Aesthetic & Restorative Dentistry, Implantology, Root Canal Therapy",
        bio: "A dedicated and compassionate dental surgeon with over three years of experience in transforming smiles and restoring oral health. Dr. Varshney combines advanced clinical techniques with a gentle, patient-centric approach to deliver exceptional care. Committed to continuous learning and innovation, he specializes in modern aesthetic restorations, pain-free root canal treatments, and long-lasting dental implant solutions.",
        philosophy: "Every treatment plan is built on honesty first, precision second.",
        expertise: [
            "Aesthetic Smile Makeovers",
            "Pain-Free Root Canal Treatments",
            "Dental Implant Surgery",
            "Cosmetic Bonding & Veneers"
        ],
        image: "drAyush_nobg.png",
        phone: "+91 79774 54648",
        whatsapp: "https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment."
    },
    {
        name: "Dr. Poorav P. Patel",
        credentials: "M.D.S. (Pedodontics & Preventive Dentistry) · B.D.S.",
        regNo: "Consultant Pediatric Dentist · Rank 3 Gujarat University",
        experience: "3rd Rank M.D.S. Gujarat University · National Best Poster Winner (ISPPD 2023)",
        education: "M.D.S. (GDC Ahmedabad) · B.D.S. (GDC Jamnagar)",
        specialization: "Conscious Sedation (Nitrous Oxide), GA Rehabilitation, Zirconia Crowns & Pediatric Dentistry",
        bio: "Dr. Poorav P. Patel is an academically distinguished Consultant Pediatric Dentist (Pedodontist) who secured 3rd Rank in M.D.S. at Gujarat University (GDC Ahmedabad) and won the National Best Poster Award at ISPPD 2023. He specializes in comprehensive, gentle pediatric oral healthcare, non-pharmacological behavior management (Tell-Show-Do), conscious sedation (Nitrous Oxide / Laughing Gas), and full mouth rehabilitation under General Anesthesia (GA) for uncooperative or anxious children. Dr. Patel is highly skilled in pediatric root canals (Pulpectomy, Apexification), Zirconia & Stainless Steel Crowns, trauma management, habit breaking appliances, and special needs dentistry.",
        philosophy: "Gentle, anxiety-free care so every child's first visit becomes a good memory.",
        expertise: [
            "Conscious Sedation & GA Rehabilitation",
            "Pulpectomy & Zirconia / Steel Crowns",
            "Trauma Care & Habit Breaking Appliances",
            "Special Care Dentistry & Fluoride Therapy"
        ],
        image: "drPoorav_nobg.png",

    },
    {
        name: "Dr. Aakash Pankaj Parmar",
        credentials: "M.D.S. (Orthodontics & Dentofacial Orthopaedics)",
        regNo: "Consultant Orthodontist",
        experience: "5+ Years of Orthodontic Practice",
        education: "M.D.S. (Vyas Dental College) · B.D.S. (Vaidik Dental College)",
        specialization: "Self-Ligating Braces, Invisible Aligners (Orthodontics), TADs",
        bio: "Dynamic and results-driven Orthodontist with over 5 years of specialized experience in creating beautiful smiles and enhancing oral health. Dr. Aakash Parmar is dedicated to delivering exceptional care and achieving optimal treatment outcomes using advanced orthodontic systems, clear aligners, and skeletal anchorage procedures.",
        philosophy: "Results-driven alignment, delivered with unwavering attention to detail.",
        expertise: [
            "Invisible Orthodontics (Aligners)",
            "Self-Ligating & Bracket Systems",
            "Skeletal Anchorage System (TADs)",
            "Myo-functional Appliance Therapy"
        ],
        image: "drAakash_nobg.png"
    },
    {
        name: "Dr. Vishal Rohit",
        credentials: "M.D.S. (Orthodontics)",
        regNo: "Visiting Consultant · Certified Invisalign Provider",
        experience: "Visiting Consultant Orthodontist",
        education: "GDC Kozhikode · GDC Thrissur · GDC Indore",
        specialization: "Invisalign, Clear Aligners & Advanced Orthodontics",
        bio: "Visiting Consultant Orthodontist and certified Invisalign Provider with extensive training across prestigious institutions including GDC Kozhikode, GDC Thrissur, and GDC Indore. Dr. Vishal Rohit specializes in state-of-the-art clear aligner therapy, orthodontic alignment, and comprehensive smile corrections.",
        philosophy: "State-of-the-art aligner therapy, tailored to how you actually live.",
        expertise: [
            "Invisalign & Clear Aligners",
            "Orthodontic Braces & Alignment",
            "Dentofacial Orthopaedics",
            "Esthetic Smile Corrections"
        ],
        image: "dr3_nobg.png",

    },
    {
        name: "Dr. Kunjan Patel",
        credentials: "M.D.S. (Oral & Maxillofacial Surgery) · Gold Medalist",
        regNo: "Consultant Oral & Maxillofacial Surgeon",
        experience: "Gold Medalist · University First Rank (M.D.S.)",
        education: "M.D.S. (Pacific Dental College) · B.D.S. (Gujarat University)",
        specialization: "Facial Trauma, Orthognathic Surgery, TMJ Disorders & Maxillofacial Procedures",
        bio: "Academically distinguished Gold Medalist and Oral & Maxillofacial Surgeon specializing in facial trauma, orthognathic jaw surgery, TMJ disorders, and complex dentoalveolar surgeries. Dr. Kunjan Patel brings surgical precision, clinical excellence, and patient-centered care to advanced reconstructive and rehabilitation procedures.",
        philosophy: "Surgical precision in service of a calm, patient-first recovery.",
        expertise: [
            "Facial Trauma & Fracture Surgery",
            "Orthognathic & Jaw Correction",
            "TMJ Disorders & Maxillofacial Care",
            "Complex Tooth Extractions & Biopsies"
        ],
        image: "dr4_nobg.png",

    },
    {
        name: "Dr. Het M. Shah",
        credentials: "B.D.S., M.D.S. (Oral & Maxillofacial Surgery & Implantology)",
        regNo: "Chief Oral & Maxillofacial Surgeon · National Award Winner",
        experience: "Dr. R. Ahemad National Student Award Winner · 5 Registered Copyrights",
        education: "M.D.S. (Oral & Maxillofacial Surgery) · B.D.S.",
        specialization: "Dental Implants, Maxillofacial Trauma, Oral Pathology & TMJ Disorders",
        bio: "Dr. Het M. Shah is our Chief Oral & Maxillofacial Surgeon and the proud recipient of the Dr. R. Ahemad National Student Award for Best Postgraduate Academic Excellence. He specializes in dental implants, oral and maxillofacial surgery, maxillofacial trauma, oral pathology, and TMJ disorders, delivering advanced surgical care with precision, compassion, and the latest evidence-based techniques. Dr. Shah also pursues his keen interest in academics having 5 registered copyrights in his name. Experienced in performing complex oral and maxillofacial procedures under sedation and general anesthesia, Dr. Shah is committed to restoring oral health, function, facial aesthetics, and patient confidence through personalized treatment.",
        philosophy: "Evidence-based surgical care, restoring function and confidence together.",
        expertise: [
            "Dental Implants & Implantology",
            "Maxillofacial Trauma & Reconstruction",
            "Oral Pathology & TMJ Disorders",
            "Surgeries Under Sedation & GA"
        ],
        image: "dr5_nobg.png",


    },
    {
        name: "Dr. Heli Patel",
        credentials: "M.D.S. (Periodontology & Implantology) · B.D.S.",
        regNo: "Consultant Periodontist & Implantologist",
        experience: "Periodontist & Implantologist",
        education: "M.D.S. Periodontology & Implantology (Karnavati School of Dentistry) · B.D.S. (Dharamsinh Desai University)",
        specialization: "Periodontology, Dental Implantology, Bone Grafting & Laser Dentistry",
        bio: "Passionate and detail-oriented Periodontist and Implantologist with extensive training in diagnosing and treating periodontal diseases, soft and hard tissue management, and implant placements. Skilled in patient education, surgical procedures, and interdisciplinary treatment planning. Dedicated to providing high-quality dental care while staying updated with the latest advancements in periodontology and implantology.",
        philosophy: "Detail-oriented tissue care, built on patient education first.",
        expertise: [
            "Periodontal Surgery & Soft Tissue Management",
            "Dental Implantology (Placement & Restoration)",
            "Bone Grafting & Sinus Augmentation",
            "Laser-Assisted Periodontal Therapy"
        ],
        image: "drHeli_nobg.png",

    },
    {
        name: "Dr. Basav Joshi",
        credentials: "M.D.S. (Prosthodontics) · B.D.S.",
        regNo: "Consultant Prosthodontist & Implantologist",
        experience: "2+ Years of Clinical Experience in Prosthodontics & Restorative Dentistry",
        education: "M.D.S. Prosthodontics (2024) · B.D.S. (2018)",
        specialization: "Prosthodontics, Dental Implantology, Full Mouth Rehabilitation & Smile Design",
        bio: "Dedicated and skilled Prosthodontist with expertise in restorative and implant dentistry, committed to delivering high-quality patient care with precision, aesthetics, and modern treatment approaches. Passionate about full mouth rehabilitation and prosthetic excellence.",
        philosophy: "Restorative dentistry where precision and aesthetics are never traded off.",
        expertise: [
            "Full Mouth Rehabilitation",
            "Dental Implant & Implant Prosthesis",
            "Fixed & Removable Prosthodontics",
            "Smile & Occlusal Rehabilitation"
        ],
        image: "drBasav_gen_nobg.png",

    },
    {
        name: "Dr. Riddhika H. Shah",
        credentials: "M.D.S. (Pediatric & Preventive Dentistry) · Gold Medalist",
        regNo: "Chief Pediatric & Preventive Dentist",
        experience: "Gold Medalist in Pediatric Dentistry · Chief Pediatric & Preventive Dentist",
        education: "M.D.S. (Pediatric & Preventive Dentistry)",
        specialization: "Pediatric Dentistry, Oral Sedation, Nitrous Oxide (Laughing Gas) Sedation & Special Needs Care",
        bio: "Dr. Riddhika H. Shah is our Chief Pediatric & Family Dentist, committed to providing gentle, compassionate dental care for children, adults, and specially abled individuals. With expertise in Child Dentistry, Oral Sedation, and Nitrous Oxide (Laughing Gas) Sedation, she creates safe, comfortable, and anxiety-free dental experiences for every patient.",
        philosophy: "Safe, anxiety-free dentistry for every patient, of every age and ability.",
        expertise: [
            "Child & Family Dentistry",
            "Nitrous Oxide (Laughing Gas) Sedation",
            "Oral Sedation & Anxiety-Free Care",
            "Special Needs Dentistry"
        ],
        image: "drRiddhika_nobg.png"
    },
    {
        name: "Dr. Hitesh Patel",
        credentials: "Senior Microdentist & Implantologist",
        regNo: "Root Canal Specialist · 15+ Years of Experience",
        experience: "15+ Years of Clinical Experience in Microscopic Dentistry & Implantology",
        education: "Rajiv Gandhi University (2010)",
        specialization: "Advanced Microscopic Dentistry, Root Canal Treatment & Dental Implants",
        bio: "With 15+ years of clinical experience, Dr. Hitesh Patel specializes in advanced microscopic dentistry, root canal treatment, and dental implant procedures. He is committed to providing precise, painless, and high-quality dental care using modern techniques and technology.",
        philosophy: "Microscopic precision, fifteen years in the making, applied to every root canal.",
        expertise: [
            "Senior Microdentist & Implantologist",
            "Root Canal Specialist",
            "Advanced Microscopic Dentistry",
            "Dental Implant Procedures"
        ],
        image: "drHitesh_nobg.png"
    },
    {
        name: "Dr. Ankur Patel",
        credentials: "Senior Implantologist",
        regNo: "15+ Years of Experience",
        experience: "15+ Years of Clinical Experience in Dental Implantology",
        education: "Rajiv Gandhi University (2010)",
        specialization: "Advanced Dental Implantology & Patient-Centered Care",
        bio: "With 15+ years of clinical experience, Dr. Ankur Patel specializes in advanced dental implantology and is committed to providing precise, reliable, and patient-centered dental care using modern techniques and technology.",
        philosophy: "Reliable, patient-centered implantology built on fifteen years of practice.",
        expertise: [
            "Senior Implantologist",
            "Advanced Dental Implantology",
            "15+ Years Clinical Experience",
            "Patient-Centered Dental Care"
        ],
        image: "drAnkul_nobg.png"
    }, {
        name: "Dr. Ronit Tiwari",
        credentials: "M.D.S. (Orthodontics & Dentofacial Orthopaedics) · B.D.S.",
        regNo: "Consultant Orthodontist & Dentofacial Orthopedist",
        experience: "AIR 162 (MDS Entrance) · Silver Medalist (BDS 3rd & Final Year) · Senior Lecturer at Vaidik Dental College",
        education: "M.D.S. (GDC Ahmedabad) · B.D.S. (2014–2019) · Vallabh Ashram School",
        specialization: "Evidence-Based Orthodontics, Dentofacial Orthopedics, Facial Aesthetics & Functional Harmony",
        bio: "Dr. Ronit Tiwari is a Consultant Orthodontist and Dentofacial Orthopedist dedicated to providing evidence-based, personalized orthodontic care with a focus on both function and facial aesthetics. An academically distinguished practitioner, he earned Silver Medals in both 3rd and final years of BDS (2014–2019) and secured All India Rank 162 in General Category to pursue MDS in Orthodontics at the prestigious Government Dental College and Hospital, Ahmedabad. Currently serving as Senior Lecturer at Vaidik Dental College and Research Centre",
        philosophy: "Evidence-based orthodontics balancing function with facial harmony.",
        expertise: [
            "Evidence-Based Orthodontic Care",
            "Dentofacial Orthopedics & Growth Modulation",
            "Facial Aesthetics & Functional Balance",
            "Tailored Aligners & Braces Therapy"
        ],
        image: "drRonit_nobg.png"
    },
    {
        name: "Dr. Pal Desai",
        credentials: "M.D.S. (Oral & Maxillofacial Pathology)",
        regNo: "Consulting Oral & Maxillofacial Pathologist · Senior Lecturer",
        experience: "Consulting Oral & Maxillofacial Pathologist · Senior Lecturer",
        education: "M.D.S. in Oral & Maxillofacial Pathology",
        specialization: "Oral & Maxillofacial Pathology, Histopathological Evaluation & Early Cancer Detection",
        bio: "Dr. Pal Desai is a highly qualified Consulting Oral & Maxillofacial Pathologist with an MDS in Oral & Maxillofacial Pathology and currently serves as a Senior Lecturer. Dedicated to diagnosis and microscopic evaluation (histopathological evaluation) of diseases affecting the oral cavity, jaws, salivary glands, and maxillofacial region. A strong emphasis is placed on the early detection of oral potentially malignant disorders and oral cancer, helping improve patient outcomes through prompt intervention.",
        philosophy: "Early detection, careful diagnosis, better outcomes.",
        expertise: [
            "Histopathological & Microscopic Evaluation",
            "Early Detection of Oral Cancer",
            "Oral Potentially Malignant Disorders (OPMDs)",
            "Salivary Gland & Maxillofacial Pathology"
        ],
        image: "drPal_nobg.png"
    },
    {
        name: "Dr. Amit Mathur",
        credentials: "Oral & Maxillofacial Radiologist",
        regNo: "Consultant Oral & Maxillofacial Radiologist · 16+ Years Experience",
        experience: "16+ Years of Clinical Experience in Advanced Maxillofacial Imaging",
        education: "Specialist in Oral & Maxillofacial Radiology",
        specialization: "CBCT Scan Interpretation, Digital Radiography & Maxillofacial Diagnostic Imaging",
        bio: "Dr. Amit Mathur is a highly experienced Oral and Maxillofacial Radiologist with over 16 years of expertise in advanced dental and maxillofacial imaging. He specializes in the interpretation of CBCT scans, digital radiography, and diagnostic imaging for accurate treatment planning in dentistry and maxillofacial care. Known for his precision, clinical excellence, and patient-centered approach, Dr. Mathur is committed to delivering reliable radiological diagnosis and supporting comprehensive dental treatment outcomes.",
        philosophy: "Precise imaging is the foundation every treatment plan stands on.",
        expertise: [
            "CBCT Scan Interpretation & 3D Imaging",
            "Digital Radiography & Diagnostic Imaging",
            "Maxillofacial Treatment Planning",
            "Radiological Diagnosis & Consultation"
        ],
        image: "drAmit_nobg.png"
    }

];

export default function DoctorProfile() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchStartY, setTouchStartY] = useState<number | null>(null);

    const doctor = doctorsData[activeIndex];

    const prevDoctor = () => {
        setActiveIndex((prev) => (prev === 0 ? doctorsData.length - 1 : prev - 1));
    };

    const nextDoctor = () => {
        setActiveIndex((prev) => (prev === doctorsData.length - 1 ? 0 : prev + 1));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null || touchStartY === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchStartX - touchEndX;
        const deltaY = touchStartY - touchEndY;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
            if (deltaX > 0) {
                nextDoctor();
            } else {
                prevDoctor();
            }
        }
        setTouchStartX(null);
        setTouchStartY(null);
    };

    return (
        <section id="doctor" className="relative py-16 sm:py-24 lg:py-[140px] bg-[var(--background)] border-t border-white/[0.06] overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 w-full">

                {/* Doctor Selection Tabs (horizontal-scroll on mobile) */}
                <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-2 mb-10 sm:mb-14 -mx-5 px-5 sm:mx-0 sm:px-0 pb-1" style={{ scrollbarWidth: "none" }}>
                    {doctorsData.map((doc, idx) => {
                        const firstName = doc.name.split(' ')[0] + ' ' + (doc.name.split(' ')[1] || '');
                        const isActive = idx === activeIndex;
                        return (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`shrink-0 px-3.5 py-2 min-h-[36px] rounded-full text-xs font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap ${isActive
                                    ? "bg-[var(--primary)] text-white"
                                    : "bg-transparent text-white/50 hover:text-white border border-white/10"
                                    }`}
                            >
                                {firstName}
                            </button>
                        );
                    })}
                </div>

                {/* Relative Wrapper for Active Doctor & Side Arrows */}
                <div className="relative w-full">
                    <button
                        onClick={prevDoctor}
                        className="hidden lg:flex absolute -left-6 top-[38%] -translate-y-1/2 w-11 h-11 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-[var(--primary)]/50 items-center justify-center transition-all cursor-pointer z-30"
                        aria-label="Previous Doctor"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={nextDoctor}
                        className="hidden lg:flex absolute -right-6 top-[38%] -translate-y-1/2 w-11 h-11 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-[var(--primary)]/50 items-center justify-center transition-all cursor-pointer z-30"
                        aria-label="Next Doctor"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="w-full relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = offset.x;
                                    if (swipe < -40 || velocity.x < -400) {
                                        nextDoctor();
                                    } else if (swipe > 40 || velocity.x > 400) {
                                        prevDoctor();
                                    }
                                }}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                style={{ touchAction: "pan-y" }}
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -24 }}
                                transition={{ duration: 0.3, ease: "easeOut" as const }}
                                className="w-full grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-14 items-center touch-pan-y"
                            >
                                {/* Bust image — 60% width on desktop, contained top image on mobile */}
                                <div className="lg:col-span-6 flex justify-center lg:justify-start">
                                    <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[4/5] lg:aspect-[5/6] rounded-3xl lg:rounded-none overflow-hidden lg:overflow-visible">
                                        <div className="absolute inset-0 lg:hidden rounded-3xl overflow-hidden bg-[var(--charcoal-2)]">
                                            <img
                                                src={doctor.image}
                                                alt={`${doctor.name} - Dental Surgeon`}
                                                className="w-full h-full object-cover object-top"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
                                        </div>
                                        <div className="hidden lg:block relative w-full h-full">
                                            <img
                                                src={doctor.image}
                                                alt={`${doctor.name} - Dental Surgeon`}
                                                className="w-full h-full object-contain object-bottom"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Text column — 40% on desktop, with vertical accent line */}
                                <div className="lg:col-span-4 relative lg:pl-10 space-y-6 text-left">
                                    <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-[var(--primary)]/60 via-[var(--primary)]/20 to-transparent" />

                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--primary)]/30 text-[10px] font-semibold text-[var(--primary-tint)] tracking-wider uppercase">
                                        <Sparkles className="w-3 h-3" />
                                        <span>Meet Your Doctor</span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-white leading-[1.05] tracking-tight">
                                            {doctor.name}
                                        </h2>
                                        <p className="text-sm font-medium text-[var(--primary-tint)]">
                                            {doctor.credentials} · {doctor.regNo}
                                        </p>
                                    </div>

                                    {/* One confident philosophy line */}
                                    <p className="text-white/85 text-base sm:text-lg font-serif italic leading-snug">
                                        &ldquo;{doctor.philosophy}&rdquo;
                                    </p>

                                    <p className="text-white/55 text-sm leading-relaxed font-light">
                                        {doctor.bio}
                                    </p>

                                    {/* Qualifications row — horizontal pills, scroll if overflow */}
                                    <div className="space-y-2">
                                        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider">
                                            <Award className="w-3 h-3" /> Qualifications
                                        </span>
                                        <div className="flex overflow-x-auto gap-2 pb-1" style={{ scrollbarWidth: "none" }}>
                                            {[doctor.experience, doctor.education].filter(Boolean).map((q, i) => (
                                                <span key={i} className="shrink-0 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/25 text-[11px] text-white/75 whitespace-nowrap">
                                                    {q}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Expertise row — horizontal pills, scroll if overflow */}
                                    <div className="space-y-2">
                                        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider">
                                            <Stethoscope className="w-3 h-3" /> Areas of Expertise
                                        </span>
                                        <div className="flex overflow-x-auto gap-2 pb-1" style={{ scrollbarWidth: "none" }}>
                                            {doctor.expertise.map((item, idx) => (
                                                <span key={idx} className="shrink-0 px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] text-white/75 whitespace-nowrap">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {(doctor.phone || doctor.whatsapp) && (
                                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                            {doctor.phone && (
                                                <a
                                                    href={`tel:${doctor.phone.replace(/\s+/g, '')}`}
                                                    className="inline-flex w-full sm:w-auto px-6 py-3 min-h-[48px] rounded-full border border-white/15 text-white font-medium text-sm items-center justify-center gap-2 hover:border-white/30 transition-colors"
                                                >
                                                    <Phone className="w-4 h-4 text-[var(--primary-tint)]" />
                                                    <span>Call {doctor.phone}</span>
                                                </a>
                                            )}

                                            {doctor.whatsapp && (
                                                <a
                                                    href={doctor.whatsapp}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex w-full sm:w-auto px-6 py-3 min-h-[48px] rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium text-sm items-center justify-center gap-2 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                    </svg>
                                                    <span>Book Appointment on WhatsApp</span>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Mobile Prev / Next indicator */}
                    <div className="flex lg:hidden justify-center items-center gap-4 mt-8">
                        <button
                            onClick={prevDoctor}
                            className="w-11 h-11 rounded-full border border-white/10 text-white/50 hover:text-white flex items-center justify-center active:scale-95 cursor-pointer"
                            aria-label="Previous Doctor"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-xs text-[var(--primary-tint)] font-medium">
                            {activeIndex + 1} / {doctorsData.length}
                        </span>
                        <button
                            onClick={nextDoctor}
                            className="w-11 h-11 rounded-full border border-white/10 text-white/50 hover:text-white flex items-center justify-center active:scale-95 cursor-pointer"
                            aria-label="Next Doctor"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
