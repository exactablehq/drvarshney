"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import DoctorProfile, { doctorsData as doctors } from "./components/DoctorProfile";
import WhyChooseUs from "./components/WhyChooseUs";
import ContactUs from "./components/ContactUs";
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
  ArrowUp,
  Search,
  Filter
} from "lucide-react";

// Types
interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails: string;
  priceRange: string;
  duration: string;
  benefits: string[];
  faqs: { q: string; a: string }[];
  image: string;
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
    service: "Scaling",
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

      const sections = ["hero", "services", "doctor", "why-choose-us", "faq", "contact"];
      let activeSec = "hero";
      let maxVisibleHeight = 0;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Calculate visible height of the section in the viewport
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(window.innerHeight || document.documentElement.clientHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            activeSec = sec;
          }
        }
      }

      const labelMap: Record<string, string> = {
        hero: "Home",
        services: "Services",
        doctor: "About Doctor",
        "why-choose-us": "Why Choose Us",
        faq: "FAQ",
        contact: "Contact Us"
      };

      if (labelMap[activeSec]) {
        setActiveSection(labelMap[activeSec]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially to set the correct active tab
    handleScroll();
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
        service: "Scaling",
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

  // Category filter state & search query for services
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>("All");
  const [serviceSearchQuery, setServiceSearchQuery] = useState<string>("");

  // Active FAQ index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Services Data
  const services: ServiceDetail[] = [
    {
      id: "filling",
      title: "Tooth Filling",
      category: "General & Preventive",
      image: "teethFilling.jpg",
      description: "Restore decayed or chipped teeth with aesthetic composite resin fillings that blend seamlessly.",
      fullDetails: "We utilize advanced, biocompatible tooth-colored composite resins to repair cavities, restore chipped edges, and close small gaps, ensuring a completely natural appearance and long-lasting durability.",
      priceRange: "Per Tooth",
      duration: "30 - 40 mins",
      benefits: ["Natural tooth-colored appearance", "Prevents further decay", "Bonds directly to tooth structure", "Mercury-free materials"],
      faqs: [
        { q: "How long do composite fillings last?", a: "Typically 5 to 10 years with good oral hygiene." },
        { q: "Will it look natural?", a: "Yes, the composite is customized to match the exact shade of your tooth." }
      ]
    },
    {
      id: "extraction",
      title: "Tooth Extraction",
      category: "Surgical & Gum Care",
      image: "teethExtration.jpg",
      description: "Safe and pain-free removal of severely damaged, infected, or crowded teeth, including wisdom teeth.",
      fullDetails: "When a tooth cannot be saved due to extensive decay, fracture, or crowding, our team performs gentle extractions under local anesthesia, prioritizing your comfort and rapid post-care healing.",
      priceRange: "Based on complexity",
      duration: "30 - 60 mins",
      benefits: ["Relieves chronic pain and pressure", "Prevents spread of infection", "Relieves crowding for orthodontics", "Comfortable, safe procedure"],
      faqs: [
        { q: "Is extraction painful?", a: "No, local anesthesia numbs the area completely. You will only feel some pressure, not pain." },
        { q: "How long does healing take?", a: "The initial socket heals in 1-2 weeks. We provide clear post-extraction guidelines." }
      ]
    },
    {
      id: "rct",
      title: "Root Canal Treatment",
      category: "Implants & Restorative",
      image: "root-canal-treatment.jpg",
      description: "Save deeply infected or damaged teeth by removing diseased pulp and sealing the canals.",
      fullDetails: "Our modern, single-visit or multi-visit root canal treatments utilize rotary instruments to clean, disinfect, and seal infected pulp space, alleviating severe toothaches and preserving your natural teeth.",
      priceRange: "Varies by roots",
      duration: "45 - 60 mins",
      benefits: ["Stops progressive toothache", "Preserves natural tooth structure", "Prevents abscess spread", "Restores normal bite force"],
      faqs: [
        { q: "Is root canal treatment painful?", a: "No, modern anesthesia and tools make root canal therapy as comfortable as a routine filling." },
        { q: "Will I need a crown after RCT?", a: "Yes, a crown is recommended to protect and strengthen the treated tooth." }
      ]
    },
    {
      id: "crowns_bridges",
      title: "Crowns & Bridges, Dentures",
      category: "Implants & Restorative",
      image: "crown-1.jpg",
      description: "Restore missing or damaged teeth with custom-fabricated crowns, bridges, or full and partial dentures.",
      fullDetails: "We provide comprehensive prosthodontic options, including strong ceramic crowns to protect damaged teeth, dental bridges to fill gaps, and custom-designed dentures to restore complete function and confidence.",
      priceRange: "Custom Pricing",
      duration: "2 - 3 visits",
      benefits: ["Restores chewing and speech", "Prevents adjacent teeth shifting", "Aesthetic and durable", "Custom-fit for ultimate comfort"],
      faqs: [
        { q: "What is the difference between a crown and a bridge?", a: "A crown covers a single damaged tooth, while a bridge uses adjacent teeth to suspend a replacement tooth in a gap." },
        { q: "How do I care for dentures?", a: "Clean them daily with a soft brush and soak them overnight in water or a denture cleaning solution." }
      ]
    },
    {
      id: "implants",
      title: "Implants",
      category: "Implants & Restorative",
      image: "implant-supported-dentures-.jpg",
      description: "Permanent, bio-compatible titanium implants capped with crowns to replace missing teeth from the root up.",
      fullDetails: "Dental implants are the gold standard for tooth replacement. They anchor directly into the jawbone, acting as artificial roots that support custom porcelain crowns for a strong, natural smile.",
      priceRange: "Custom Plan",
      duration: "3 - 6 months",
      benefits: ["Feels and acts like a natural tooth", "Prevents jawbone deterioration", "No support needed from adjacent teeth", "Lifetime durability with care"],
      faqs: [
        { q: "Am I a candidate for implants?", a: "Most adults with healthy gums and sufficient jawbone density are excellent candidates." },
        { q: "How successful are implants?", a: "They have a success rate of over 95%." }
      ]
    },
    {
      id: "braces_aligners",
      title: "Braces & Aligners",
      category: "Orthodontics",
      image: "braces.jpg",
      description: "Straighten misaligned teeth and correct bites with traditional braces or discreet clear aligners.",
      fullDetails: "Whether you prefer traditional ceramic braces or modern clear aligners (like Invisalign), we design personalized orthodontic plans to guide your teeth into perfect, healthy alignment.",
      priceRange: "Custom Plan",
      duration: "6 - 24 months",
      benefits: ["Perfects smile symmetry", "Improves bite alignment", "Clear, removable aligner options", "Boosts confidence and oral hygiene"],
      faqs: [
        { q: "Are clear aligners suitable for everyone?", a: "Aligners work well for mild to moderate crowding or spacing. Complex cases may need braces." },
        { q: "Do aligners hurt?", a: "You may feel temporary pressure for a few days when changing to a new set of aligners." }
      ]
    },
    {
      id: "scaling",
      title: "Scaling",
      category: "General & Preventive",
      image: "Scaling.jpg",
      description: "Remove plaque, tartar, and surface stains to restore clean, healthy gums and fresh breath.",
      fullDetails: "Our professional scaling and polishing utilizes ultrasonic scalers to safely and gently clear away plaque and hardened tartar from above and below the gumline, followed by a polishing paste to remove stubborn external stains.",
      priceRange: "Standard Rate",
      duration: "30 - 45 mins",
      benefits: ["Removes plaque and tartar", "Freshens breath", "Prevents gum disease", "Brightens your smile"],
      faqs: [
        { q: "Is scaling painful?", a: "No, ultrasonic scaling is generally comfortable. We adjust the settings for sensitive teeth." },
        { q: "How often should I get it done?", a: "Every 6 months to maintain optimal gum health." }
      ]
    },
    {
      id: "children",
      title: "Children Dental Care",
      category: "Pediatric Care",
      image: "Child.jpg",
      description: "Friendly, gentle pediatric dental treatments including sealants, fluorides, and early cavity prevention.",
      fullDetails: "We provide a warm, encouraging environment to guide children through their first dental experiences. Our services include checkups, fluoride treatments, protective sealants, and cavity fillings.",
      priceRange: "Standard Rate",
      duration: "30 - 45 mins",
      benefits: ["Creates positive dental habits", "Prevents childhood cavities", "Protective dental sealants", "Gentle, child-friendly approach"],
      faqs: [
        { q: "When should a child first visit the dentist?", a: "Around their first birthday, or when their first tooth emerges." },
        { q: "What are dental sealants?", a: "Thin protective coatings applied to chewing surfaces of back teeth to prevent decay." }
      ]
    },
    {
      id: "wisdom_tooth_removal",
      title: "Wisdom Tooth Removal",
      category: "Surgical & Gum Care",
      image: "wisdom.jpg",
      description: "Specialized extraction of impacted, painful, or misaligned wisdom teeth with surgical precision.",
      fullDetails: "Safe and surgical removal of third molars (wisdom teeth) that are impacted, causing pressure, tooth crowding, or recurring gum infections. Performed under gentle local anesthesia for maximum patient comfort.",
      priceRange: "Based on complexity",
      duration: "45 - 60 mins",
      benefits: ["Relieves severe molar and jaw pain", "Prevents crowding & alignment shifts", "Protects adjacent teeth from decay", "Prevents recurring gum infections"],
      faqs: [
        { q: "Is wisdom tooth extraction painful?", a: "The procedure is completely numbed with local anesthesia. Post-operative discomfort is easily managed with prescribed care." },
        { q: "How long is the recovery?", a: "Most patients recover comfortably within 3 to 5 days following post-extraction guidelines." }
      ]
    },
    {
      id: "teeth_whitening",
      title: "Teeth Whitening",
      category: "Cosmetic & Aesthetics",
      image: "teethWhitening.jpeg",
      description: "Professional in-office laser whitening to remove deep stains and dramatically brighten your smile.",
      fullDetails: "Safe, effective clinical teeth bleaching treatment that lifts deep discoloration caused by coffee, tea, smoking, and aging, brightening teeth by several shades in a single comfortable session.",
      priceRange: "Standard Rate",
      duration: "45 - 60 mins",
      benefits: ["Instant multi-shade whitening", "Safe on tooth enamel", "Removes stubborn deep stains", "Boosts overall smile confidence"],
      faqs: [
        { q: "Will whitening damage my enamel?", a: "No, professional clinical bleaching formulas are carefully pH-balanced and completely safe for enamel." },
        { q: "How long do whitening results last?", a: "Results typically last 1 to 2 years depending on dietary habits and oral hygiene." }
      ]
    },
    {
      id: "dental_veneers",
      title: "Dental Veneers",
      category: "Cosmetic & Aesthetics",
      image: "dentalV.jpg",
      description: "Ultra-thin custom porcelain or composite shells that transform shape, shade, and alignment.",
      fullDetails: "Custom-crafted thin porcelain laminates bonded to the front surface of teeth to instantly correct discoloration, chipped edges, minor gaps, and irregular tooth shapes for a flawless Hollywood smile.",
      priceRange: "Per Tooth",
      duration: "2 - 3 visits",
      benefits: ["Instant smile transformation", "Stain-resistant porcelain material", "Corrects gaps, chips & shade", "Minimal tooth reduction required"],
      faqs: [
        { q: "How long do porcelain veneers last?", a: "High-quality porcelain veneers typically last 10 to 15+ years with good care." },
        { q: "Are veneers stain resistant?", a: "Yes, porcelain is highly resistant to staining from coffee, tea, and red wine." }
      ]
    },
    {
      id: "post_and_core",
      title: "Post and Core Treatment",
      category: "Implants & Restorative",
      image: "post.jpeg",
      description: "Rebuild heavily broken or root-canal-treated teeth to provide a sturdy foundation for a crown.",
      fullDetails: "When a tooth has lost significant natural structure due to extensive decay or fracture, a post is anchored into the root canal space, built up with a durable core material to securely anchor a protective dental crown.",
      priceRange: "Per Tooth",
      duration: "45 - 60 mins",
      benefits: ["Saves severely damaged natural teeth", "Creates a solid foundation for crowns", "Restores structural stability", "Prevents tooth extraction"],
      faqs: [
        { q: "When is a post and core needed?", a: "It is required when a root-canal-treated tooth lacks enough natural structure to hold a crown." },
        { q: "Is the procedure painful?", a: "No, as the tooth has already undergone root canal treatment, there is no active nerve pain." }
      ]
    },
    {
      id: "gingivectomy",
      title: "Gingivectomy",
      category: "Surgical & Gum Care",
      image: "Gingivectomy.jpg",
      description: "Surgical removal of diseased or excess gum tissue to treat periodontal pockets or gummy smiles.",
      fullDetails: "Precision excision of overgrown or diseased gum tissue. Gingivectomy eliminates deep periodontal pockets where bacteria hide, halts progressive gum disease, and reshapes excess gum tissue.",
      priceRange: "Based on area",
      duration: "45 - 60 mins",
      benefits: ["Eliminates deep bacterial pockets", "Halts periodontal destruction", "Improves gum tissue health", "Reduces excessive gum display"],
      faqs: [
        { q: "How long does it take for gums to heal after gingivectomy?", a: "Initial surface healing takes about 7 to 14 days, with full tissue maturation over a few weeks." },
        { q: "Is local anesthesia used?", a: "Yes, the area is completely numbed so you remain comfortable throughout." }
      ]
    },
    {
      id: "gingivoplasty",
      title: "Gingivoplasty",
      category: "Cosmetic & Aesthetics",
      image: "Gingivoplasty.jpeg",
      description: "Cosmetic surgical sculpting of gum margins for symmetrical, aesthetically pleasing gumlines.",
      fullDetails: "Surgical reshaping of healthy gum tissue around teeth to correct asymmetrical margins, thick ledges, or irregular contours, enhancing overall cosmetic smile harmony.",
      priceRange: "Custom Plan",
      duration: "30 - 45 mins",
      benefits: ["Creates symmetrical gum contours", "Enhances smile aesthetics", "Smooths irregular tissue edges", "Quick healing and minimal downtime"],
      faqs: [
        { q: "What is the difference between gingivectomy and gingivoplasty?", a: "Gingivectomy removes diseased or excess tissue, whereas gingivoplasty reshapes healthy tissue for cosmetic balance." },
        { q: "Will my gums grow back?", a: "When properly sculpted by a specialist, the reshaped contours remain stable." }
      ]
    },
    {
      id: "bone_grafting",
      title: "Bone Grafting",
      category: "Surgical & Gum Care",
      image: "BoneGrafting.jpg",
      description: "Rebuild jawbone volume and density to prepare for stable dental implant placement.",
      fullDetails: "Surgical procedure utilizing specialized bio-compatible bone graft material to regenerate lost bone height and width caused by extraction, trauma, or gum disease, providing solid anchorage for implants.",
      priceRange: "Based on site",
      duration: "45 - 90 mins",
      benefits: ["Restores jawbone density", "Enables successful implant placement", "Preserves facial bone structure", "Prevents long-term bone collapse"],
      faqs: [
        { q: "How long does bone graft integration take?", a: "Bone graft material integrates naturally over 3 to 6 months before placing implants." },
        { q: "Where does the bone graft material come from?", a: "We use sterile, certified synthetic or natural bio-materials engineered for safe bone growth." }
      ]
    },
    {
      id: "complete_dentures",
      title: "Complete Dentures",
      category: "Implants & Restorative",
      image: "Complete-denture.jpg",
      description: "Custom full-arch removable prosthetics to restore chewing function, speech, and youthful facial support.",
      fullDetails: "Custom-designed, lightweight removable full dentures tailored to fit the exact contours of your upper or lower arches, replacing all missing teeth while providing natural facial esthetics and chewing ability.",
      priceRange: "Per Arch / Full Set",
      duration: "3 - 4 visits",
      benefits: ["Full arch tooth replacement", "Restores clear speech & chewing", "Supports facial muscles & lips", "Custom shade and comfortable fit"],
      faqs: [
        { q: "How long does it take to get used to new dentures?", a: "Most patients adjust within 2 to 4 weeks with initial practice speaking and eating soft foods." },
        { q: "Should I sleep in my complete dentures?", a: "It is recommended to remove them overnight to let your gums rest and stay healthy." }
      ]
    },
    {
      id: "implant_supported_dentures",
      title: "Implant-Supported Dentures",
      category: "Implants & Restorative",
      image: "Implant-SupportedDentures.jpg",
      description: "Snap-on overdentures fixed onto dental implants for superior stability without slippage.",
      fullDetails: "An advanced solution combining dental implants with custom dentures. Special attachments snap onto 2 to 4 titanium implants in the jaw, eliminating slipping, palate coverage, and messy adhesives.",
      priceRange: "Custom Plan",
      duration: "3 - 6 months",
      benefits: ["Zero slipping or clicking", "No messy denture adhesives needed", "Superior chewing power & stability", "Preserves jawbone from shrinking"],
      faqs: [
        { q: "Can my current dentures be converted?", a: "In some cases, existing dentures can be modified with special locator attachments to fit implants." },
        { q: "Are implant dentures removable?", a: "We offer both snap-on removable overdentures and fixed non-removable implant bridges." }
      ]
    },
    {
      id: "gum_contouring",
      title: "Gum Contouring",
      category: "Cosmetic & Aesthetics",
      image: "Gum Contouring.jpg",
      description: "Laser or surgical reshaping of uneven gumlines to reveal longer, beautifully proportioned teeth.",
      fullDetails: "Minimally invasive cosmetic sculpting designed to correct a 'gummy' smile or uneven gum level, exposing more natural enamel for a balanced, harmonious aesthetic smile line.",
      priceRange: "Per Quadrant / Arch",
      duration: "30 - 45 mins",
      benefits: ["Corrects gummy smiles", "Evens out asymmetrical gum lines", "Minimally invasive precision", "Immediate cosmetic transformation"],
      faqs: [
        { q: "Does gum contouring involve lasers?", a: "Yes, we often use dental lasers for precise trimming with instant cauterization and minimal bleeding." },
        { q: "Is healing fast?", a: "Yes, soft tissue healing typically occurs within a few days to a week." }
      ]
    },
    {
      id: "night_guards",
      title: "Night Guards for Teeth Grinding",
      category: "General & Preventive",
      image: "Night-Guards.jpg",
      description: "Custom-fit protective night appliances to prevent tooth wear, jaw pain, and bruxism damage.",
      fullDetails: "Custom-fabricated durable night guards engineered to cushion your upper and lower teeth during sleep, protecting enamel from heavy nighttime clenching, grinding (bruxism), and TMJ strain.",
      priceRange: "Standard Rate",
      duration: "2 visits",
      benefits: ["Protects enamel from heavy wear", "Relieves morning jaw pain & headaches", "Custom comfortable fit", "Prevents tooth fractures & restorations"],
      faqs: [
        { q: "How do custom night guards compare to store-bought ones?", a: "Custom guards are precision-molded to your bite, offering far greater comfort, durability, and breathability." },
        { q: "How do I clean my night guard?", a: "Rinse with cool water daily and brush gently with mild soap or denture cleaner." }
      ]
    },
    {
      id: "sports_guards",
      title: "Sports Guards",
      category: "General & Preventive",
      image: "Sports-Mouth-Guard.jpg",
      description: "Shock-absorbing custom athletic mouthguards to safeguard teeth and gums during sports.",
      fullDetails: "High-impact custom mouthguards designed for athletes and sports enthusiasts. Protects teeth, lips, tongue, and jaw from impact injuries during contact sports and high-intensity activities.",
      priceRange: "Standard Rate",
      duration: "2 visits",
      benefits: ["Maximum shock absorption", "Prevents tooth loss and lip lacerations", "Custom fit allows clear breathing & speech", "Durable tear-resistant material"],
      faqs: [
        { q: "Why choose a custom sports guard over over-the-counter guards?", a: "Custom sports guards fit snugly over teeth without slipping, allowing effortless breathing, speaking, and maximum protection." },
        { q: "How long does a sports guard last?", a: "Typically 1 to 2 seasons depending on usage and growth." }
      ]
    },
    {
      id: "inlays_and_onlays",
      title: "Inlay and Onlays",
      category: "Cosmetic & Aesthetics",
      image: "Inlays_Onlays.jpg",
      description: "Custom porcelain or composite partial crowns to repair moderately damaged back teeth.",
      fullDetails: "Lab-crafted indirect restorations used when a tooth has too much damage for a standard filling but enough healthy enamel to avoid a full crown. Inlays fit within cusps, while onlays cover one or more cusps.",
      priceRange: "Per Tooth",
      duration: "2 visits",
      benefits: ["Conserves natural tooth structure", "Extremely strong porcelain material", "Seamless color matching", "Longer lasting than standard fillings"],
      faqs: [
        { q: "What is the difference between an inlay and an onlay?", a: "An inlay fills the space between cusps inside the tooth, while an onlay extends over one or more cusps." },
        { q: "Are inlays stronger than fillings?", a: "Yes, ceramic inlays and onlays increase tooth strength by up to 75%." }
      ]
    },
    {
      id: "gum_flap_surgery",
      title: "Gum (Flap Surgery)",
      category: "Surgical & Gum Care",
      image: "Gum-jpg",
      description: "Advanced periodontic surgery to clean deep root surfaces and regenerate damaged bone structures.",
      fullDetails: "Specialized periodontal procedure where gum tissue is gently separated from teeth to gain direct visual access for deep scaling, root planing, and bacterial debridement in severe periodontitis cases.",
      priceRange: "Per Quadrant",
      duration: "60 - 90 mins",
      benefits: ["Cleans deep un-reachable root surfaces", "Halts advanced periodontal decay", "Reduces deep gum pocket depth", "Allows bone grafting & tissue regeneration"],
      faqs: [
        { q: "When is flap surgery required?", a: "When gum disease has progressed deeply and non-surgical scaling cannot reach deep root deposits." },
        { q: "What is recovery like?", a: "Mild discomfort is managed with prescribed medication; stitches dissolve or are removed in 7-10 days." }
      ]
    },
    {
      id: "fluoride_application",
      title: "Fluoride Application",
      category: "General & Preventive",
      image: "Fluoride-Application.jpg",
      description: "High-potency mineral varnish treatment to remineralize enamel and shield against decay.",
      fullDetails: "A quick, painless preventive treatment where a concentrated fluoride gel or varnish is applied directly to teeth to strengthen weakened enamel, reduce root sensitivity, and prevent future cavities.",
      priceRange: "Standard Rate",
      duration: "15 - 20 mins",
      benefits: ["Remineralizes early enamel erosion", "Significantly reduces cavity risk", "Desensitizes sensitive tooth roots", "Fast, painless application"],
      faqs: [
        { q: "Can adults benefit from fluoride application?", a: "Yes! Fluoride is highly beneficial for adults with gum recession, root sensitivity, or high cavity risk." },
        { q: "How long after treatment before I can eat?", a: "You can eat soft foods immediately, but avoid hot liquids and hard foods for 4 to 6 hours." }
      ]
    },
    {
      id: "full_mouth_rehabilitation",
      title: "Full Mouth Rehabilitation",
      category: "Implants & Restorative",
      image: "Full-Mouth-Rehabilitation.jpg",
      description: "Comprehensive multi-disciplinary treatment to rebuild worn, broken, or missing teeth across the entire mouth.",
      fullDetails: "A customized master treatment plan combining prosthodontics, implantology, endodontics, and periodontics to fully restore severely worn, broken, misaligned, or missing teeth for optimal bite function and jaw harmony.",
      priceRange: "Custom Comprehensive Plan",
      duration: "Multiple Phases",
      benefits: ["Restores total bite function & chewing power", "Completely transforms smile aesthetics", "Relieves chronic jaw joint & TMJ pain", "Long-lasting structural rehabilitation"],
      faqs: [
        { q: "Who needs full mouth rehabilitation?", a: "Patients with severely worn teeth, multiple missing teeth, severe bite collapse, or extensive dental trauma." },
        { q: "How long does the complete process take?", a: "Depending on the complexity, treatment can span from a few weeks to several months across planned phases." }
      ]
    }
  ];

  const serviceCategories = [
    "All",
    "General & Preventive",
    "Cosmetic & Aesthetics",
    "Implants & Restorative",
    "Surgical & Gum Care",
    "Orthodontics",
    "Pediatric Care",
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedServiceCategory === "All" || service.category === selectedServiceCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
      service.fullDetails.toLowerCase().includes(serviceSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });



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

  const serviceHeaderVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const serviceContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: 0.2
      }
    }
  };

  const serviceCardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    },
    hover: {
      y: -8,
      borderColor: "rgba(168, 85, 247, 0.4)",
      boxShadow: "0 20px 45px rgba(0, 0, 0, 0.65), 0 0 25px rgba(168, 85, 247, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
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
            className="w-20 h-20 rounded-full bg-[#0e071b] border-2 border-[#35063e] flex items-center justify-center overflow-hidden z-10"
          >
            <img src="/logo.png" alt="Dr. Varshney's Logo" className="w-full h-full object-cover rounded-full" />
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
    <div className="min-h-screen bg-[#090611] text-[#FFFFFF] relative selection:bg-[#35063e]/40 selection:text-[#FFFFFF] bg-grid-pattern overflow-x-hidden">

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
              <span className="font-extrabold text-sm sm:text-base tracking-wide text-white block group-hover:text-[#D8B4FE] transition-colors leading-none">
                DR. VARSHNEY'S
              </span>
              <span className="text-[7px] sm:text-[8px] uppercase font-bold text-[#D8B4FE] tracking-[0.15em] sm:tracking-[0.2em] block mt-0.5">
                Dental Aesthetics
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/70">
            {["Home", "Services", "About Doctor", "Why Choose Us", "FAQ", "Contact Us"].map((link) => {
              const isActive = activeSection === link;
              const linkTarget =
                link === "Home" ? "#hero" :
                  link === "Services" ? "#services" :
                    link === "About Doctor" ? "#doctor" :
                      link === "Why Choose Us" ? "#why-choose-us" :
                        link === "FAQ" ? "#faq" : "#contact";

              return (
                <a
                  key={link}
                  href={linkTarget}
                  onClick={() => setActiveSection(link)}
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
            <motion.a
              href="https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1.5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-xl bg-[#090611]/85 border border-purple-500/40 hover:border-purple-400 text-white font-semibold text-xs flex items-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Book Appointment</span>
            </motion.a>
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
                {["Home", "Services", "About Doctor", "Why Choose Us", "FAQ", "Contact Us"].map((link) => {
                  const targetId =
                    link === "Home" ? "hero" :
                      link === "Services" ? "services" :
                        link === "About Doctor" ? "doctor" :
                          link === "Why Choose Us" ? "why-choose-us" :
                            link === "FAQ" ? "faq" : "contact";

                  return (
                    <a
                      key={link}
                      href={`#${targetId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        setTimeout(() => {
                          const targetElement = document.getElementById(targetId);
                          if (targetElement) {
                            const offset = 90; // Height of fixed header + padding
                            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                            const offsetPosition = elementPosition - offset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth"
                            });
                          }
                        }, 150);
                      }}
                      className="py-2 text-base font-semibold hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  );
                })}
                <div className="border-t border-white/10 pt-4">
                  <a
                    href="https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-3 rounded-full bg-gradient-to-r from-purple-800 to-indigo-900 border border-purple-500/30 text-white font-semibold text-center cursor-pointer transition-all duration-300"
                  >
                    Book Appointment
                  </a>
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
        className="relative pt-32 pb-8 md:pt-40 md:pb-10 overflow-hidden group/hero min-h-screen flex flex-col justify-between"
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
            <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left items-center lg:items-start space-y-7">

              {/* Doctor Badge */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-[20px] bg-[#18022a]/30 backdrop-blur-md border border-[#35063e]/40 text-white text-[10px] sm:text-xs font-semibold tracking-wide w-fit transition-colors duration-300 hover:border-[#35063e]/80"
              >
                <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3 text-[#D8B4FE]" />
                </div>
                <span>Dr. Ayush Varshney B.D.S, (Dental Surgeon)</span>
              </motion.div>

              {/* Modern Sans Heading */}
              <h1 className="text-3xl sm:text-6xl lg:text-[72px] font-sans font-extrabold text-white tracking-tighter leading-[1.05] flex flex-col gap-1.5">
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="block text-[11px] sm:text-sm font-sans font-bold text-[#D8B4FE] uppercase tracking-[0.08em] sm:tracking-[0.15em] mb-2"
                  >
                    Dr. Varshney's Dental Aesthetics
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                    className="block"
                  >
                    Healthy Teeth.
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                    className="block beautiful-smiles-glow"
                  >
                    Beautiful Smiles.
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
                Modern dental care by Dr. Ayush Varshney in Nani Daman, offering root canal treatment, dental implants, braces, teeth cleaning, and complete family dental care.
              </motion.p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
                {/* Book Appointment (Primary) */}
                <motion.a
                  href="https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    y: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.2 },
                    opacity: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.2 }
                  }}
                  whileHover={{ y: -2, scale: 1.01, boxShadow: "0px 10px 25px -5px rgba(168, 85, 247, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 rounded-full bg-[#35063e] hover:bg-[#4a0956] text-white font-semibold text-base shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300 ease-out flex items-center gap-2 cursor-pointer border border-purple-500/50 hover:border-purple-400"
                >
                  <CalendarDays className="w-5 h-5 text-white" />
                  <span>Book Appointment</span>
                </motion.a>
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
                  <span className="text-2xl font-bold text-white leading-none">3</span>
                  <span className="text-xl font-bold text-purple-400 leading-none">+</span>
                </div>
                <div className="text-xs font-semibold text-white/90 mt-1">Years Experience</div>
                <div className="text-[10px] text-white/40 mt-0.5">Delivering Excellence</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 text-left px-4 sm:border-l sm:border-white/10">
              <div className="w-12 h-12 rounded-full border border-purple-500/20 bg-purple-500/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Smile className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white leading-none">2500</span>
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
            <div className="flex items-center gap-4 text-left px-4 sm:border-l lg:border-white/10">
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


        </div>

      </section>

      {/* ------------------ SERVICES SECTION ------------------ */}
      <section id="services" className="pt-12 pb-20 lg:pt-16 lg:pb-28 relative overflow-hidden border-y border-purple-500/10 bg-[#090611]">
        
        {/* Soft radial purple gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-purple-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-[10%] w-[350px] h-[350px] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Low-opacity oversized background typography for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] sm:text-[200px] lg:text-[320px] font-black text-white/[0.012] tracking-[0.25em] select-none pointer-events-none -z-10 font-sans uppercase">
          SERVICES
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={serviceHeaderVariants}
            className="text-center max-w-3xl mx-auto flex flex-col items-center mb-8 lg:mb-10"
          >
            {/* Small glassmorphism pill label */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a0516]/65 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1),_inset_0_1px_0_rgba(255,255,255,0.1)] text-xs font-semibold text-purple-300 tracking-wider uppercase backdrop-blur-[10px]">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Our Services ({services.length})</span>
            </div>

            {/* Large elegant heading matching hero/site UI */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15] mt-6">
              Elevating Oral Health <br />
              <span className="beautiful-smiles-glow">With Artistic Precision</span>
            </h2>

            <p className="text-white/60 text-sm sm:text-base mt-4 max-w-2xl font-light">
              Explore our comprehensive range of specialized dental treatments. Click on any treatment to view full procedures, clinical benefits, and specific FAQs.
            </p>
          </motion.div>

          {/* Search & Category Filter Controls */}
          <div className="mb-10 lg:mb-12 space-y-6">
            
            {/* Search Input Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300/60" />
              <input
                type="text"
                value={serviceSearchQuery}
                onChange={(e) => setServiceSearchQuery(e.target.value)}
                placeholder="Search treatments or symptoms (e.g. root canal, whitening)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#120a24]/80 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white text-sm placeholder:text-white/40 shadow-lg backdrop-blur-md transition-all"
              />
              {serviceSearchQuery && (
                <button
                  onClick={() => setServiceSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {serviceCategories.map((cat) => {
                const isSelected = selectedServiceCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedServiceCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] border border-purple-400/40"
                        : "bg-[#120a24]/50 border border-white/10 text-white/70 hover:text-white hover:bg-purple-500/20"
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Empty Search / Filter State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16 px-4 rounded-3xl bg-[#120a24]/30 border border-white/5 max-w-md mx-auto space-y-4">
              <HelpCircle className="w-10 h-10 text-purple-400/60 mx-auto" />
              <div>
                <h3 className="text-lg font-bold text-white">No treatments found</h3>
                <p className="text-xs text-white/60 mt-1">Try resetting your search query or selecting a different category filter.</p>
              </div>
              <button
                onClick={() => {
                  setSelectedServiceCategory("All");
                  setServiceSearchQuery("");
                }}
                className="px-5 py-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-semibold border border-purple-500/30 transition-all cursor-pointer"
              >
                Reset Filters & Search
              </button>
            </div>
          )}

          {/* Services Grid with Microdata SEO */}
          {filteredServices.length > 0 && (
            <motion.div
              variants={serviceContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {filteredServices.map((service) => (
                <motion.article
                  key={service.id}
                  variants={serviceCardVariants}
                  whileHover="hover"
                  onClick={() => setActiveServiceDetail(service)}
                  itemScope
                  itemType="https://schema.org/MedicalProcedure"
                  className="relative group flex flex-col justify-between rounded-[28px] bg-gradient-to-b from-[#120a24]/50 to-[#0a0516]/70 backdrop-blur-[24px] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55),_0_0_20px_rgba(168,85,247,0.03),_inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 text-left overflow-hidden min-h-[420px] sm:min-h-[480px] cursor-pointer"
                >
                  <div>
                    {/* Image container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5">
                      <motion.img
                        itemProp="image"
                        src={service.image}
                        alt={`${service.title} treatment at Dr. Varshney's Dental Aesthetics in Nani Daman`}
                        variants={{
                          hover: { scale: 1.05 }
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#090514]/40 mix-blend-multiply pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0516]/95 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider text-purple-200 bg-[#0a0516]/80 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/30">
                        {service.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 itemProp="name" className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-purple-300 transition-colors duration-300 font-sans">
                        {service.title}
                      </h3>
                      <p itemProp="description" className="text-white/60 text-sm leading-relaxed mt-3 line-clamp-3 font-light">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="p-8 pt-0 flex items-center justify-between mt-auto">
                    <span className="text-[11px] uppercase font-semibold text-purple-300/80 tracking-wider bg-purple-500/10 px-3.5 py-1 rounded-full border border-purple-500/20">{service.priceRange}</span>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveServiceDetail(service);
                      }}
                      aria-label={`View detailed information for ${service.title}`}
                      className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        variants={{
                          hover: { x: 2, rotate: -45 }
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

        </div>
      </section>

      {/* ------------------ MEET YOUR DOCTOR SECTION ------------------ */}
      <DoctorProfile />

      {/* ------------------ WHY CHOOSE OUR CLINIC SECTION ------------------ */}
      <WhyChooseUs />













      {/* ------------------ FAQ SECTION ------------------ */}
      <section id="faq" className="relative pt-10 pb-20 lg:pt-14 lg:pb-24 border-t border-[#35063e]/20">
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
                    className="w-full p-4 sm:p-6 flex justify-between items-center text-left text-white font-semibold hover:text-[#D8B4FE] transition-colors cursor-pointer"
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
                        <div className="p-4 sm:p-6 pt-0 sm:pt-0 border-t border-[#35063e]/20 text-sm text-text-muted/70 leading-relaxed">
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

      {/* ------------------ CONTACT US SECTION ------------------ */}
      <ContactUs />

      {/* ------------------ FOOTER ------------------ */}
      <footer className="bg-[#090611] text-white py-16 relative border-t border-[#35063e]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-left mb-12">

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
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#doctor" className="hover:text-white transition-colors">About Doctor</a></li>
                <li><a href="#why-choose-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#D8B4FE] text-xs uppercase tracking-wider">Our Services</h4>
              <ul className="text-xs text-text-muted/70 space-y-2">
                <li>Scaling</li>
                <li>Tooth Filling</li>
                <li>Tooth Extraction</li>
                <li>Root Canal Treatment</li>
                <li>Crowns & Bridges, Dentures</li>
                <li>Implants</li>
                <li>Braces & Aligners</li>
                <li>Children Dental Care</li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#D8B4FE] text-xs uppercase tracking-wider">Contact Us</h4>
              <ul className="text-xs text-text-muted/70 space-y-2.5">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D8B4FE] shrink-0 mt-0.5" />
                  <span>Airport Road, Nani Daman</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D8B4FE]" />
                  <a href="tel:7977454648" className="hover:text-white font-bold transition-colors">+91 79774 54648</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D8B4FE]" />
                  <a href="mailto:dr.varshneydental@gmail.com" className="hover:text-white transition-colors">dr.varshneydental@gmail.com</a>
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
              className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0e071b] border-l border-[#35063e]/30 p-5 sm:p-8 shadow-2xl z-50 overflow-y-auto flex flex-col justify-between text-left"
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

                {/* Service Image */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-[#0e071b]">
                  <img
                    src={activeServiceDetail.image}
                    alt={activeServiceDetail.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#090514]/20 mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e071b] via-transparent to-transparent pointer-events-none" />
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

                {/* Book Visit CTA inside Drawer */}
                <div className="pt-6 border-t border-purple-500/20">
                  <button
                    onClick={() => {
                      setBookingForm(prev => ({ ...prev, service: activeServiceDetail.title }));
                      setActiveServiceDetail(null);
                      setIsBookingOpen(true);
                    }}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer border border-purple-400/30"
                  >
                    <CalendarDays className="w-4 h-4" />
                    <span>Book Visit for {activeServiceDetail.title}</span>
                  </button>
                </div>

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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-full sm:max-w-xl bg-[#0e071b] border border-[#35063e]/30 p-6 sm:p-8 rounded-3xl shadow-2xl z-50 overflow-y-auto max-h-[90vh] text-left text-[#FFFFFF]"
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
