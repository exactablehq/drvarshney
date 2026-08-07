"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        experience: "Chief Dental Surgeon at Dr. Varshney's Dental Aesthetics · 3+ Years of Clinical Practice (Dental Surgeon)",
        education: "B.D.S. from Gujarat University ",
        specialization: "Aesthetic & Restorative Dentistry, Implantology, Root Canal Therapy",
        bio: "A dedicated and compassionate dental surgeon with over three years of experience in transforming smiles and restoring oral health. Dr. Varshney combines advanced clinical techniques with a gentle, patient-centric approach to deliver exceptional care. Committed to continuous learning and innovation, he specializes in modern aesthetic restorations, pain-free root canal treatments, and long-lasting dental implant solutions.",
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
        expertise: [
            "Senior Implantologist",
            "Advanced Dental Implantology",
            "15+ Years Clinical Experience",
            "Patient-Centered Dental Care"
        ],
        image: "drAnkul_nobg.png"
    },   {
        name: "Dr. Ronit Tiwari",
        credentials: "M.D.S. (Orthodontics & Dentofacial Orthopaedics) · B.D.S.",
        regNo: "Consultant Orthodontist & Dentofacial Orthopedist",
        experience: "AIR 162 (MDS Entrance) · Silver Medalist (BDS 3rd & Final Year) · Senior Lecturer at Vaidik Dental College",
        education: "M.D.S. (GDC Ahmedabad) · B.D.S. (2014–2019) · Vallabh Ashram School",
        specialization: "Evidence-Based Orthodontics, Dentofacial Orthopedics, Facial Aesthetics & Functional Harmony",
        bio: "Dr. Ronit Tiwari is a Consultant Orthodontist and Dentofacial Orthopedist dedicated to providing evidence-based, personalized orthodontic care with a focus on both function and facial aesthetics. An academically distinguished practitioner, he earned Silver Medals in both 3rd and final years of BDS (2014–2019) and secured All India Rank 162 in General Category to pursue MDS in Orthodontics at the prestigious Government Dental College and Hospital, Ahmedabad. Currently serving as Senior Lecturer at Vaidik Dental College and Research Centre",
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
        expertise: [
            "CBCT Scan Interpretation & 3D Imaging",
            "Digital Radiography & Diagnostic Imaging",
            "Maxillofacial Treatment Planning",
            "Radiological Diagnosis & Consultation"
        ],
        image: "drAmit_nobg.png"
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

        // Only trigger doctor switch if horizontal swipe is clearly dominant over vertical scroll
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
        <section id="doctor" className="relative min-h-[85vh] lg:min-h-[80vh] pt-8 pb-12 lg:pt-12 lg:pb-16 bg-[#090611] border-t border-[#35063e]/20 flex flex-col justify-center">
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
                    className="text-center max-w-3xl mx-auto flex flex-col items-center mb-6 lg:mb-10"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15]">
                        Doctor's <span className="beautiful-smiles-glow">Profile</span>
                    </h2>
                </motion.div>

                {/* Doctor Selection Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-5xl mx-auto px-2">
                    {doctorsData.map((doc, idx) => {
                        const firstName = doc.name.split(' ')[0] + ' ' + (doc.name.split(' ')[1] || '');
                        const isActive = idx === activeIndex;
                        return (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                                    isActive
                                        ? "bg-purple-600/90 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400"
                                        : "bg-[#0a0516]/70 text-white/60 hover:text-white hover:bg-purple-900/40 border border-white/10"
                                }`}
                            >
                                {firstName}
                            </button>
                        );
                    })}
                </div>

                {/* Relative Wrapper for Active Doctor & Side Arrows */}
                <div className="relative w-full px-2 sm:px-12 lg:px-16">
                    {/* Left Navigation Arrow */}
                    <button
                        onClick={prevDoctor}
                        className="hidden sm:flex absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-purple-500/30 bg-[#0a0516]/80 text-purple-300 hover:text-white hover:border-purple-400 items-center justify-center transition-all backdrop-blur-[12px] cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.15)] active:scale-95 z-30"
                        aria-label="Previous Doctor"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Right Navigation Arrow */}
                    <button
                        onClick={nextDoctor}
                        className="hidden sm:flex absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-purple-500/30 bg-[#0a0516]/80 text-purple-300 hover:text-white hover:border-purple-400 items-center justify-center transition-all backdrop-blur-[12px] cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.15)] active:scale-95 z-30"
                        aria-label="Next Doctor"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Active Doctor Container with Framer Motion Drag Swipe & Gesture Support */}
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
                                style={{ touchAction: "pan-y" }}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3, ease: "easeOut" as const }}
                                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center touch-pan-y"
                            >
                                {/* Left Column: Large Portrait (~45%) */}
                                <div className="lg:col-span-5 flex justify-center lg:justify-start">
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
                                                    className={`w-full h-full object-contain transition-transform duration-700 hover:scale-102 ${(doctor as any).imageClass || ''}`}
                                                />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Right Column: Editorial Content (~55%) */}
                                <div className="lg:col-span-7 space-y-4 lg:space-y-5 text-left">
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

                                    {/* Grouped Information Panels */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        {/* Panel 1: Qualifications & Experience */}
                                        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#120a24]/40 to-[#0a0516]/60 border border-white/10 backdrop-blur-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.35),_inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-purple-500/35 transition-all duration-300 group">
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
                                        </div>

                                        {/* Panel 2: Areas of Expertise */}
                                        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#120a24]/40 to-[#0a0516]/60 border border-white/10 backdrop-blur-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.35),_inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-purple-500/35 transition-all duration-300 group">
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
                                        </div>
                                    </div>

                                    {/* CTA Buttons: Call Us & Book Appointment on WhatsApp */}
                                    {(doctor.phone || doctor.whatsapp) && (
                                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                            {doctor.phone && (
                                                <motion.a
                                                    href={`tel:${doctor.phone.replace(/\s+/g, '')}`}
                                                    whileHover={{ y: -2, scale: 1.01 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="inline-flex w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out items-center justify-center gap-2 cursor-pointer border border-white/10 hover:border-white/20"
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
                                                    whileHover={{ y: -2, scale: 1.01 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="inline-flex w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#35063e] hover:bg-[#4a0956] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300 ease-out items-center justify-center gap-2 cursor-pointer border border-purple-500/50 hover:border-purple-400"
                                                >
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                    </svg>
                                                    <span>Book Appointment on WhatsApp</span>
                                                </motion.a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Mobile Prev / Next Buttons */}
                    <div className="flex sm:hidden justify-center items-center gap-4 mt-6">
                        <button
                            onClick={prevDoctor}
                            className="w-10 h-10 rounded-full border border-purple-500/30 bg-[#0a0516]/80 text-purple-300 hover:text-white flex items-center justify-center backdrop-blur-[12px] active:scale-95 cursor-pointer"
                            aria-label="Previous Doctor"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-xs text-purple-300 font-semibold">
                            {activeIndex + 1} / {doctorsData.length}
                        </span>
                        <button
                            onClick={nextDoctor}
                            className="w-10 h-10 rounded-full border border-purple-500/30 bg-[#0a0516]/80 text-purple-300 hover:text-white flex items-center justify-center backdrop-blur-[12px] active:scale-95 cursor-pointer"
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
