"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  Star,
  Sparkles,
  ShieldCheck,
  Award,
  Activity,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Heart,
  Smile,
  Info,
  MapPin,
  Menu,
  Trash2,
  HelpCircle,
  CalendarDays,
  Play,
  ArrowUp
} from "lucide-react";

// Types
interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  fullDetails: string;
  priceRange: string;
  duration: string;
  benefits: string[];
  faqs: { q: string; a: string }[];
}

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  doctor: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

// Custom logo component representing the Tooth with Implant Screw threads
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

// Numerical Count Up animation component triggered when visible
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, setRef] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const animateCount = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const current = Math.floor(easeProgress * end);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            }
          };
          requestAnimationFrame(animateCount);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, value]);

  return <span ref={setRef}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Page Load State
  const [isLoading, setIsLoading] = useState(true);

  // Scroll Y position tracker
  const [scrollY, setScrollY] = useState(0);

  // Active section tracker for shared underline nav transitions
  const [activeSection, setActiveSection] = useState("Home");

  // Mobile Nav Open/Close
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Form Submission submission loading hooks
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contact Form focused labels
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Booking Form Fields
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Scaling & Polishing",
    doctor: "Dr. Ayush Varshney, B.D.S. (Dental Surgeon)",
    date: "",
    timeSlot: "10:00 AM",
    notes: ""
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [lastBookedAppointment, setLastBookedAppointment] = useState<Appointment | null>(null);

  // Load appointments and handle mounting
  useEffect(() => {
    const saved = localStorage.getItem("varshney_appointments");
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing appointments", e);
      }
    }

    // Elegant mounting timer delay for loaders
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Listen to window scroll positions
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Simple viewport checking to switch active links
      const sections = ["hero", "about", "services", "scheduler", "faq"];
      const scrollPos = window.scrollY + 220;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            const labelMap: Record<string, string> = {
              hero: "Home",
              about: "About Us",
              services: "Services",
              scheduler: "Appointments"
            };
            if (labelMap[sec]) {
              setActiveSection(labelMap[sec]);
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save appointments helper
  const saveAppointments = (newAppointments: Appointment[]) => {
    setAppointments(newAppointments);
    localStorage.setItem("varshney_appointments", JSON.stringify(newAppointments));
  };

  // Handle Form Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date) {
      alert("Please fill in your name, phone number, and preferred date.");
      return;
    }

    setIsSubmitting(true);

    // Simulate clinical API validation with delay
    setTimeout(() => {
      const newAppt: Appointment = {
        id: "appt-" + Date.now(),
        name: bookingForm.name,
        email: bookingForm.email || "N/A",
        phone: bookingForm.phone,
        service: bookingForm.service,
        doctor: bookingForm.doctor,
        date: bookingForm.date,
        timeSlot: bookingForm.timeSlot,
        notes: bookingForm.notes
      };

      const updated = [newAppt, ...appointments];
      saveAppointments(updated);
      setLastBookedAppointment(newAppt);
      setBookingSuccess(true);
      setIsSubmitting(false);

      // Reset Form
      setBookingForm(prev => ({
        ...prev,
        service: "Scaling & Polishing",
        doctor: "Dr. Ayush Varshney, B.D.S. (Dental Surgeon)",
        date: "",
        notes: ""
      }));
    }, 1200);
  };

  const handleCancelAppointment = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      const filtered = appointments.filter(a => a.id !== id);
      saveAppointments(filtered);
    }
  };



  // Selected Service Detail Modal/Drawer State
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceDetail | null>(null);



  // Active FAQ index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Services Data
  const services: ServiceDetail[] = [
    {
      id: "scaling",
      title: "Scaling & Polishing",
      description: "Routine checkups, cleanings, and preventative care to keep your gums healthy and remove stubborn plaque.",
      fullDetails: "Our professional scaling uses ultrasonic cleaners to safely break down stubborn plaque and tartar deposits without scratching your enamel. Complete with stain-lifting abrasive polish.",
      priceRange: "Standard clinical rates",
      duration: "30 - 45 mins",
      benefits: ["Prevents gum swelling", "Removes deep coffee/tobacco stains", "Freshens breath instantly", "Eliminates harmful oral bacteria"],
      faqs: [
        { q: "Does scaling damage teeth enamel?", a: "Not at all. Ultrasonic scalers only vibrate off foreign tartar deposits without affecting the hard structure of your teeth." },
        { q: "How often should I get scaling done?", a: "Every 6 months is recommended to prevent gingivitis and severe gum recession." }
      ]
    },
    {
      id: "filling",
      title: "Tooth Filling",
      description: "Restore teeth structure decayed by cavities using high-durability composite resins that color-match natural enamel.",
      fullDetails: "We utilize modern biocompatible tooth-colored composite resins. After removing decay, the resin is layered, shaped, and cured with a high-intensity light for immediate chewing function.",
      priceRange: "Based on cavity depth",
      duration: "20 - 40 mins",
      benefits: ["Blends perfectly with your tooth shade", "Restores structural stability", "Prevents decay spreading deeper", "Mercury-free biocompatible materials"],
      faqs: [
        { q: "How long do composite fillings last?", a: "Typically 5–10 years depending on location, chewing force, and your routine flossing habits." },
        { q: "Is the filling procedure painful?", a: "No. Local anesthesia ensures you feel zero discomfort during decay removal." }
      ]
    },
    {
      id: "extraction",
      title: "Tooth Extraction",
      description: "Safe, sterile, and pain-free removal of severely broken, heavily infected, or problematic wisdom teeth.",
      fullDetails: "If a tooth is too damaged to be saved by a filling or root canal, we perform gentle extractions under controlled anesthesia. We focus on preserving surrounding jawbone structure.",
      priceRange: "Dependent on case complexity",
      duration: "30 - 60 mins",
      benefits: ["Stops severe localized pain", "Prevents spread of deep abscesses", "Creates room for orthodontic alignment", "Fast recovery protocol"],
      faqs: [
        { q: "What is the recovery time after extraction?", a: "Initial socket clotting occurs within 24 hours. Full tissue healing takes about 7 to 10 days." },
        { q: "Do wisdom teeth always need to be removed?", a: "Only if they are impacted, causing pain, crowding adjacent molars, or leading to recurrent decay." }
      ]
    },
    {
      id: "rct",
      title: "Root Canal Treatment",
      description: "Save deeply decayed or infected teeth. Painless cleaning of root canal tissues, sealed to prevent tooth loss.",
      fullDetails: "When decay reaches the inner pulp of the tooth, RCT is necessary to save it. We clean the infected pulp channels, sterilize, fill with gutta-percha, and seal with a protective crown.",
      priceRange: "Varies by tooth roots",
      duration: "1 - 2 visits",
      benefits: ["Resolves throbbing, acute pain", "Saves natural tooth structure", "Prevents bone infection in the jaw", "Restores normal biting pressure"],
      faqs: [
        { q: "Is Root Canal Treatment painful?", a: "It actually relieves pain. Modern local anesthetics make it as comfortable as getting a standard filling." },
        { q: "Is a crown always necessary after RCT?", a: "Yes, because removing the pulp leaves the tooth brittle. A crown protects it from cracking under bite pressure." }
      ]
    },
    {
      id: "crowns",
      title: "Crowns & Bridges, Dentures",
      description: "Aesthetic porcelain caps and multi-unit bridge structures to replace missing teeth and restore chewing strength.",
      fullDetails: "Whether you need a single crown to protect a cracked tooth, a bridge spanning a gap, or customized partial/full dentures, we build custom dental prosthetics with comfortable fitment.",
      priceRange: "Based on selected material",
      duration: "2 visits",
      benefits: ["Restores proper bite alignment", "Prevents adjacent teeth from shifting", "Enhances smile aesthetics", "Restores clear speaking and chewing"],
      faqs: [
        { q: "What is the difference between a crown and a bridge?", a: "A crown covers a single damaged tooth. A bridge uses neighboring teeth as anchors to fill a gap left by missing teeth." },
        { q: "How do I care for my dental bridge?", a: "Clean under the bridge daily using specialized floss threaders, alongside standard brushing." }
      ]
    },
    {
      id: "implants",
      title: "Implants",
      description: "Permanent replacement roots made of bio-compatible titanium posts, capped with premium porcelain crowns.",
      fullDetails: "Implants anchor directly into the jawbone, acting as synthetic tooth roots. Once integrated, a custom crown is secured onto the post. This prevents bone loss and looks identical to natural teeth.",
      priceRange: "Consultation required",
      duration: "3 - 6 months (healing phase)",
      benefits: ["Prevents jawbone erosion", "No slipping, shifts, or speech issues", "Matches surrounding teeth perfectly", "Lifetime durability with good hygiene"],
      faqs: [
        { q: "Are dental implants safe?", a: "Yes, they have a success rate of over 95% and utilize biocompatible titanium which integrates naturally with bone." },
        { q: "How long does a dental implant last?", a: "While the crown may need replacement after 10-15 years, the implant screw itself can last a lifetime." }
      ]
    },
    {
      id: "ortho",
      title: "Braces & Aligners",
      description: "Straighten crowded or spaced teeth using traditional brackets or modern clear invisible aligners.",
      fullDetails: "We provide orthodontic assessments for both children and adults. Options range from durable metal braces to advanced removable clear aligners that straighten teeth discreetly.",
      priceRange: "Custom plan duration dependent",
      duration: "6 - 24 months",
      benefits: ["Closes gaps and aligns teeth", "Corrects overbites, underbites, and crossbites", "Discreet clear options available", "Improves long-term oral hygiene"],
      faqs: [
        { q: "Am I too old for braces/aligners?", a: "Orthodontic movement can be done at any age as long as your teeth and gums are healthy." },
        { q: "How often do aligners need to be worn?", a: "Clear aligners should be worn for 20 to 22 hours per day, only removed when eating or brushing." }
      ]
    },
    {
      id: "kids",
      title: "Children Dental Care",
      description: "Gentle, stress-free dental checkups, sealants, and cavity prevention methods customized for young patients.",
      fullDetails: "We create a welcoming, friendly space for kids. Our treatments focus on monitoring dental development, applying protective fluoride coatings, sealing deep grooves, and building healthy habits.",
      priceRange: "Special pediatric rates",
      duration: "20 - 30 mins",
      benefits: ["Stress-free, gentle handling", "Protective dental sealants", "Early developmental monitoring", "Fun, educational checkup style"],
      faqs: [
        { q: "When should a child have their first visit?", a: "Within six months of their first tooth erupting, or by their first birthday." },
        { q: "What are dental sealants for kids?", a: "Thin plastic coatings painted on the chewing surfaces of back teeth to prevent food from getting trapped in deep grooves." }
      ]
    }
  ];

  // Doctors / Clinic Specialists list
  const doctors = [
    {
      name: "Dr. Ayush Varshney",
      credentials: "B.D.S. (Dental Surgeon)",
      role: "Lead Dental Surgeon & Aesthetics Specialist",
      reg: "Reg. No.: A-22861",
      experience: "8+ Years Exp",
      image: "about-dentist.png",
      bio: "Expert in aesthetic teeth restorations, cosmetic design, root canals, and modern implant solutions.",
      email: "dr.varshneydental@gmail.com"
    },
    {
      name: "Dr. Ananya Sharma",
      credentials: "M.D.S. (Orthodontist)",
      role: "Consultant Orthodontist & Aligner Specialist",
      reg: "Reg. No.: A-25412",
      experience: "6+ Years Exp",
      image: "dental_patient.png",
      bio: "Expert in digital aligner systems, braces for adults and kids, and developmental pediatric checkups.",
      email: "dr.varshneydental@gmail.com"
    }
  ];

  // FAQs List
  const generalFaqs = [
    {
      question: "What are the clinic timings?",
      answer: "We are open from 10:00 AM to 1:00 PM and from 4:00 PM to 8:00 PM, Monday to Saturday. Sunday is closed except for emergency cases."
    },
    {
      question: "Where is the clinic located?",
      answer: "Our clinic is located at: Shop No. 105, Dutt Sagar Appt. Above IDBI Bank, Airport Road, Nani Daman. Parking is easily accessible along Airport Road."
    },
    {
      question: "How can I book an appointment?",
      answer: "You can book directly using our website's side-by-side booking card, the scheduler modal, by emailing us at dr.varshneydental@gmail.com, or by calling us at +91 79774 54648."
    },
    {
      question: "Do you offer emergency dental extraction or root canal relief?",
      answer: "Yes, we prioritize walk-ins and emergency cases experiencing acute throbbing pain, dental fractures, or swelling during our operational hours."
    }
  ];

  // Testimonials Carousel Logic
  const reviews = [
    {
      text: "The team at Dr. Varshney's Dental Aesthetics is amazing! They are professional, gentle and truly care about their patients. I highly recommend them to anyone looking for a great dentist.",
      author: "Jessica M.",
      role: "Root Canal Patient",
      stars: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces"
    },
    {
      text: "Dr. Ayush explained everything clearly. The scaling and composite tooth filling was completely painless. Exceptional post-care guidance and very clean facilities.",
      author: "Rahul S.",
      role: "Scaling & Restoration Patient",
      stars: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces"
    },
    {
      text: "My child felt so relaxed during her dental checkup. The staff is patient, friendly, and they have excellent pediatric sealants. Highly recommend for children's dental care!",
      author: "Priya P.",
      role: "Mother of 6yo Patient",
      stars: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
    }
  ];

  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [carouselHovered, setCarouselHovered] = useState(false);

  useEffect(() => {
    if (carouselHovered) return;
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [carouselHovered, reviews.length]);

  // Framer Motion spring config details
  const springTransition = shouldReduceMotion
    ? { duration: 0.1 }
    : { type: "spring" as const, stiffness: 90, damping: 14 };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: springTransition
    }
  };

  // ------------------ LOADING SPLASH SCREEN ------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090611] flex flex-col justify-center items-center relative overflow-hidden bg-grid-pattern">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        <div className="relative flex flex-col items-center space-y-6 z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.06, 1],
              opacity: 1,
              boxShadow: ["0 0 15px rgba(53, 6, 62, 0.2)", "0 0 35px rgba(53, 6, 62, 0.45)", "0 0 15px rgba(53, 6, 62, 0.2)"]
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.4 },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-20 h-20 rounded-full bg-[#0e071b] border-2 border-[#35063e] flex items-center justify-center p-3 text-[#D8B4FE]"
          >
            <VarshneyLogo className="w-full h-full text-[#D8B4FE]" />
          </motion.div>

          <div>
            <h2 className="text-2xl font-black tracking-wider text-white">DR. VARSHNEY'S</h2>
            <p className="text-[10px] uppercase font-bold text-[#D8B4FE] tracking-[0.25em] mt-1">Dental Aesthetics</p>
          </div>

          {/* Simple animated loading loader strip */}
          <div className="w-48 h-1 bg-[#35063e]/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1/2 h-full bg-[#35063e] rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090611] text-[#FFFFFF] relative selection:bg-[#35063e]/40 selection:text-[#FFFFFF] bg-grid-pattern">

      {/* Background radial overlays */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute top-[8%] left-[-8%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#35063e]/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[48%] right-[-8%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#35063e]/6 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "-3s" }} />
      {/* ------------------ NAVBAR ------------------ */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl bg-[#0a0516]/70 backdrop-blur-[20px] border border-purple-500/30 rounded-[28px] shadow-[0_10px_35px_rgba(0,0,0,0.55),_0_0_15px_rgba(168,85,247,0.15),_inset_0_1px_0_rgba(255,255,255,0.1),_inset_0_0_12px_rgba(168,85,247,0.1)] transition-all duration-300">
        <div className="px-6 py-3.5 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#logo-gradient)"
                  strokeWidth="4"
                  fill="transparent"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "283 0" }}
                  animate={{ strokeDasharray: "240 43", rotate: 360 }}
                  whileHover={{ strokeDasharray: "190 93" }}
                  transition={{
                    strokeDasharray: { duration: 1.5, ease: "easeOut" },
                    rotate: { duration: 12, repeat: Infinity, ease: "linear" }
                  }}
                />
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D8B4FE" />
                    <stop offset="50%" stopColor="#D8B4FE" />
                    <stop offset="100%" stopColor="#35063e" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.div
                whileHover={{ scale: 1.06 }}
                className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center bg-[#090611] z-10"
              >
                <img src="/logo.png" alt="Dr. Varshney's Logo" className="w-full h-full object-cover rounded-full" />
              </motion.div>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wide text-white block group-hover:text-[#D8B4FE] transition-colors leading-none">
                DR. VARSHNEY'S
              </span>
              <span className="text-[8px] uppercase font-bold text-[#D8B4FE] tracking-[0.2em] block mt-0.5">
                Dental Aesthetics
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/70">
            {["Home", "About Us", "Services", "Appointments", "Contact Us"].map((link) => {
              const isActive = activeSection === link;
              const linkTarget =
                link === "Home" ? "#hero" :
                  link === "About Us" ? "#about" :
                    link === "Services" ? "#services" :
                      link === "Appointments" ? "#scheduler" : "#faq";

              return (
                <a
                  key={link}
                  href={linkTarget}
                  className={`relative py-1 transition-colors duration-300 ease-in-out hover:text-white ${isActive ? "text-white font-bold" : "text-white/60"
                    }`}
                >
                  <span>{link}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      transition={{ type: "spring", stiffness: 180, damping: 24 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Booking Trigger CTA Button */}
          <div className="hidden md:flex items-center">
            <motion.button
              whileHover={{ y: -1.5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setBookingForm(prev => ({ ...prev, service: "Scaling & Polishing" }));
                setIsBookingOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#090611]/85 border border-purple-500/40 hover:border-purple-400 text-white font-semibold text-xs flex items-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Book Appointment</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#D8B4FE] hover:text-white cursor-pointer transition-colors duration-300"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/10 mt-3 pt-3 overflow-hidden"
            >
              <div className="px-6 pb-6 flex flex-col gap-4 text-white/70">
                {["Home", "About Us", "Services", "Appointments", "Contact Us"].map((link) => (
                  <a
                    key={link}
                    href={link === "Home" ? "#hero" : link === "About Us" ? "#about" : link === "Services" ? "#services" : link === "Appointments" ? "#scheduler" : "#faq"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-base font-semibold hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
                <div className="border-t border-white/10 pt-4">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setBookingForm(prev => ({ ...prev, service: "Scaling & Polishing" }));
                      setIsBookingOpen(true);
                    }}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-purple-800 to-indigo-900 border border-purple-500/30 text-white font-semibold text-center cursor-pointer transition-all duration-300"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ------------------ HERO SECTION ------------------ */}
      <section
        id="hero"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden group/hero min-h-screen flex flex-col justify-between"
      >
        {/* Subtle background noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay pointer-events-none z-0" />

        {/* Subtle background depth light behind hero content */}
        <div
          className="absolute pointer-events-none rounded-full blur-[150px] opacity-40 z-0"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
            left: "5%",
            top: "15%",
          }}
        />

        {/* Soft purple radial glow behind the image */}
        <div
          className="absolute pointer-events-none rounded-full blur-[160px] opacity-30 z-0"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
            right: "5%",
            top: "20%",
          }}
        />

        {/* Mouse follow spotlight glow */}
        <div
          className="absolute pointer-events-none opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500 rounded-full blur-[130px] z-0"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)",
            left: `${mousePos.x - 200}px`,
            top: `${mousePos.y - 200}px`,
          }}
        />

        {/* Oversized background typography "DENTAL" */}
        <div className="absolute top-[18%] left-[4%] text-[15vw] font-serif font-black text-white/[0.012] select-none pointer-events-none tracking-[0.15em] leading-none z-0 uppercase">
          DENTAL
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-7">

              {/* Doctor Badge */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-[20px] bg-[#18022a]/30 backdrop-blur-md border border-[#35063e]/40 text-white text-xs font-semibold tracking-wide w-fit transition-colors duration-300 hover:border-[#35063e]/80"
              >
                <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3 text-[#D8B4FE]" />
                </div>
                <span>Dr. Ayush Varshney B.D.S, (Dental Surgeon)</span>
              </motion.div>

              {/* Serif Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-serif font-light text-white tracking-tight leading-[1.05] flex flex-col gap-1.5">
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="block"
                  >
                    Healthy Teeth.
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                    className="block text-[#A78BFA]"
                  >
                    Beautiful Smiles.
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                    className="block"
                  >
                    Forever.
                  </motion.span>
                </span>
              </h1>

              {/* Description Paragraph */}
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
                className="text-white/60 text-base sm:text-lg max-w-lg leading-relaxed font-sans"
              >
                Advanced dental care with a gentle touch, modern technology, and a commitment to your perfect smile.
              </motion.p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                {/* Book Appointment (Primary) */}
                <motion.button
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    y: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.2 },
                    opacity: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.2 }
                  }}
                  whileHover={{ y: -2, scale: 1.01, boxShadow: "0px 10px 25px -5px rgba(168, 85, 247, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setBookingForm(prev => ({ ...prev, service: "Scaling & Polishing" }));
                    setIsBookingOpen(true);
                  }}
                  className="px-8 py-3.5 rounded-full bg-[#35063e] hover:bg-[#4a0956] text-white font-semibold text-base shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300 ease-out flex items-center gap-2 cursor-pointer border border-purple-500/50 hover:border-purple-400"
                >
                  <CalendarDays className="w-5 h-5 text-white" />
                  <span>Book Appointment</span>
                </motion.button>

                {/* Watch Clinic Tour (Secondary) */}
                <motion.button
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    y: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.4 },
                    opacity: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.4 }
                  }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-3.5 rounded-full bg-transparent border border-white/20 text-white font-semibold text-base shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center p-1 shrink-0">
                    <Play className="w-2.5 h-2.5 fill-white text-white translate-x-[0.5px]" />
                  </div>
                  <span>Watch Clinic Tour</span>
                </motion.button>
              </div>

            </div>

            {/* Right Column: Hero Image with Polished Glass Frame */}
            <div className="lg:col-span-6 flex justify-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                className="relative w-full max-w-lg aspect-[4/3] rounded-[36px] overflow-visible"
              >
                {/* Faint purple ambient glow behind the image to blend it into the background */}
                <div className="absolute inset-[-15px] bg-purple-500/5 rounded-[40px] blur-[30px] pointer-events-none -z-10" />

                {/* Slow float animation */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full border border-purple-500/30 rounded-[36px] shadow-[0_10px_35px_rgba(0,0,0,0.55),_0_0_15px_rgba(168,85,247,0.15)] overflow-hidden bg-[#0a0516]/70 backdrop-blur-[20px]"
                >
                  <motion.img
                    src="hero-dental.png"
                    alt="Premium Dental Care at Dr. Varshney's Dental Aesthetics"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                  />

                  {/* Glass overlay: 4% dark tint to blend naturally */}
                  <div className="absolute inset-0 bg-[#090514]/4 mix-blend-multiply pointer-events-none" />

                  {/* Inset shadows: top highlight and internal glow matching the navbar */}
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_inset_0_0_12px_rgba(168,85,247,0.12)]" />
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Bottom Statistics Glassmorphic Panel */}
        <div className="w-[92%] max-w-7xl mx-auto mt-12 mb-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="w-full rounded-[32px] bg-black/40 backdrop-blur-[16px] border border-white/10 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          >
            {/* Stat 1 */}
            <div className="flex items-center gap-4 text-left px-4">
              <div className="w-12 h-12 rounded-full border border-purple-500/20 bg-purple-500/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white leading-none">15</span>
                  <span className="text-xl font-bold text-purple-400 leading-none">+</span>
                </div>
                <div className="text-xs font-semibold text-white/90 mt-1">Years Experience</div>
                <div className="text-[10px] text-white/40 mt-0.5">Delivering Excellence</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 text-left px-4 lg:border-l lg:border-white/10">
              <div className="w-12 h-12 rounded-full border border-purple-500/20 bg-purple-500/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Smile className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white leading-none">5000</span>
                  <span className="text-xl font-bold text-purple-400 leading-none">+</span>
                </div>
                <div className="text-xs font-semibold text-white/90 mt-1">Happy Patients</div>
                <div className="text-[10px] text-white/40 mt-0.5">Trust & Satisfaction</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 text-left px-4 lg:border-l lg:border-white/10">
              <div className="w-12 h-12 rounded-full border border-purple-500/20 bg-purple-500/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white leading-none">98</span>
                  <span className="text-xl font-bold text-purple-400 leading-none">%</span>
                </div>
                <div className="text-xs font-semibold text-white/90 mt-1">Success Rate</div>
                <div className="text-[10px] text-white/40 mt-0.5">In Dental Treatments</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 text-left px-4 lg:border-l lg:border-white/10">
              <div className="w-12 h-12 rounded-full border border-purple-500/20 bg-purple-500/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white leading-none">Modern</div>
                <div className="text-xs font-semibold text-white/90 mt-1">Technology</div>
                <div className="text-[10px] text-white/40 mt-0.5">Precision & Comfort</div>
              </div>
            </div>
          </motion.div>

          {/* Scroll to explore */}
          <div className="flex flex-col items-center justify-center gap-1.5 mt-8 text-white/40 text-[11px] font-medium tracking-widest uppercase">
            <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              />
            </div>
            <span>Scroll to explore</span>
          </div>
        </div>

      </section>

      {/* ------------------ SERVICES SECTION ------------------ */}
      <section id="services" className="py-24 relative border-y border-[#35063e]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-4 mb-16"
          >
            <span className="text-[#D8B4FE] font-extrabold tracking-widest text-xs uppercase block">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Complete Dental Care for You & Your Family</h2>
            <div className="h-1 w-16 bg-[#35063e] mx-auto rounded-full mt-2" />
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(139, 92, 246, 0.4)" }}
                className="relative group p-6 rounded-2xl bg-gradient-to-b from-[#0e071b] to-[#0b0715] border border-[#35063e]/20 hover:shadow-xl hover:shadow-[#35063e]/40 transition-all flex flex-col justify-between min-h-[260px] text-left"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D8B4FE] to-[#35063e] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-2xl" />

                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#35063e]/10 border border-[#35063e]/30 text-[#D8B4FE] w-fit transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {service.id === "scaling" && <Sparkles className="w-6 h-6" />}
                    {service.id === "filling" && <Smile className="w-6 h-6" />}
                    {service.id === "extraction" && <ShieldCheck className="w-6 h-6" />}
                    {service.id === "rct" && <Heart className="w-6 h-6" />}
                    {service.id === "crowns" && <Activity className="w-6 h-6" />}
                    {service.id === "implants" && <Award className="w-6 h-6" />}
                    {service.id === "ortho" && <Info className="w-6 h-6" />}
                    {service.id === "kids" && <Smile className="w-6 h-6" />}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#D8B4FE] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-text-muted/60 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#35063e]/20 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#D8B4FE]/80">{service.priceRange}</span>
                  <button
                    onClick={() => setActiveServiceDetail(service)}
                    className="flex items-center gap-1 text-sm font-bold text-[#D8B4FE] group-hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ------------------ ABOUT US & BOOKING CARD SIDE-BY-SIDE ------------------ */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: About Us */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <span className="text-[#D8B4FE] font-extrabold tracking-widest text-xs uppercase block">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">Your Smile is Our Passion</h2>
              <p className="text-text-secondary/70 text-base leading-relaxed">
                At Dr. Varshney's Dental Aesthetics, we combine advanced clinical technology with a compassionate approach to deliver exceptional dental care for patients of all ages. Dr. Ayush Varshney specializes in modern restorations, implants, root canals, and pediatric dental solutions.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                {[
                  "Experienced & Caring Dentists",
                  "State-of-the-art Technology",
                  "Personalized Treatment Plans",
                  "Comfort-Focused Care"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-text-secondary">
                    <div className="w-5 h-5 rounded-full bg-[#35063e]/25 text-[#D8B4FE] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Image beneath text */}
              <div className="pt-4 max-w-md aspect-[16/9] rounded-2xl overflow-hidden border border-[#35063e]/30 shadow-md bg-[#35063e]/10">
                <img
                  src="about-dentist.png"
                  alt="Dentist checking patient smile"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-104"
                />
              </div>
            </motion.div>

            {/* Right Column: Dark Purple Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0e071b] to-[#0b0715] text-white border border-[#35063e]/30 shadow-2xl relative text-left">

                {/* Heading */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2.5 text-[#D8B4FE]">
                    <CalendarDays className="w-6 h-6" />
                    <span className="font-extrabold text-lg tracking-wide uppercase">Book Your Appointment</span>
                  </div>
                  <p className="text-text-secondary/60 text-sm">We'll help you take the first step to a healthier smile.</p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">

                  {/* Name Input wrapper with floating animation */}
                  <div className="space-y-1 relative">
                    <label className="text-[10px] text-[#D8B4FE] font-bold uppercase tracking-wider block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onFocus={() => setFocusedInput("name")}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${focusedInput === "name" ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]" : "border-[#35063e]/20"
                        }`}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#D8B4FE] font-bold uppercase tracking-wider block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onFocus={() => setFocusedInput("phone")}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="79774 54648"
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${focusedInput === "phone" ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]" : "border-[#35063e]/20"
                        }`}
                    />
                  </div>

                  {/* Email & Date Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-[#D8B4FE] font-bold uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        value={bookingForm.email}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${focusedInput === "email" ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]" : "border-[#35063e]/20"
                          }`}
                      />
                    </div>

                    {/* Date */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-[#D8B4FE] font-bold uppercase tracking-wider block">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingForm.date}
                        onFocus={() => setFocusedInput("date")}
                        onBlur={() => setFocusedInput(null)}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm cursor-pointer transition-all ${focusedInput === "date" ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]" : "border-[#35063e]/20"
                          }`}
                      />
                    </div>

                  </div>

                  {/* Service Choice */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#D8B4FE] font-bold uppercase tracking-wider block">Select Service *</label>
                    <select
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0e071b] border border-[#35063e]/20 focus:border-[#35063e] focus:outline-none text-white text-sm cursor-pointer"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title} className="bg-[#0e071b]">{s.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes / Message */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#D8B4FE] font-bold uppercase tracking-wider block">Message (Optional)</label>
                    <textarea
                      rows={2}
                      value={bookingForm.notes}
                      onFocus={() => setFocusedInput("notes")}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      placeholder="Share symptoms or questions with us..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${focusedInput === "notes" ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]" : "border-[#35063e]/20"
                        }`}
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#35063e] hover:bg-[#4a0956] text-white font-bold text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Book Appointment</span>
                      )}
                    </motion.button>
                  </div>

                </form>

                {/* Form success confirmation layer */}
                <AnimatePresence>
                  {bookingSuccess && lastBookedAppointment && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-[#0e071b] rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-6 z-10 border border-[#35063e]/30"
                    >
                      {/* Checkmark animation */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
                        className="w-16 h-16 rounded-full bg-[#090611] border border-[#35063e] text-[#D8B4FE] flex items-center justify-center mx-auto"
                      >
                        <Check className="w-8 h-8 stroke-[3]" />
                      </motion.div>

                      <div className="space-y-2">
                        <h4 className="text-2xl font-extrabold text-white">Booking Confirmed!</h4>
                        <p className="text-sm text-text-secondary/60 max-w-xs mx-auto">
                          Hi {lastBookedAppointment.name}, your request for {lastBookedAppointment.service} has been successfully logged.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0e071b] border border-[#35063e]/20 text-left text-xs space-y-2 w-full max-w-sm">
                        <div><span className="text-[#D8B4FE]">Practitioner:</span> <span className="text-white font-bold">{lastBookedAppointment.doctor}</span></div>
                        <div><span className="text-[#D8B4FE]">Date & Time:</span> <span className="text-white font-bold">{lastBookedAppointment.date} at {lastBookedAppointment.timeSlot}</span></div>
                      </div>

                      <button
                        onClick={() => setBookingSuccess(false)}
                        className="px-6 py-2 rounded-full bg-[#35063e] hover:bg-[#4a0956] text-white font-semibold text-xs transition-all cursor-pointer"
                      >
                        Book Another Session
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ------------------ CLINIC SPECIALISTS (DOCTORS) SECTION ------------------ */}
      <section className="py-24 relative border-y border-[#35063e]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-4 mb-16"
          >
            <span className="text-[#D8B4FE] font-extrabold tracking-widest text-xs uppercase block">Our Team</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Meet Our Dental Specialists</h2>
            <p className="text-text-muted/60 text-sm">
              Highly trained professionals dedicated to aesthetic precision, comfortable care, and modern techniques.
            </p>
            <div className="h-1 w-16 bg-[#35063e] mx-auto rounded-full mt-2" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {doctors.map((doc, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, borderColor: "rgba(53, 6, 62, 0.45)" }}
                className="p-6 rounded-3xl bg-[#0e071b]/60 border border-[#35063e]/20 transition-all flex flex-col sm:flex-row gap-6 items-center text-left relative overflow-hidden group shadow-lg"
              >
                {/* Doctor Image Container */}
                <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-[#35063e]/20 relative">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                </div>

                {/* Details */}
                <div className="space-y-2 relative z-10">
                  <span className="text-[10px] font-bold text-[#D8B4FE] bg-[#35063e]/20 border border-[#35063e]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {doc.experience}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 leading-none">{doc.name}</h3>
                  <p className="text-[11px] text-[#D8B4FE] font-semibold">{doc.credentials}</p>
                  <p className="text-xs text-text-muted/80 leading-relaxed font-semibold">{doc.role}</p>
                  <p className="text-[11px] text-text-secondary/65 leading-relaxed">{doc.bio}</p>

                  {/* Sliding Social Handles on hover */}
                  <div className="pt-2 flex items-center gap-4 text-xs text-[#D8B4FE]">
                    <a href={`mailto:${doc.email}`} className="hover:text-white transition-colors flex items-center gap-1 font-semibold">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Doctor</span>
                    </a>
                  </div>
                </div>

                {/* Background soft hover glow shape */}
                <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-[#35063e]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#35063e]/15 transition-all" />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>





      {/* ------------------ APPOINTMENT SCHEDULER SECTION ------------------ */}
      <section id="scheduler" className="py-24 relative border-t border-[#35063e]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-[#D8B4FE] font-bold tracking-widest text-xs uppercase block">Self Service Portal</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Your Scheduled Appointments</h2>
            <p className="text-text-muted/60 text-base">
              Add new sessions or manage existing visits in real-time. Changes sync instantly on your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Quick booking trigger block */}
            <motion.div
              whileHover={{ y: -5 }}
              className="lg:col-span-4 p-8 rounded-2xl bg-gradient-to-b from-[#0e071b] to-[#0b0715] border border-[#35063e]/25 text-left space-y-6 shadow-sm"
            >
              <div className="p-3 rounded-lg bg-[#35063e]/15 border border-[#35063e]/30 w-fit text-[#D8B4FE]">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">New Appointment</h3>
              <p className="text-text-muted/60 text-sm leading-relaxed">
                Click below to launch our step-by-step interactive booking form to select dates, times, and specific treatments.
              </p>
              <button
                onClick={() => {
                  setBookingForm(prev => ({ ...prev, service: "Scaling & Polishing" }));
                  setIsBookingOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-[#35063e] hover:bg-[#4a0956] text-white font-bold text-sm transition-all shadow-sm cursor-pointer"
              >
                Launch Scheduler Form
              </button>
            </motion.div>

            {/* Appointments List Board */}
            <div className="lg:col-span-8 space-y-6">

              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-white text-lg">Active Bookings ({appointments.length})</h3>
                {appointments.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm("Clear all appointments?")) {
                        saveAppointments([]);
                      }
                    }}
                    className="text-xs text-rose-455 hover:text-rose-355 font-bold cursor-pointer animate-pulse"
                  >
                    Cancel All
                  </button>
                )}
              </div>

              {appointments.length === 0 ? (
                /* Empty State Board */
                <div className="p-12 rounded-2xl border border-dashed border-[#35063e]/35 text-center space-y-4 bg-[#35063e]/5">
                  <p className="text-text-muted/40 text-sm italic">You have no active appointments booked on this device.</p>
                  <button
                    onClick={() => {
                      setBookingForm(prev => ({ ...prev, service: "Scaling & Polishing" }));
                      setIsBookingOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#35063e]/15 border border-[#35063e]/40 hover:bg-[#4a0956]/30 text-[#D8B4FE] font-bold text-xs transition-all cursor-pointer"
                  >
                    Book Your First Session
                  </button>
                </div>
              ) : (
                /* Appointment Cards list */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-6 rounded-2xl bg-gradient-to-b from-[#0e071b] to-[#0b0715] border border-[#35063e]/20 hover:border-[#35063e]/40 transition-all flex flex-col justify-between text-left space-y-4 relative group shadow-sm"
                    >
                      <button
                        onClick={() => handleCancelAppointment(appt.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#090611] border border-[#35063e]/30 text-text-muted hover:text-rose-400 hover:border-rose-955 transition-colors cursor-pointer animate-none"
                        title="Cancel Appointment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#D8B4FE] bg-[#35063e]/15 border border-[#35063e]/25 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {appt.service}
                        </span>
                        <h4 className="text-white font-bold text-base mt-2">{appt.name}</h4>
                        <p className="text-text-muted/60 text-xs">{appt.doctor}</p>
                      </div>

                      <div className="pt-4 border-t border-[#35063e]/20 grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-text-muted">
                          <Calendar className="w-3.5 h-3.5 text-[#D8B4FE]" />
                          <span>{appt.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-text-muted">
                          <Clock className="w-3.5 h-3.5 text-[#D8B4FE]" />
                          <span>{appt.timeSlot}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>
        </div>
      </section>



      {/* ------------------ FAQ SECTION ------------------ */}
      <section id="faq" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-[#D8B4FE] font-extrabold tracking-widest text-xs uppercase block">FAQ</span>
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <div className="h-1 w-16 bg-[#35063e] mx-auto rounded-full mt-2" />
          </div>

          <div className="space-y-4 text-left">
            {generalFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#35063e]/20 bg-gradient-to-r from-[#35063e]/20 to-indigo-955/5 overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 flex justify-between items-center text-left text-white font-semibold hover:text-[#D8B4FE] transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <span className="p-1 rounded-lg bg-[#35063e]/20 text-[#D8B4FE] shrink-0 ml-4">
                      {/* Arrow Rotate */}
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="p-6 pt-0 border-t border-[#35063e]/20 text-sm text-text-muted/70 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ------------------ FOOTER ------------------ */}
      <footer className="bg-[#090611] text-white py-16 relative border-t border-[#35063e]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">

            {/* Column 1: Brand */}
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-2.5 text-white">
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#35063e"
                      strokeWidth="4"
                      fill="transparent"
                      strokeLinecap="round"
                      strokeDasharray="220 63"
                    />
                  </svg>
                  <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center bg-[#090611] z-10">
                    <img src="/logo.png" alt="Dr. Varshney's Logo" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <div>
                  <span className="font-extrabold text-sm block leading-none">DR. VARSHNEY'S</span>
                  <span className="text-[8px] uppercase font-bold text-[#D8B4FE] tracking-[0.15em] block mt-0.5">Dental Aesthetics</span>
                </div>
              </a>
              <p className="text-xs text-text-muted/60 leading-relaxed">
                We're committed to providing high-quality dental care in a comfortable and friendly environment.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#D8B4FE] text-xs uppercase tracking-wider">Quick Links</h4>
              <ul className="text-xs text-text-muted/70 space-y-2 font-semibold">
                <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#scheduler" className="hover:text-white transition-colors">Appointments</a></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#D8B4FE] text-xs uppercase tracking-wider">Our Services</h4>
              <ul className="text-xs text-text-muted/70 space-y-2">
                <li>Scaling & Polishing</li>
                <li>Root Canal Treatment</li>
                <li>Crowns & Bridges</li>
                <li>Dental Implants</li>
                <li>Children Dental Care</li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#D8B4FE] text-xs uppercase tracking-wider">Contact Us</h4>
              <ul className="text-xs text-text-muted/70 space-y-2.5">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D8B4FE] shrink-0 mt-0.5" />
                  <span>Shop No. 105, Dutt Sagar Appt. Above IDBI Bank, Airport Road, Nani Daman</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D8B4FE]" />
                  <a href="tel:7977454648" className="hover:text-white font-bold transition-colors">+91 79774 54648</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D8B4FE]" />
                  <a href="mailto:dr.varshneydental@gmail.com" className="hover:text-white transition-colors">dr.varshneydental@gmail.com</a>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#D8B4FE] shrink-0 mt-0.5" />
                  <div className="leading-tight text-[11px]">
                    <p>Mon - Sat: 10:00 AM - 1:00 PM</p>
                    <p className="mt-1">Mon - Sat: 4:00 PM - 8:00 PM</p>
                    <p className="mt-1 text-rose-455 font-bold">Sun: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-[#35063e]/20 text-center text-xs text-text-muted/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Dr. Varshney's Dental Aesthetics. All rights reserved. Reg. No. A-22861.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

      {/* ------------------ SERVICE DETAIL DRAWER ------------------ */}
      <AnimatePresence>
        {activeServiceDetail && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveServiceDetail(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 animate-none"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0e071b] border-l border-[#35063e]/30 p-8 shadow-2xl z-50 overflow-y-auto flex flex-col justify-between text-left"
            >
              <div className="space-y-8">

                {/* Close */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-widest text-[#D8B4FE] uppercase">Treatment Guide</span>
                  <button
                    onClick={() => setActiveServiceDetail(null)}
                    className="p-1.5 rounded-lg bg-[#35063e]/25 border border-[#35063e]/35 text-[#D8B4FE] hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-extrabold text-white leading-snug">{activeServiceDetail.title}</h3>
                  <p className="text-text-muted/70 text-sm leading-relaxed">{activeServiceDetail.fullDetails}</p>
                </div>

                {/* Info block */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-[#35063e]/25">
                  <div>
                    <span className="text-[10px] uppercase text-[#D8B4FE] font-bold block">Cost Category</span>
                    <span className="text-sm font-bold text-white">{activeServiceDetail.priceRange}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#D8B4FE] font-bold block">Typical Duration</span>
                    <span className="text-sm font-bold text-white">{activeServiceDetail.duration}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Treatment Benefits</h4>
                  <ul className="space-y-2">
                    {activeServiceDetail.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-text-secondary/80">
                        <Check className="w-4 h-4 text-[#D8B4FE] shrink-0 mt-0.5 stroke-[3]" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQ snippets */}
                <div className="space-y-4 pt-4 border-t border-[#35063e]/20">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#D8B4FE]" />
                    <span>Frequently Asked</span>
                  </h4>
                  {activeServiceDetail.faqs.map((faq, i) => (
                    <div key={i} className="space-y-1 text-xs">
                      <p className="font-bold text-text-muted">Q: {faq.q}</p>
                      <p className="text-[#D8B4FE]/85 leading-relaxed">A: {faq.a}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-8 mt-8 border-t border-[#35063e]/20">
                <button
                  onClick={() => {
                    setBookingForm(prev => ({
                      ...prev,
                      service: activeServiceDetail.title
                    }));
                    setActiveServiceDetail(null);
                    setIsBookingOpen(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#35063e] hover:bg-[#4a0956] text-white font-bold text-sm transition-all cursor-pointer"
                >
                  Schedule this Service
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ------------------ APPOINTMENT BOOKING MODAL (POPUP) ------------------ */}
      <AnimatePresence>
        {isBookingOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsBookingOpen(false);
                setBookingSuccess(false);
              }}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 animate-none"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-[#0e071b] border border-[#35063e]/30 p-6 sm:p-8 rounded-3xl shadow-2xl z-50 overflow-y-auto max-h-[90vh] text-left text-[#FFFFFF]"
            >

              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Book Your Visit</h3>
                  <p className="text-xs text-[#D8B4FE] mt-0.5">Please provide appointment details below</p>
                </div>
                <button
                  onClick={() => {
                    setIsBookingOpen(false);
                    setBookingSuccess(false);
                  }}
                  className="p-1.5 rounded-lg bg-[#35063e]/25 border border-[#35063e]/35 text-[#D8B4FE] hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {bookingSuccess && lastBookedAppointment ? (
                <div className="space-y-6 text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#090611] border border-[#35063e] text-[#D8B4FE] flex items-center justify-center mx-auto animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-extrabold text-white">Booking Confirmed!</h4>
                    <p className="text-sm text-text-muted/60 max-w-xs mx-auto">
                      Your appointment has been registered successfully. You can manage or cancel it anytime in the portal below.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/45 border border-[#35063e]/25 text-left text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between"><span className="text-[#D8B4FE]">Patient:</span> <span className="text-white font-bold">{lastBookedAppointment.name}</span></div>
                    <div className="flex justify-between"><span className="text-[#D8B4FE]">Service:</span> <span className="text-white font-bold">{lastBookedAppointment.service}</span></div>
                    <div className="flex justify-between"><span className="text-[#D8B4FE]">Doctor:</span> <span className="text-white font-bold">{lastBookedAppointment.doctor}</span></div>
                    <div className="flex justify-between"><span className="text-[#D8B4FE]">Date & Time:</span> <span className="text-white font-bold">{lastBookedAppointment.date} at {lastBookedAppointment.timeSlot}</span></div>
                  </div>

                  <button
                    onClick={() => {
                      setIsBookingOpen(false);
                      setBookingSuccess(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#35063e] hover:bg-[#4a0956] text-white font-semibold text-sm transition-all cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">Your Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]" />
                        <input
                          type="text"
                          required
                          value={bookingForm.name}
                          onFocus={() => setFocusedInput("popup_name")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${focusedInput === "popup_name" ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]" : "border-[#35063e]/25"
                            }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]" />
                        <input
                          type="email"
                          value={bookingForm.email}
                          onFocus={() => setFocusedInput("popup_email")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          placeholder="care@domain.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${focusedInput === "popup_email" ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]" : "border-[#35063e]/25"
                            }`}
                        />
                      </div>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]" />
                        <input
                          type="tel"
                          required
                          value={bookingForm.phone}
                          onFocus={() => setFocusedInput("popup_phone")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          placeholder="79774 54648"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${focusedInput === "popup_phone" ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]" : "border-[#35063e]/25"
                            }`}
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">Select Treatment *</label>
                      <select
                        value={bookingForm.service}
                        onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0e071b] border border-[#35063e]/25 focus:border-[#35063e] focus:outline-none text-white text-sm cursor-pointer"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title} className="bg-[#0e071b]">{s.title}</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">Preferred Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]" />
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onFocus={() => setFocusedInput("popup_date")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm cursor-pointer transition-all ${focusedInput === "popup_date" ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]" : "border-[#35063e]/25"
                            }`}
                        />
                      </div>
                    </div>

                    {/* Time slot */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">Select Time Slot *</label>
                      <select
                        required
                        value={bookingForm.timeSlot}
                        onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-[#35063e]/25 focus:border-[#35063e] focus:outline-none text-white text-sm cursor-pointer"
                      >
                        <option value="10:00 AM">10:00 AM (Morning)</option>
                        <option value="11:00 AM">11:00 AM (Morning)</option>
                        <option value="12:00 PM">12:00 PM (Morning)</option>
                        <option value="04:00 PM">04:00 PM (Evening)</option>
                        <option value="05:00 PM">05:00 PM (Evening)</option>
                        <option value="06:00 PM">06:00 PM (Evening)</option>
                        <option value="07:00 PM">07:00 PM (Evening)</option>
                      </select>
                    </div>

                  </div>

                  {/* Doctor */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#D8B4FE] font-bold uppercase block">Preferred Doctor / Specialist</label>
                    <select
                      value={bookingForm.doctor}
                      onChange={(e) => setBookingForm({ ...bookingForm, doctor: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-[#35063e]/25 focus:border-[#35063e] focus:outline-none text-white text-sm cursor-pointer"
                    >
                      {doctors.map((doc, idx) => (
                        <option key={idx} value={doc.name} className="bg-[#0e071b]">{doc.name} - {doc.credentials}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#D8B4FE] font-bold uppercase block">Symptoms or Notes (Optional)</label>
                    <textarea
                      rows={2}
                      value={bookingForm.notes}
                      onFocus={() => setFocusedInput("popup_notes")}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      placeholder="e.g. sensitivity to cold water on lower left molar"
                      className={`w-full px-4 py-2 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${focusedInput === "popup_notes" ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]" : "border-[#35063e]/25"
                        }`}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#35063e] hover:bg-[#4a0956] text-white font-bold text-base transition-all rounded-xl cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Booking...</span>
                        </>
                      ) : (
                        <span>Confirm Appointment Booking</span>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ------------------ BACK TO TOP BUTTON ------------------ */}
      <AnimatePresence>
        {scrollY > 400 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-[#35063e] hover:bg-[#4a0956] text-white shadow-xl z-40 transition-colors cursor-pointer border border-[#D8B4FE]/30"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
