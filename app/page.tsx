"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Play
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

export default function Home() {
  // Mobile Nav Open/Close
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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

  // Load appointments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("varshney_appointments");
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing appointments", e);
      }
    }
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

    // Reset Form
    setBookingForm(prev => ({
      ...prev,
      service: "Scaling & Polishing",
      doctor: "Dr. Ayush Varshney, B.D.S. (Dental Surgeon)",
      date: "",
      notes: ""
    }));
  };

  const handleCancelAppointment = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      const filtered = appointments.filter(a => a.id !== id);
      saveAppointments(filtered);
    }
  };

  // Treatment Quiz State
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    concern: "",
    goal: "",
    timeline: ""
  });
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const startQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({ concern: "", goal: "", timeline: "" });
    setQuizResult(null);
  };

  const handleQuizAnswer = (field: string, val: string) => {
    const updatedAnswers = { ...quizAnswers, [field]: val };
    setQuizAnswers(updatedAnswers);
    
    if (quizStep < 3) {
      setQuizStep(prev => prev + 1);
    } else {
      // Calculate Result
      let recommendation = "Scaling & Polishing";
      const concern = updatedAnswers.concern;
      const goal = updatedAnswers.goal;

      if (concern === "Stained/Dull Teeth" || goal === "A bright white smile") {
        recommendation = "Scaling & Polishing";
      } else if (concern === "Crooked/Spaced Teeth" || goal === "Straighter, aligned teeth") {
        recommendation = "Braces & Aligners";
      } else if (concern === "Missing/Broken Tooth" || goal === "Restoring full chewing function") {
        recommendation = "Implants";
      } else if (concern === "Tooth Pain/Ache" || updatedAnswers.timeline === "Immediately (Emergency)") {
        recommendation = "Root Canal Treatment";
      } else {
        recommendation = "Tooth Filling";
      }
      setQuizResult(recommendation);
    }
  };

  // Selected Service Detail Modal/Drawer State
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceDetail | null>(null);

  // Before/After Slider Position (0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);

  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, rect);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1 || isSliding) {
      const rect = e.currentTarget.getBoundingClientRect();
      handleSliderMove(e.clientX, rect);
    }
  };

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

  // Doctor Info
  const doctor = {
    name: "Dr. Ayush Varshney B.D.S.",
    title: "Lead Dental Surgeon & Aesthetics Specialist",
    reg: "Reg. No.: A-22861"
  };

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

  // Variants for staggered entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#05020c] text-purple-50 relative selection:bg-purple-500/30 selection:text-purple-100 bg-grid-pattern">
      
      {/* Radial glows & Floating animated background blobs */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[45%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "-3s" }} />

      {/* ------------------ NAVBAR ------------------ */}
      <header className="sticky top-0 z-40 w-full bg-[#05020c]/85 backdrop-blur-md border-b border-purple-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-lg shadow-purple-500/20 overflow-hidden flex items-center justify-center"
            >
              <div className="w-full h-full bg-[#05020c] rounded-[10px] overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="Dr. Varshney's Logo" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <div>
              <span className="font-extrabold text-lg tracking-wide text-white block group-hover:text-purple-300 transition-colors leading-none">
                DR. VARSHNEY'S
              </span>
              <span className="text-[9px] uppercase font-bold text-purple-400 tracking-[0.2em] block mt-0.5">
                Dental Aesthetics
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-purple-300/80">
            {["Home", "About Us", "Services", "Treatment Quiz", "Before/After", "Appointments"].map((link, idx) => (
              <motion.a
                key={idx}
                href={link === "Home" ? "#hero" : link === "About Us" ? "#about" : link === "Services" ? "#services" : link === "Treatment Quiz" ? "#quiz" : link === "Before/After" ? "#comparison" : "#scheduler"}
                whileHover={{ scale: 1.05, y: -2 }}
                className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-purple-500 hover:after:w-full after:transition-all"
              >
                {link}
              </motion.a>
            ))}
          </nav>

          {/* Booking Trigger CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a 
              href="tel:7977454648" 
              whileHover={{ scale: 1.02 }}
              className="text-purple-300 hover:text-white transition-colors font-bold text-sm flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-purple-500" />
              <span>+91 79774 54648</span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setBookingForm(prev => ({ ...prev, service: "Scaling & Polishing" }));
                setIsBookingOpen(true);
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-500 text-white font-semibold text-sm shadow-md transition-all"
            >
              Book Appointment
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-purple-300 hover:text-white"
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
              className="md:hidden bg-[#05020c] border-b border-purple-950/40 overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4 text-purple-300">
                <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="py-2 text-base font-semibold hover:text-white">Home</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-base font-semibold hover:text-white">About Us</a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 text-base font-semibold hover:text-white">Services</a>
                <a href="#quiz" onClick={() => setMobileMenuOpen(false)} className="py-2 text-base font-semibold hover:text-white">Treatment Quiz</a>
                <a href="#comparison" onClick={() => setMobileMenuOpen(false)} className="py-2 text-base font-semibold hover:text-white">Before/After</a>
                <a href="#scheduler" onClick={() => setMobileMenuOpen(false)} className="py-2 text-base font-semibold hover:text-white">Appointments</a>
                <div className="border-t border-purple-950/40 pt-4 flex flex-col gap-3">
                  <a href="tel:7977454648" className="py-2 text-base font-semibold hover:text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-500" />
                    <span>Call: +91 79774 54648</span>
                  </a>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setBookingForm(prev => ({ ...prev, service: "Scaling & Polishing" }));
                      setIsBookingOpen(true);
                    }}
                    className="w-full py-3 rounded-full bg-purple-650 text-white font-semibold text-center"
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
      <section id="hero" className="relative pt-10 pb-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
              
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-955/20 border border-purple-800/30 text-purple-300 text-xs font-semibold tracking-wide w-fit"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Dr. Ayush Varshney B.D.S. (Dental Surgeon)</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none"
              >
                Healthy Teeth. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
                  Confident You.
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-purple-200/70 text-lg max-w-lg leading-relaxed"
              >
                We provide comprehensive dental care with a gentle touch in a comfortable, modern environment. Trusted implants, scaling, RCT, and alignment by Dr. Ayush Varshney.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(168, 85, 247, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setBookingForm(prev => ({ ...prev, service: "Scaling & Polishing" }));
                    setIsBookingOpen(true);
                  }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-base shadow-lg shadow-purple-950/60 transition-all flex items-center gap-2"
                >
                  <CalendarDays className="w-5 h-5" />
                  <span>Book Appointment</span>
                </motion.button>
                <motion.a
                  href="#about"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 rounded-full bg-purple-955/10 border border-purple-900/50 hover:bg-purple-900/20 text-purple-200 font-semibold text-base transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
                  <span>Watch Video</span>
                </motion.a>
              </motion.div>

              {/* Highlights List Block */}
              <motion.div 
                variants={itemVariants}
                className="pt-8 border-t border-purple-950/30 grid grid-cols-2 gap-4 text-sm font-semibold text-purple-200"
              >
                {[
                  { icon: <User className="w-4 h-4" />, label: "Experienced Dental Team" },
                  { icon: <ShieldCheck className="w-4 h-4" />, label: "Advanced Technology" },
                  { icon: <Heart className="w-4 h-4" />, label: "Comfortable Environment" },
                  { icon: <Star className="w-4 h-4 fill-purple-400" />, label: "5-Star Patient Rated Care" }
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-purple-900/20 border border-purple-800/30 text-purple-400">
                      {highlight.icon}
                    </div>
                    <span>{highlight.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Photo Column with gentle float animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{ 
                opacity: { duration: 0.8 }, 
                scale: { duration: 0.8 }, 
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" } 
              }}
              className="lg:col-span-6 flex justify-center relative"
            >
              {/* Outer Decorative Shape */}
              <div className="absolute inset-0 bg-purple-500/5 rounded-[40px] transform rotate-3 scale-95 pointer-events-none" />
              
              {/* Styled Patient photo frame */}
              <div className="relative w-full max-w-md aspect-[1.1] rounded-[30px] overflow-hidden border-4 border-purple-900/30 shadow-2xl bg-purple-950/10">
                <img
                  src="hero-patient.png"
                  alt="Smiling Patient at Dr. Varshney's Dental Aesthetics"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ------------------ SERVICES SECTION ------------------ */}
      <section id="services" className="py-24 relative bg-black/20 border-y border-purple-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-purple-400 font-extrabold tracking-widest text-xs uppercase block">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Complete Dental Care for You & Your Family</h2>
            <div className="h-1 w-16 bg-purple-500 mx-auto rounded-full mt-2" />
          </div>

          {/* Services Grid with Viewport animation */}
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
                whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(168, 85, 247, 0.4)" }}
                className="relative group p-6 rounded-2xl bg-gradient-to-b from-[#0d071d] to-[#04020a] border border-purple-950 hover:shadow-xl hover:shadow-purple-950/30 transition-all flex flex-col justify-between min-h-[260px] text-left"
              >
                {/* Glowing bar on top hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-2xl" />

                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-purple-900/10 border border-purple-800/30 text-purple-400 w-fit">
                    {service.id === "scaling" && <Sparkles className="w-6 h-6" />}
                    {service.id === "filling" && <Smile className="w-6 h-6" />}
                    {service.id === "extraction" && <ShieldCheck className="w-6 h-6" />}
                    {service.id === "rct" && <Heart className="w-6 h-6" />}
                    {service.id === "crowns" && <Activity className="w-6 h-6" />}
                    {service.id === "implants" && <Award className="w-6 h-6" />}
                    {service.id === "ortho" && <Info className="w-6 h-6" />}
                    {service.id === "kids" && <Smile className="w-6 h-6" />}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-purple-300/60 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-purple-950/30 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-purple-500/80">{service.priceRange}</span>
                  <button
                    onClick={() => setActiveServiceDetail(service)}
                    className="flex items-center gap-1 text-sm font-bold text-purple-400 group-hover:text-white transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ------------------ ABOUT US & BOOKING CARD SIDE-BY-SIDE ------------------ */}
      <section id="about" className="py-24 relative overflow-hidden bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: About Us */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <span className="text-purple-400 font-extrabold tracking-widest text-xs uppercase block">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">Your Smile is Our Passion</h2>
              <p className="text-purple-200/70 text-base leading-relaxed">
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
                  <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-purple-200">
                    <div className="w-5 h-5 rounded-full bg-purple-900/30 text-purple-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Image beneath text */}
              <div className="pt-4 max-w-md aspect-[16/9] rounded-2xl overflow-hidden border border-purple-900/30 shadow-md bg-purple-950/10">
                <img
                  src="about-dentist.png"
                  alt="Dentist checking patient smile"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column: Dark Purple Booking Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#140b2e] to-[#04020a] text-white border border-purple-900/30 shadow-2xl relative text-left">
                
                {/* Heading */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2.5 text-purple-400">
                    <CalendarDays className="w-6 h-6" />
                    <span className="font-extrabold text-lg tracking-wide uppercase">Book Your Appointment</span>
                  </div>
                  <p className="text-purple-200/60 text-sm">We'll help you take the first step to a healthier smile.</p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="79774 54648"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm"
                    />
                  </div>

                  {/* Email & Date Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm"
                      />
                    </div>

                    {/* Date */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm cursor-pointer"
                      />
                    </div>

                  </div>

                  {/* Service Choice */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">Select Service *</label>
                    <select
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#090615] border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm cursor-pointer"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title} className="bg-[#07040f]">{s.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes / Message */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">Message (Optional)</label>
                    <textarea
                      rows={2}
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      placeholder="Share symptoms or questions with us..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-base transition-all shadow-md"
                    >
                      Book Appointment
                    </motion.button>
                  </div>

                  <p className="text-[10px] text-purple-300/40 text-center mt-3">
                    ✔ Your information is secure and confidential.
                  </p>

                </form>

                {/* Form success confirmation layer */}
                <AnimatePresence>
                  {bookingSuccess && lastBookedAppointment && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-[#07040f] rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-6 z-10 border border-purple-900/30"
                    >
                      <div className="w-16 h-16 rounded-full bg-purple-950 border border-purple-500 text-purple-400 flex items-center justify-center mx-auto animate-bounce">
                        <Check className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-2xl font-extrabold text-white">Booking Confirmed!</h4>
                        <p className="text-sm text-purple-200/60 max-w-xs mx-auto">
                          Hi {lastBookedAppointment.name}, your request for {lastBookedAppointment.service} has been successfully logged.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#140b2e] border border-purple-950 text-left text-xs space-y-2 w-full max-w-sm">
                        <div><span className="text-purple-400">Practitioner:</span> <span className="text-white font-bold">{lastBookedAppointment.doctor}</span></div>
                        <div><span className="text-purple-400">Date & Time:</span> <span className="text-white font-bold">{lastBookedAppointment.date} at {lastBookedAppointment.timeSlot}</span></div>
                      </div>

                      <button
                        onClick={() => setBookingSuccess(false)}
                        className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all"
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

      {/* ------------------ DIAGNOSTIC QUIZ SECTION ------------------ */}
      <section id="quiz" className="py-20 relative bg-black/30 border-y border-purple-955/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0b071a] to-[#04020a] border border-purple-900/30 relative overflow-hidden shadow-sm"
          >
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative text-center max-w-2xl mx-auto space-y-6">
              
              <span className="text-xs uppercase tracking-widest font-extrabold text-purple-400 bg-purple-950/50 px-3.5 py-1.5 rounded-full border border-purple-800/40">
                Interactive Assistant
              </span>
              
              <h2 className="text-3xl font-extrabold text-white">Find Your Recommended Treatment</h2>
              <p className="text-purple-300/60 text-sm">
                Unsure which dental care service is right for you? Take our 3-question symptom assistant and get customized recommendations instantly.
              </p>

              {/* Quiz Box */}
              <div className="mt-8 p-6 rounded-2xl bg-black/45 border border-purple-955/65 min-h-[220px] flex flex-col justify-between">
                
                {quizResult ? (
                  /* Results Page */
                  <div className="space-y-6 py-4">
                    <div className="w-12 h-12 rounded-full bg-purple-950/60 border border-purple-500 text-purple-400 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-500 uppercase tracking-widest font-semibold">Recommended Treatment</p>
                      <h3 className="text-2xl font-extrabold text-white mt-1">{quizResult}</h3>
                      <p className="text-sm text-purple-300/60 mt-2 max-w-md mx-auto">
                        Based on your primary concerns, we suggest scheduling a consultation for {quizResult} to discuss customized solutions.
                      </p>
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setBookingForm(prev => ({
                            ...prev,
                            service: quizResult
                          }));
                          setIsBookingOpen(true);
                        }}
                        className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all"
                      >
                        Book {quizResult} Now
                      </button>
                      <button
                        onClick={startQuiz}
                        className="px-6 py-2.5 rounded-full bg-purple-955/40 border border-purple-800/40 text-purple-300 text-sm font-semibold hover:bg-purple-950/80 transition-all"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Quiz Flow Steps */
                  <div className="flex flex-col justify-between h-full space-y-6">
                    
                    {/* Step Indicators */}
                    <div className="flex justify-center items-center gap-3">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            quizStep === step ? "w-8 bg-purple-500" : "w-2 bg-purple-950"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Question 1 */}
                    {quizStep === 1 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-white">Q1: What is your primary dental concern?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                          {[
                            "Stained/Dull Teeth",
                            "Crooked/Spaced Teeth",
                            "Missing/Broken Tooth",
                            "Tooth Pain/Ache"
                          ].map((option) => (
                            <button
                              key={option}
                              onClick={() => handleQuizAnswer("concern", option)}
                              className="px-4 py-3.5 rounded-xl bg-purple-955/10 border border-purple-950 hover:border-purple-800/50 hover:bg-purple-950/30 text-purple-200 text-sm font-semibold transition-all flex justify-between items-center group shadow-sm"
                            >
                              <span>{option}</span>
                              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-all" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Question 2 */}
                    {quizStep === 2 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-white">Q2: What is your main treatment goal?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                          {[
                            "A bright white smile",
                            "Straighter, aligned teeth",
                            "Restoring full chewing function",
                            "Relieving pain quickly"
                          ].map((option) => (
                            <button
                              key={option}
                              onClick={() => handleQuizAnswer("goal", option)}
                              className="px-4 py-3.5 rounded-xl bg-purple-955/10 border border-purple-950 hover:border-purple-800/50 hover:bg-purple-950/30 text-purple-200 text-sm font-semibold transition-all flex justify-between items-center group shadow-sm"
                            >
                              <span>{option}</span>
                              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-all" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Question 3 */}
                    {quizStep === 3 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-white">Q3: How soon would you like to start?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                          {[
                            "Immediately (Emergency)",
                            "Within the next week",
                            "Just checking options",
                            "In a month or later"
                          ].map((option) => (
                            <button
                              key={option}
                              onClick={() => handleQuizAnswer("timeline", option)}
                              className="px-4 py-3.5 rounded-xl bg-purple-955/10 border border-purple-950 hover:border-purple-800/50 hover:bg-purple-950/30 text-purple-200 text-sm font-semibold transition-all flex justify-between items-center group shadow-sm"
                            >
                              <span>{option}</span>
                              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-all" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------ BEFORE/AFTER SMILE SLIDER ------------------ */}
      <section id="comparison" className="py-24 relative overflow-hidden bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-6 text-left"
            >
              <span className="text-purple-400 font-extrabold tracking-widest text-xs uppercase block">Visual Outcomes</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">Interactive Smile Transformation</h2>
              <p className="text-purple-200/70 text-base leading-relaxed">
                Drag the center slider back and forth to compare the clinical results of our Scaling, Alignment, and Restorative treatments. We aim for healthy, natural-looking aesthetics.
              </p>
              
              {/* Feature Bullet Points */}
              <div className="space-y-4 pt-2">
                {[
                  "Safe plaque and tartar removal with ultrasonic scaling",
                  "Precisely closed gaps and alignment corrections",
                  "Biocompatible restoration composite materials matching enamel",
                  "Crowns and bridges customized for a comfortable bite"
                ].map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-900/30 text-purple-400 flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-purple-200/80 text-sm leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Comparison Slider */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 flex justify-center"
            >
              
              <div className="flex flex-col items-center space-y-4 w-full max-w-xl">
                
                {/* Comparison Labels */}
                <div className="flex justify-between w-full text-xs font-bold uppercase tracking-widest px-2 text-purple-300">
                  <span>Before Treatment</span>
                  <span className="text-purple-400">After Treatment</span>
                </div>

                {/* Slider Container Box */}
                <div
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  onMouseDown={() => setIsSliding(true)}
                  onMouseUp={() => setIsSliding(false)}
                  onMouseLeave={() => setIsSliding(false)}
                  className="relative w-full aspect-[16/10] rounded-3xl border border-purple-955 overflow-hidden select-none cursor-ew-resize shadow-2xl bg-purple-950/10"
                >
                  
                  {/* BEFORE STATE */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center p-8 bg-[#04020a]">
                    <div className="w-full h-full relative flex items-center justify-center">
                      <svg className="w-full max-w-sm h-auto opacity-75 filter blur-[0.3px]" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50,80 C100,50 150,90 200,60 C250,90 300,50 350,80" stroke="#b45309" strokeWidth="24" strokeLinecap="round" />
                        <path d="M50,120 C100,150 150,110 200,140 C250,110 300,150 350,120" stroke="#b45309" strokeWidth="24" strokeLinecap="round" />
                        <rect x="90" y="85" width="34" height="42" rx="8" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                        <rect x="130" y="87" width="32" height="45" rx="8" fill="#fef08a" stroke="#d97706" strokeWidth="2" transform="rotate(-3 146 109)" />
                        <rect x="168" y="86" width="30" height="45" rx="8" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                        <rect x="206" y="87" width="30" height="45" rx="8" fill="#fef08a" stroke="#d97706" strokeWidth="2" transform="rotate(3 221 109)" />
                        <rect x="242" y="85" width="32" height="42" rx="8" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                        <rect x="100" y="105" width="28" height="35" rx="6" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                        <rect x="132" y="104" width="28" height="36" rx="6" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                        <rect x="164" y="106" width="26" height="36" rx="6" fill="#fef08a" stroke="#d97706" strokeWidth="2" transform="translate(0, 1.5)" />
                        <rect x="194" y="107" width="28" height="35" rx="6" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                        <rect x="226" y="105" width="28" height="35" rx="6" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                      </svg>
                      
                      <span className="absolute bottom-4 left-4 bg-amber-955 border border-amber-800 text-amber-300 font-mono text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Before Care
                      </span>
                    </div>
                  </div>

                  {/* AFTER STATE */}
                  <div
                    className="absolute inset-y-0 left-0 h-full overflow-hidden flex items-center justify-center bg-purple-950/30"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center p-8 bg-[#05020c]" style={{ width: "100%", minWidth: "300px" }}>
                      
                      <div className="w-full h-full relative flex items-center justify-center">
                        <svg className="w-full max-w-sm h-auto filter drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50,80 C100,50 150,90 200,60 C250,90 300,50 350,80" stroke="#f472b6" strokeWidth="24" strokeLinecap="round" />
                          <path d="M50,120 C100,150 150,110 200,140 C250,110 300,150 350,120" stroke="#f472b6" strokeWidth="24" strokeLinecap="round" />
                          <rect x="90" y="85" width="34" height="42" rx="8" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="126" y="85" width="34" height="44" rx="8" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="162" y="85" width="36" height="45" rx="8" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="200" y="85" width="36" height="45" rx="8" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="238" y="85" width="34" height="44" rx="8" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="274" y="85" width="34" height="42" rx="8" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="100" y="105" width="28" height="35" rx="6" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="130" y="105" width="28" height="35" rx="6" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="160" y="105" width="28" height="35" rx="6" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="190" y="105" width="28" height="35" rx="6" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="220" y="105" width="28" height="35" rx="6" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                          <rect x="250" y="105" width="28" height="35" rx="6" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                        </svg>

                        <span className="absolute bottom-4 left-4 bg-purple-955 border border-purple-800 text-purple-200 font-mono text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                          After Treatment
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* SLIDER HANDLE LINE AND DRAG ICON */}
                  <div
                    className="absolute inset-y-0 w-1 bg-purple-500 shadow-[0_0_10px_#a855f7] pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-purple-600 border border-purple-400 text-white flex items-center justify-center shadow-lg pointer-events-none">
                      <span className="text-xs font-black flex gap-0.5">
                        <span>◀</span><span>▶</span>
                      </span>
                    </div>
                  </div>

                </div>

                <p className="text-xs text-purple-300/40 text-center italic">
                  Drag with mouse or swipe with finger over the image to interact.
                </p>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ------------------ APPOINTMENT SCHEDULER SECTION ------------------ */}
      <section id="scheduler" className="py-24 relative bg-black/20 border-t border-purple-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-purple-400 font-bold tracking-widest text-xs uppercase block">Self Service Portal</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Your Scheduled Appointments</h2>
            <p className="text-purple-300/60 text-base">
              Add new sessions or manage existing visits in real-time. Changes sync instantly on your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Quick booking trigger block */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="lg:col-span-4 p-8 rounded-2xl bg-gradient-to-b from-[#0d071d] to-[#04020a] border border-purple-955 text-left space-y-6 shadow-sm"
            >
              <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-800/30 w-fit text-purple-400">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">New Appointment</h3>
              <p className="text-purple-300/60 text-sm leading-relaxed">
                Click below to launch our step-by-step interactive booking form to select dates, times, and specific treatments.
              </p>
              <button
                onClick={() => {
                  setBookingForm(prev => ({ ...prev, service: "Scaling & Polishing" }));
                  setIsBookingOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-purple-655 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-sm"
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
                    className="text-xs text-rose-450 hover:text-rose-300 font-bold"
                  >
                    Cancel All
                  </button>
                )}
              </div>

              {appointments.length === 0 ? (
                /* Empty State Board */
                <div className="p-12 rounded-2xl border border-dashed border-purple-955 text-center space-y-4 bg-purple-950/5">
                  <p className="text-purple-300/40 text-sm italic">You have no active appointments booked on this device.</p>
                  <button
                    onClick={() => {
                      setBookingForm(prev => ({ ...prev, service: "Scaling & Polishing" }));
                      setIsBookingOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-full bg-purple-955 border border-purple-900/50 hover:bg-purple-900/20 text-purple-300 font-bold text-xs transition-all"
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
                      className="p-6 rounded-2xl bg-gradient-to-b from-[#0d071d] to-[#04020a] border border-purple-950 hover:border-purple-800 transition-all flex flex-col justify-between text-left space-y-4 relative group shadow-sm"
                    >
                      <button
                        onClick={() => handleCancelAppointment(appt.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#05020c] border border-purple-900/50 text-purple-400 hover:text-rose-400 hover:border-rose-955 transition-colors"
                        title="Cancel Appointment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-purple-400 bg-purple-900/20 border border-purple-800/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {appt.service}
                        </span>
                        <h4 className="text-white font-bold text-base mt-2">{appt.name}</h4>
                        <p className="text-purple-300/60 text-xs">{appt.doctor}</p>
                      </div>

                      <div className="pt-4 border-t border-purple-950/30 grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-purple-300">
                          <Calendar className="w-3.5 h-3.5 text-purple-500" />
                          <span>{appt.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-purple-300">
                          <Clock className="w-3.5 h-3.5 text-purple-500" />
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

      {/* ------------------ TESTIMONIALS SECTION ------------------ */}
      <section className="py-24 bg-black/40 border-y border-purple-955/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-purple-400 font-extrabold tracking-widest text-xs uppercase block">WHAT OUR PATIENTS SAY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Loved by Our Patients</h2>
            <div className="h-1 w-16 bg-purple-500 mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Testimonial Quotes Slider */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  text: "The team at Dr. Varshney's Dental Aesthetics is amazing! They are professional, gentle and truly care about their patients. I highly recommend them to anyone looking for a great dentist.",
                  author: "Jessica M.",
                  role: "Root Canal Patient",
                  stars: 5,
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces"
                }
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl bg-[#0d071d]/60 border border-purple-955 flex flex-col justify-between text-left space-y-6 shadow-sm"
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.stars)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-purple-200/80 text-lg leading-relaxed italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-purple-955/30">
                    <img
                      src={review.image}
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover border border-purple-500"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{review.author}</h4>
                      <p className="text-purple-400/60 text-xs">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Key Statistics Board */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Average Rating", value: "4.9 / 5" },
                { label: "Happy Patients", value: "2,000+" },
                { label: "Years Exp", value: "15+" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-6 rounded-2xl bg-purple-955/10 border border-purple-950 shadow-sm flex flex-col justify-center space-y-2"
                >
                  <span className="text-3xl font-extrabold text-purple-400 block">{stat.value}</span>
                  <span className="text-[10px] font-bold text-purple-300/50 uppercase tracking-wide">{stat.label}</span>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ------------------ FAQ SECTION ------------------ */}
      <section id="faq" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-purple-400 font-extrabold tracking-widest text-xs uppercase block">FAQ</span>
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <div className="h-1 w-16 bg-purple-500 mx-auto rounded-full mt-2" />
          </div>

          <div className="space-y-4 text-left">
            {generalFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-purple-955 bg-gradient-to-r from-purple-955/10 to-indigo-955/5 overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 flex justify-between items-center text-left text-white font-semibold hover:text-purple-300 transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <span className="p-1 rounded-lg bg-purple-900/20 text-purple-400 shrink-0 ml-4">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-6 pt-0 border-t border-purple-955/30 text-sm text-purple-300/70 leading-relaxed">
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
      <footer className="bg-[#05020c] text-white py-16 relative border-t border-purple-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
            
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-2.5 text-white">
                <div className="w-9 h-9 rounded-lg bg-purple-600/30 border border-purple-500/30 overflow-hidden flex items-center justify-center p-0.5">
                  <img src="/logo.png" alt="Dr. Varshney's Logo" className="w-full h-full object-cover rounded-md" />
                </div>
                <div>
                  <span className="font-extrabold text-sm block leading-none">DR. VARSHNEY'S</span>
                  <span className="text-[8px] uppercase font-bold text-purple-400 tracking-[0.15em] block mt-0.5">Dental Aesthetics</span>
                </div>
              </a>
              <p className="text-xs text-purple-300/60 leading-relaxed">
                We're committed to providing high-quality dental care in a comfortable and friendly environment.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-bold text-purple-400 text-xs uppercase tracking-wider">Quick Links</h4>
              <ul className="text-xs text-purple-300/70 space-y-2 font-semibold">
                <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#scheduler" className="hover:text-white transition-colors">Appointments</a></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="space-y-3">
              <h4 className="font-bold text-purple-400 text-xs uppercase tracking-wider">Our Services</h4>
              <ul className="text-xs text-purple-300/70 space-y-2">
                <li>Scaling & Polishing</li>
                <li>Root Canal Treatment</li>
                <li>Crowns & Bridges</li>
                <li>Dental Implants</li>
                <li>Children Dental Care</li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-3">
              <h4 className="font-bold text-purple-400 text-xs uppercase tracking-wider">Contact Us</h4>
              <ul className="text-xs text-purple-300/70 space-y-2.5">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <span>Shop No. 105, Dutt Sagar Appt. Above IDBI Bank, Airport Road, Nani Daman</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-purple-500" />
                  <a href="tel:7977454648" className="hover:text-white font-bold transition-colors">+91 79774 54648</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-500" />
                  <a href="mailto:dr.varshneydental@gmail.com" className="hover:text-white transition-colors">dr.varshneydental@gmail.com</a>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                  <div className="leading-tight text-[11px]">
                    <p>Mon - Sat: 10:00 AM - 1:00 PM</p>
                    <p className="mt-1">Mon - Sat: 4:00 PM - 8:00 PM</p>
                    <p className="mt-1 text-rose-450 font-bold">Sun: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-purple-955/40 text-center text-xs text-purple-400/50 flex flex-col sm:flex-row justify-between items-center gap-4">
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
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-[#090615] border-l border-purple-900/30 p-8 shadow-2xl z-50 overflow-y-auto flex flex-col justify-between text-left"
            >
              <div className="space-y-8">
                
                {/* Close */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">Treatment Guide</span>
                  <button
                    onClick={() => setActiveServiceDetail(null)}
                    className="p-1.5 rounded-lg bg-purple-955/40 border border-purple-900/30 text-purple-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-extrabold text-white leading-snug">{activeServiceDetail.title}</h3>
                  <p className="text-purple-300/70 text-sm leading-relaxed">{activeServiceDetail.fullDetails}</p>
                </div>

                {/* Info block */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-purple-950">
                  <div>
                    <span className="text-[10px] uppercase text-purple-400 font-bold block">Cost Category</span>
                    <span className="text-sm font-bold text-white">{activeServiceDetail.priceRange}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-purple-400 font-bold block">Typical Duration</span>
                    <span className="text-sm font-bold text-white">{activeServiceDetail.duration}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Treatment Benefits</h4>
                  <ul className="space-y-2">
                    {activeServiceDetail.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-purple-200/80">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 stroke-[3]" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQ snippets */}
                <div className="space-y-4 pt-4 border-t border-purple-955/30">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-purple-500" />
                    <span>Frequently Asked</span>
                  </h4>
                  {activeServiceDetail.faqs.map((faq, i) => (
                    <div key={i} className="space-y-1 text-xs">
                      <p className="font-bold text-purple-300">Q: {faq.q}</p>
                      <p className="text-purple-400/70 leading-relaxed">A: {faq.a}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-8 mt-8 border-t border-purple-955/30">
                <button
                  onClick={() => {
                    setBookingForm(prev => ({
                      ...prev,
                      service: activeServiceDetail.title
                    }));
                    setActiveServiceDetail(null);
                    setIsBookingOpen(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all"
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
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-[#090615] border border-purple-900/40 p-6 sm:p-8 rounded-3xl shadow-2xl z-50 overflow-y-auto max-h-[90vh] text-left text-purple-50"
            >
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Book Your Visit</h3>
                  <p className="text-xs text-purple-400 mt-0.5">Please provide appointment details below</p>
                </div>
                <button
                  onClick={() => {
                    setIsBookingOpen(false);
                    setBookingSuccess(false);
                  }}
                  className="p-1.5 rounded-lg bg-purple-955/40 border border-purple-900/30 text-purple-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {bookingSuccess && lastBookedAppointment ? (
                <div className="space-y-6 text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-purple-955 border border-purple-500 text-purple-400 flex items-center justify-center mx-auto animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-2xl font-extrabold text-white">Booking Confirmed!</h4>
                    <p className="text-sm text-purple-300/60 max-w-xs mx-auto">
                      Your appointment has been registered successfully. You can manage or cancel it anytime in the portal below.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/45 border border-purple-950 text-left text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between"><span className="text-purple-400">Patient:</span> <span className="text-white font-bold">{lastBookedAppointment.name}</span></div>
                    <div className="flex justify-between"><span className="text-purple-400">Service:</span> <span className="text-white font-bold">{lastBookedAppointment.service}</span></div>
                    <div className="flex justify-between"><span className="text-purple-400">Doctor:</span> <span className="text-white font-bold">{lastBookedAppointment.doctor}</span></div>
                    <div className="flex justify-between"><span className="text-purple-400">Date & Time:</span> <span className="text-white font-bold">{lastBookedAppointment.date} at {lastBookedAppointment.timeSlot}</span></div>
                  </div>

                  <button
                    onClick={() => {
                      setIsBookingOpen(false);
                      setBookingSuccess(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-purple-650 hover:bg-purple-500 text-white font-semibold text-sm transition-all"
                  >
                    Done & Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-purple-300 font-bold uppercase block">Your Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                        <input
                          type="text"
                          required
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-purple-300 font-bold uppercase block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                        <input
                          type="email"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          placeholder="care@domain.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-purple-300 font-bold uppercase block">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                        <input
                          type="tel"
                          required
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          placeholder="79774 54648"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm"
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-purple-300 font-bold uppercase block">Select Treatment *</label>
                      <select
                        value={bookingForm.service}
                        onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#090615] border border-purple-955 focus:border-purple-450 focus:outline-none text-white text-sm cursor-pointer"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title} className="bg-[#090615]">{s.title}</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-purple-300 font-bold uppercase block">Preferred Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Time slot */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-purple-300 font-bold uppercase block">Select Time Slot *</label>
                      <select
                        required
                        value={bookingForm.timeSlot}
                        onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm cursor-pointer"
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
                    <label className="text-xs text-purple-300 font-bold uppercase block">Preferred Doctor / Specialist</label>
                    <select
                      value={bookingForm.doctor}
                      onChange={(e) => setBookingForm({ ...bookingForm, doctor: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm cursor-pointer"
                    >
                      <option value={doctor.name} className="bg-[#090615]">{doctor.name} - {doctor.title}</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-purple-300 font-bold uppercase block">Symptoms or Notes (Optional)</label>
                    <textarea
                      rows={2}
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      placeholder="e.g. sensitivity to cold water on lower left molar"
                      className="w-full px-4 py-2 rounded-xl bg-black/40 border border-purple-955 focus:border-purple-400 focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-purple-650 hover:bg-purple-500 text-white font-bold text-base transition-all"
                    >
                      Confirm Appointment Booking
                    </button>
                  </div>

                </form>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
