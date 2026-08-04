"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Award,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export interface ReviewItem {
  id: string;
  patientName: string;
  role: string;
  location: string;
  avatar: string;
  initials: string;
  rating: number;
  date: string;
  treatment: string;
  highlight: string;
  reviewText: string;
  verified: boolean;
  verifiedSource: string;
}

export const reviewsData: ReviewItem[] = [
  {
    id: "rev-1",
    patientName: "Dr. Ananya Sharma",
    role: "Senior Consultant",
    location: "New Delhi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    initials: "AS",
    rating: 5,
    date: "2 weeks ago",
    treatment: "Veneers & Smile Design",
    highlight: "Unmatched artistic precision!",
    reviewText: "Dr. Ayush Varshney completely transformed my smile! The 3D digital smile simulation before the procedure gave me total confidence. His precision, gentle approach, and clinical perfection are unmatched in the region.",
    verified: true,
    verifiedSource: "Google Review"
  },
  {
    id: "rev-2",
    patientName: "Vikram Malhotra",
    role: "Architect",
    location: "Gurugram",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    initials: "VM",
    rating: 5,
    date: "1 month ago",
    treatment: "Dental Implant",
    reviewText: "I was extremely anxious about getting a dental implant, but Dr. Varshney made the procedure 100% painless. State-of-the-art diagnostic equipment, immaculate sterile environment, and a deeply caring team.",
    highlight: "100% Painless Experience",
    verified: true,
    verifiedSource: "Google Review"
  },
  {
    id: "rev-3",
    patientName: "Priya Sengupta",
    role: "Software Executive",
    location: "Noida",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    initials: "PS",
    rating: 5,
    date: "3 weeks ago",
    treatment: "Invisalign Aligners",
    highlight: "Seamless & Invisible Treatment",
    reviewText: "Fantastic experience! The aligners are completely invisible and fit comfortably. Dr. Varshney monitors progress meticulously at every single stage. Highly recommended for anyone wanting a flawless smile.",
    verified: true,
    verifiedSource: "Verified Patient"
  },
  {
    id: "rev-4",
    patientName: "Rohan Kapoor",
    role: "Business Owner",
    location: "Faridabad",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    initials: "RK",
    rating: 5,
    date: "2 months ago",
    treatment: "Painless Root Canal",
    highlight: "Single-sitting pain relief",
    reviewText: "I went in with acute tooth pain. Dr. Varshney completed the root canal in a single sitting with zero pain during or after the procedure. Truly the most skilled dental surgeon I have visited.",
    verified: true,
    verifiedSource: "Google Review"
  },
  {
    id: "rev-5",
    patientName: "Meera Agarwal",
    role: "Interior Designer",
    location: "New Delhi",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    initials: "MA",
    rating: 5,
    date: "1 month ago",
    treatment: "Laser Whitening",
    highlight: "Stunning instant results",
    reviewText: "Incredible results after just one laser whitening session! My teeth are noticeably brighter without any post-treatment sensitivity. The clinic environment feels like a high-end luxury spa.",
    verified: true,
    verifiedSource: "Google Review"
  },
  {
    id: "rev-6",
    patientName: "Sanjay Singhania",
    role: "Managing Director",
    location: "Ghaziabad",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
    initials: "SS",
    rating: 5,
    date: "3 months ago",
    treatment: "Full Rehabilitation",
    highlight: "Complete Confidence Restored",
    reviewText: "Exceptional clinical expertise and thorough explanation of every procedure step. Dr. Varshney restored both functionality and aesthetics seamlessly. Thank you for giving me my confidence back!",
    verified: true,
    verifiedSource: "Verified Patient"
  }
];

export default function Reviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section id="reviews" className="relative pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-[#090611] border-t border-purple-500/15 flex flex-col justify-center">
      
      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
        <span className="text-[13vw] font-black text-purple-955/[0.025] tracking-[0.2em] uppercase leading-none select-none">
          REVIEWS
        </span>
      </div>

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-[10%] w-[400px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center mb-10"
        >
          {/* Glassmorphism pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0516]/80 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] text-xs font-semibold text-purple-300 tracking-wider uppercase backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Patient Testimonials</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Loved by Patients. <span className="beautiful-smiles-glow">Trusted for Life.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Real stories from patients who experienced our gentle care, advanced digital dentistry, and smile transformations.
          </p>
        </motion.div>

        {/* Premium Overall Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#120726]/80 via-[#0e071b]/90 to-[#120726]/80 border border-purple-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.5),_0_0_25px_rgba(168,85,247,0.1)] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Left Rating Info */}
          <div className="flex items-center gap-5 text-left">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <span className="text-2xl font-black text-white leading-none">4.9</span>
              <span className="text-[10px] text-purple-300 font-bold uppercase mt-1">/ 5.0</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-amber-300 ml-1">5.0 Star Rating</span>
              </div>
              <h3 className="text-base font-bold text-white">500+ Verified Patient Reviews</h3>
              <p className="text-xs text-white/50">Across Google, Practo & Direct Clinical Feedback</p>
            </div>
          </div>

          {/* Right Trust Badges */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap justify-center md:justify-end">
            <div className="px-3.5 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>100% Sterile & Safe</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Awarded Dental Surgeon</span>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Scrollable Review Cards Row */}
        <div
          ref={scrollContainerRef}
          className="w-full flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviewsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="w-[300px] sm:w-[380px] shrink-0 snap-start group relative rounded-3xl bg-gradient-to-b from-[#120726]/80 to-[#0a0516]/95 border border-purple-500/25 p-7 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between text-left transition-all duration-500 hover:border-purple-400/50 hover:shadow-[0_15px_40px_rgba(168,85,247,0.2)]"
            >
              {/* Background Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500" />

              <div>
                {/* Top Header: Star Rating & Verified Pill */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-semibold text-purple-300">
                    <CheckCircle2 className="w-3 h-3 text-purple-400" />
                    <span>{item.verifiedSource}</span>
                  </div>
                </div>

                {/* Highlight Heading */}
                <h4 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors mb-3 leading-snug">
                  "{item.highlight}"
                </h4>

                {/* Review Text */}
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light mb-6">
                  {item.reviewText}
                </p>
              </div>

              {/* Bottom Patient Profile Footer */}
              <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  {/* Patient Image */}
                  <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-purple-500 to-purple-300 shrink-0 shadow-md">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#090611]">
                      <img
                        src={item.avatar}
                        alt={item.patientName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Patient Details */}
                  <div>
                    <h5 className="text-sm font-bold text-white leading-tight">
                      {item.patientName}
                    </h5>
                    <p className="text-[11px] text-purple-300/80 font-medium">
                      {item.treatment}
                    </p>
                    <p className="text-[10px] text-white/40 mt-0.5">
                      {item.location} • {item.date}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Centered Navigation Control Buttons (Below Review Cards) */}
        <div className="flex items-center justify-center gap-3 mt-6 mb-4">
          <button
            onClick={scrollLeft}
            className="p-3 rounded-full bg-[#0e071b] border border-purple-500/30 text-white hover:bg-purple-600/40 hover:border-purple-400 transition-all cursor-pointer shadow-md flex items-center justify-center"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="p-3 rounded-full bg-[#0e071b] border border-purple-500/30 text-white hover:bg-purple-600/40 hover:border-purple-400 transition-all cursor-pointer shadow-md flex items-center justify-center"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 inline-flex flex-col sm:flex-row items-center gap-4 p-5 sm:p-6 rounded-2xl bg-[#0e071b]/80 border border-purple-500/25 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-white">Ready for your own smile transformation?</h4>
            <p className="text-xs text-white/60">Schedule a consultation with Dr. Ayush Varshney today.</p>
          </div>
          <a
            href="https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20a%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Book Consultation</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
