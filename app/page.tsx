"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WebThreads from "./components/WebThreads";
import DoctorProfile from "./components/DoctorProfile";
import WhyChooseUs from "./components/WhyChooseUs";
import PillarsOfPractice from "./components/PillarsOfPractice";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import ContactUs from "./components/ContactUs";
import { doctorsData as doctors } from "./data/doctors";
import {
  Calendar,
  User,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Check,
  X,
  HelpCircle,
  CalendarDays,
  ArrowUp,
  Search,
} from "lucide-react";
import { BrandedLoader } from "./components/BrandedLoader";
import { services, serviceCategories, ServiceDetail } from "./data/services";

// Types
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

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle parallax drift on the hero portrait as the page scrolls past it
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroScrollProgress, [0, 1], ["0%", "12%"]);

  // Page Load State
  // const [isLoading, setIsLoading] = useState(true);

  // Scroll Y position tracker (drives the back-to-top button)
  const [scrollY, setScrollY] = useState(0);

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
    notes: "",
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("varshney_appointments");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [lastBookedAppointment, setLastBookedAppointment] =
    useState<Appointment | null>(null);

  // Listen to window scroll position for the back-to-top button
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save appointments helper
  const saveAppointments = (newAppointments: Appointment[]) => {
    setAppointments(newAppointments);
    localStorage.setItem(
      "varshney_appointments",
      JSON.stringify(newAppointments),
    );
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
        notes: bookingForm.notes,
      };

      const updated = [newAppt, ...appointments];
      saveAppointments(updated);
      setLastBookedAppointment(newAppt);
      setBookingSuccess(true);
      setIsSubmitting(false);

      // Reset Form
      setBookingForm((prev) => ({
        ...prev,
        service: "Scaling",
        doctor: "Dr. Ayush Varshney, B.D.S. (Dental Surgeon)",
        date: "",
        notes: "",
      }));
    }, 1200);
  };

  // Selected Service Detail Modal/Drawer State
  const [activeServiceDetail, setActiveServiceDetail] =
    useState<ServiceDetail | null>(null);

  // Category filter state & search query for services
  const [selectedServiceCategory, setSelectedServiceCategory] =
    useState<string>("All");
  const [serviceSearchQuery, setServiceSearchQuery] = useState<string>("");

  // Services Data — always shows the full filtered catalog, no collapse/expand
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedServiceCategory === "All" ||
      service.category === selectedServiceCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
      service.description
        .toLowerCase()
        .includes(serviceSearchQuery.toLowerCase()) ||
      service.fullDetails
        .toLowerCase()
        .includes(serviceSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const serviceHeaderVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const serviceContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const serviceCardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#030109] text-[#FFFFFF] relative selection:bg-[#35063e]/40 selection:text-[#FFFFFF] overflow-x-hidden">
      <BrandedLoader />
      {/* Background radial overlays */}
      <Navbar />

      {/* ------------------ HERO SECTION ------------------ */}
      <section
        id="hero"
        ref={heroRef}
        className="relative overflow-hidden group/hero min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#110A22] px-40"
      >
        {/* Animated web-threads shader — the base surface, replaces the flat fill color */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <WebThreads
            color1="#a855f7"
            color2="#f472b6"
            color3="#d8b4fe"
            speed={0.15}
            threadCount={5}
            frequency={4}
            spread={0.16}
            taper={1.0}
            position={0.5}
            fanMode="right"
            glow={0.015}
            falloff={0.6}
            thickness={1.1}
            brightness={0.45}
            opacity={0.8}
            mirror
            grain
            grainIntensity={0.04}
            mouseInteraction={false}
            mouseStrength={0.25}
          />
        </div>

        {/* Ambient ombré glows — soft, slow, breathing (opacity + scale + gentle drift) */}
        <div
          className="absolute pointer-events-none rounded-full blur-[140px] z-[5]"
          style={{
            width: "620px",
            height: "620px",
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.38) 0%, transparent 70%)",
            left: "-12%",
            top: "8%",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full blur-[160px] z-[5]"
          style={{
            width: "720px",
            height: "720px",
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.34) 0%, transparent 70%)",
            right: "-16%",
            bottom: "-5%",
          }}
        />
        <div className="w-full h-full absolute inset-0 bg-purple-500/5 backdrop-blur-[2px]" />
        <div className="w-1/2 h-full absolute inset-0 bg-gradient-to-r from-black/55 to-pink-500/0 backdrop-blur-[2px]" />

        {/* Left Pane: Content */}
        <div className="relative z-10 flex items-center justify-center lg:justify-start px-6 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-10 pt-36 pb-14 lg:py-32">
          <div className="max-w-xl flex flex-col text-center lg:text-left items-center lg:items-start space-y-6 lg:space-y-7">
            {/* Modern Sans Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-sans font-extrabold text-white tracking-tighter leading-[1.05] flex flex-col gap-1.5">
              <span className="block overflow-hidden py-0.5">
                <span className="block text-[11px] sm:text-sm font-sans font-bold text-[#D8B4FE] uppercase tracking-[0.08em] sm:tracking-[0.15em] mb-2">
                  Dr. Varshney&apos;s Dental Aesthetics
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="block">Healthy Teeth.</span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="block beautiful-smiles-glow">
                  Beautiful Smiles.
                </span>
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-white/60 text-base sm:text-lg max-w-lg leading-relaxed font-sans">
              Modern dental care by Dr. Ayush Varshney in Nani Daman, offering
              root canal treatment, dental implants, braces, teeth cleaning, and
              complete family dental care.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
              {/* Book Appointment (Primary) */}
              <motion.a
                href="https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -2,
                  scale: 1.01,
                  boxShadow: "0px 10px 25px -5px rgba(168, 85, 247, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-full bg-[#35063e] hover:bg-[#4a0956] text-white font-semibold text-base shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300 ease-out flex items-center gap-2 cursor-pointer border border-purple-500/50 hover:border-purple-400"
              >
                <CalendarDays className="w-5 h-5 text-white" />
                <span>Book Appointment</span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Right Pane: Full-viewport-height portrait, contained to its own column, inset from the top */}
        <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-screen overflow-hidden">
          <div className="absolute left-0 right-0 bottom-0 top-24 sm:top-28 lg:top-16 ">
            <Image
              src="/hero.png"
              alt="Dr. Ayush Varshney, Dental Surgeon"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          {/* Seam blend between the two panes (desktop only — panes are stacked on mobile) */}
          {/* <div className="hidden lg:block absolute inset-y-0 left-0 w-32 xl:w-40 bg-gradient-to-r from-[#030109] to-transparent pointer-events-none" /> */}
        </div>
        {/* Top scrim so the navbar stays legible over the photo */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#030109] to-transparent pointer-events-none" />
        {/* Bottom seam — blends the hero into the Services section background */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030109] via-[#030109]/45 to-transparent pointer-events-none z-[6]" />
      </section>

      {/* ------------------ WHY CHOOSE OUR CLINIC SECTION ------------------ */}
      <WhyChooseUs />

      {/* ------------------ SERVICES SECTION ------------------ */}
      <section
        id="services"
        className="pt-12 pb-20 lg:pt-16 lg:pb-28 relative overflow-hidden bg-[#030109]"
      >
        {/* Soft radial purple gradients — slow ambient drift */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-purple-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 left-[10%] w-[350px] h-[350px] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none -z-10"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={serviceHeaderVariants}
            className="text-center max-w-3xl mx-auto flex flex-col items-center mb-8 lg:mb-10"
          >
            {/* Thin accent rule */}
            <div className="h-px w-10 bg-purple-500/60" />

            {/* Large elegant heading matching hero/site UI */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15] mt-6">
              Elevating Oral Health <br />
              <span className="beautiful-smiles-glow">
                With Artistic Precision
              </span>
            </h2>

            <p className="text-white/60 text-sm sm:text-base mt-4 max-w-2xl font-light">
              Our most requested treatments, at a glance. Click any card for
              full procedure details, clinical benefits, and FAQs.
            </p>
          </motion.div>

          {/* Search & Category Filter Controls */}
          <div className="mb-10 lg:mb-12 space-y-6">
            {/* Search Input Bar */}
            <div className="max-w-md mx-auto relative group/search">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 -ml-2 rounded-full flex items-center justify-center bg-purple-500/10 group-focus-within/search:bg-purple-500/20 transition-colors duration-300 pointer-events-none z-10!">
                <Search className="w-4 h-4 text-purple-300" />
              </div>
              <input
                type="text"
                value={serviceSearchQuery}
                onChange={(e) => setServiceSearchQuery(e.target.value)}
                placeholder="Search treatments or symptoms..."
                className="w-full pl-14 pr-10 py-3.5 rounded-full bg-white/[0.03] border border-white/10 focus:border-purple-500/50 focus:outline-none focus:bg-white/[0.05] text-white text-sm placeholder:text-white/40 backdrop-blur-md transition-all duration-300"
              />
              {serviceSearchQuery && (
                <button
                  onClick={() => setServiceSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills — single horizontally scrollable line, never wraps */}
            <div className="flex items-center gap-2 max-w-4xl mx-auto overflow-x-auto py-1 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {serviceCategories.map((cat) => {
                const isSelected = selectedServiceCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedServiceCategory(cat)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-purple-500/20 border border-purple-400/50 text-purple-200"
                        : "bg-white/[0.03] border border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    {cat}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Empty Search / Filter State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16 px-4 rounded-3xl bg-white/[0.02] border border-white/5 max-w-md mx-auto space-y-4">
              <HelpCircle className="w-10 h-10 text-purple-400/60 mx-auto" />
              <div>
                <h3 className="text-lg font-bold text-white">
                  No treatments found
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Try resetting your search query or selecting a different
                  category filter.
                </p>
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

          {/* Services Grid with Microdata SEO — always shows every matching treatment */}
          {filteredServices.length > 0 && (
            <motion.div
              layout
              variants={serviceContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
            >
              <AnimatePresence initial={false}>
                {filteredServices.map((service) => (
                  <motion.article
                    key={service.id}
                    layout
                    variants={serviceCardVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                      transition: { duration: 0.3 },
                    }}
                    onClick={() => setActiveServiceDetail(service)}
                    itemScope
                    itemType="https://schema.org/MedicalProcedure"
                    className="group relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer bg-[#0d0817]"
                  >
                    {/* Image — zooms on hover, identical mechanics to the Gallery grid */}
                    <Image
                      itemProp="image"
                      src={`/${service.image}`}
                      alt={`${service.title} treatment at Dr. Varshney's Dental Aesthetics in Nani Daman`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#090514]/40 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-all duration-300" />

                    {/* Base gradient — always present so the title stays legible */}
                    <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#030109]/95 via-[#030109]/30 to-transparent pointer-events-none" />
                    {/* Deeper gradient — fades in on hover to hold the description */}
                    <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#030109] via-[#030109]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Content anchored to the bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col">
                      <div className="flex items-end justify-between gap-3">
                        <h3
                          itemProp="name"
                          className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug font-sans transition-colors duration-300 group-hover:text-purple-300"
                        >
                          {service.title}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveServiceDetail(service);
                          }}
                          aria-label={`View detailed information for ${service.title}`}
                          className="w-9 h-9 shrink-0 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white backdrop-blur-sm cursor-pointer transition-colors duration-300 group-hover:bg-purple-500 group-hover:border-purple-300/60"
                        >
                          <ArrowRight className="w-4 h-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                        </button>
                      </div>

                      {/* Description — fades in on hover, same timing as the Gallery overlay */}
                      {/* <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out"> */}
                      <div className="grid grid-rows-[1fr]">
                        <p
                          itemProp="description"
                          className="text-white/70 text-xs leading-relaxed overflow-hidden pt-2.5"
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ------------------ MEET YOUR DOCTOR SECTION ------------------ */}
      <DoctorProfile />

      {/* ------------------ PILLARS OF PRACTICE SECTION ------------------ */}
      <PillarsOfPractice />

      {/* ------------------ GALLERY SECTION ------------------ */}
      <Gallery />

      {/* ------------------ PATIENT REVIEWS SECTION ------------------ */}
      <Reviews />

      {/* ------------------ CONTACT US SECTION ------------------ */}
      <ContactUs />

      <Footer />

      {/* ------------------ SERVICE DETAIL DRAWER ------------------ */}
      <AnimatePresence>
        {activeServiceDetail && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveServiceDetail(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />

            <motion.div
              initial={{ x: "120%" }}
              animate={{ x: 0 }}
              exit={{ x: "120%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-4 bottom-4 right-4 sm:top-6 sm:bottom-6 sm:right-6 w-[calc(100%-2rem)] sm:w-[440px] z-50"
            >
              {/* Glass panel — floating card, not edge-flush, so the translucency actually reads */}
              <div className="relative h-full rounded-[2rem] bg-white/[0.06] backdrop-blur-2xl border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.65)] overflow-y-auto overflow-x-hidden overscroll-y-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-15">
                {/* Top highlight for glass edge definition */}
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
                {/* Ambient corner glow — clipped by overflow-x-hidden above, never triggers scroll */}
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-500/25 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-16 w-56 h-56 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative p-6 sm:p-7 space-y-7">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <div className="h-px w-10 bg-purple-500/60" />
                    <button
                      onClick={() => setActiveServiceDetail(null)}
                      aria-label="Close treatment details"
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-purple-500/20 hover:border-purple-400/40 transition-colors duration-300 flex items-center justify-center cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Service Image */}
                  <div className="relative w-full aspect-[16/10] rounded-[1.5rem] overflow-hidden">
                    <Image
                      src={`/${activeServiceDetail.image}`}
                      alt={activeServiceDetail.title}
                      fill
                      sizes="440px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.5rem] pointer-events-none" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-purple-200 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 max-w-[calc(100%-1.5rem)] truncate">
                      {activeServiceDetail.category}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div className="space-y-2.5">
                    <h3 className="text-2xl font-sans font-extrabold text-white leading-tight break-words">
                      {activeServiceDetail.title}
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed font-light">
                      {activeServiceDetail.fullDetails}
                    </p>
                  </div>

                  {/* Cost & duration — thin divider row, matches Contact/Doctor pattern */}
                  <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-4 min-w-0">
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold text-purple-300/80 uppercase tracking-[0.14em] block mb-1">
                        Cost Category
                      </span>
                      <span className="text-sm font-medium text-white break-words">
                        {activeServiceDetail.priceRange}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold text-purple-300/80 uppercase tracking-[0.14em] block mb-1">
                        Typical Duration
                      </span>
                      <span className="text-sm font-medium text-white break-words">
                        {activeServiceDetail.duration}
                      </span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-semibold text-purple-300/80 uppercase tracking-[0.14em] block">
                      Treatment Benefits
                    </span>
                    <ul className="space-y-2.5">
                      {activeServiceDetail.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-white/70"
                        >
                          <span className="w-4 h-4 rounded-full bg-purple-500/15 border border-purple-400/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-purple-300 stroke-[3]" />
                          </span>
                          <span className="break-words">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* FAQ snippets */}
                  <div className="space-y-4 pt-1 border-t border-white/10">
                    <span className="text-[10px] font-semibold text-purple-300/80 uppercase tracking-[0.14em] flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Frequently Asked
                    </span>
                    <div className="divide-y divide-white/10">
                      {activeServiceDetail.faqs.map((faq, i) => (
                        <div
                          key={i}
                          className="py-3 space-y-1.5 text-sm first:pt-0"
                        >
                          <p className="font-medium text-white break-words">
                            {faq.q}
                          </p>
                          <p className="text-white/55 leading-relaxed font-light break-words">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Book CTA — sticks to the bottom of the visible card as the content scrolls beneath it */}
              <motion.a
                href="https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 24px rgba(168,85,247,0.35)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 py-3.5 rounded-full bg-purple-500/25 border border-purple-400/40 text-purple-100 font-semibold text-sm cursor-pointer backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              >
                <CalendarDays className="w-4 h-4" />
                Book This Treatment
              </motion.a>
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-full sm:max-w-xl bg-[#0d0817] border border-[#35063e]/30 p-6 sm:p-8 rounded-3xl shadow-2xl z-50 overflow-y-auto max-h-[90vh] text-left text-[#FFFFFF]"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">
                    Book Your Visit
                  </h3>
                  <p className="text-xs text-[#D8B4FE] mt-0.5">
                    Please provide appointment details below
                  </p>
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
                  <div className="w-16 h-16 rounded-full bg-[#030109] border border-[#35063e] text-[#D8B4FE] flex items-center justify-center mx-auto animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-extrabold text-white">
                      Booking Confirmed!
                    </h4>
                    <p className="text-sm text-text-muted/60 max-w-xs mx-auto">
                      Your appointment has been registered successfully. You can
                      manage or cancel it anytime in the portal below.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/45 border border-[#35063e]/25 text-left text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span className="text-[#D8B4FE]">Patient:</span>{" "}
                      <span className="text-white font-bold">
                        {lastBookedAppointment.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#D8B4FE]">Service:</span>{" "}
                      <span className="text-white font-bold">
                        {lastBookedAppointment.service}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#D8B4FE]">Doctor:</span>{" "}
                      <span className="text-white font-bold">
                        {lastBookedAppointment.doctor}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#D8B4FE]">Date & Time:</span>{" "}
                      <span className="text-white font-bold">
                        {lastBookedAppointment.date} at{" "}
                        {lastBookedAppointment.timeSlot}
                      </span>
                    </div>
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
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]" />
                        <input
                          type="text"
                          required
                          value={bookingForm.name}
                          onFocus={() => setFocusedInput("popup_name")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) =>
                            setBookingForm({
                              ...bookingForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g. John Doe"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${
                            focusedInput === "popup_name"
                              ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]"
                              : "border-[#35063e]/25"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]" />
                        <input
                          type="email"
                          value={bookingForm.email}
                          onFocus={() => setFocusedInput("popup_email")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) =>
                            setBookingForm({
                              ...bookingForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="care@domain.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${
                            focusedInput === "popup_email"
                              ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]"
                              : "border-[#35063e]/25"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]" />
                        <input
                          type="tel"
                          required
                          value={bookingForm.phone}
                          onFocus={() => setFocusedInput("popup_phone")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) =>
                            setBookingForm({
                              ...bookingForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="79774 54648"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${
                            focusedInput === "popup_phone"
                              ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]"
                              : "border-[#35063e]/25"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">
                        Select Treatment *
                      </label>
                      <select
                        value={bookingForm.service}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            service: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0d0817] border border-[#35063e]/25 focus:border-[#35063e] focus:outline-none text-white text-sm cursor-pointer"
                      >
                        {services.map((s) => (
                          <option
                            key={s.id}
                            value={s.title}
                            className="bg-[#0d0817]"
                          >
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]" />
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onFocus={() => setFocusedInput("popup_date")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) =>
                            setBookingForm({
                              ...bookingForm,
                              date: e.target.value,
                            })
                          }
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border focus:outline-none text-white text-sm cursor-pointer transition-all ${
                            focusedInput === "popup_date"
                              ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]"
                              : "border-[#35063e]/25"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Time slot */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8B4FE] font-bold uppercase block">
                        Select Time Slot *
                      </label>
                      <select
                        required
                        value={bookingForm.timeSlot}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            timeSlot: e.target.value,
                          })
                        }
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
                    <label className="text-xs text-[#D8B4FE] font-bold uppercase block">
                      Preferred Doctor / Specialist
                    </label>
                    <select
                      value={bookingForm.doctor}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          doctor: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-[#35063e]/25 focus:border-[#35063e] focus:outline-none text-white text-sm cursor-pointer"
                    >
                      {doctors.map((doc, idx) => (
                        <option
                          key={idx}
                          value={doc.name}
                          className="bg-[#0d0817]"
                        >
                          {doc.name} - {doc.credentials}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#D8B4FE] font-bold uppercase block">
                      Symptoms or Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={bookingForm.notes}
                      onFocus={() => setFocusedInput("popup_notes")}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          notes: e.target.value,
                        })
                      }
                      placeholder="e.g. sensitivity to cold water on lower left molar"
                      className={`w-full px-4 py-2 rounded-xl bg-black/40 border focus:outline-none text-white text-sm transition-all ${
                        focusedInput === "popup_notes"
                          ? "border-[#35063e] shadow-[0_0_12px_rgba(139,61,255,0.25)]"
                          : "border-[#35063e]/25"
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
