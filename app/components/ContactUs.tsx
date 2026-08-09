"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle
} from "lucide-react";

// Contact details object for easy future editing
const contactInfo = {
  description: "Get in touch with us to discuss your dental health and aesthetic goals. Our team is ready to provide personalized and gentle care.",
  address: "Shop No. 105, Dutt Sagar Appt. Above IDBI Bank, Airport Road, Nani Daman",
  phone: "+91 79774 54648",
  phoneHref: "tel:+917977454648",
  email: "dr.varshneydental@gmail.com",
  emailHref: "mailto:dr.varshneydental@gmail.com",
  hours: "Mon - Sat: 10:00 AM - 1:00 PM & 4:00 PM - 8:00 PM\nSunday: Closed",
  whatsappLink: "https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment.",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4042.213197255863!2d72.83951791988098!3d20.424834984864642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0da76e3691733%3A0xb51e800e4a3f12ff!2sIDBI%20Bank!5e0!3m2!1sen!2sin!4v1785847866351!5m2!1sen!2sin"
};

export default function ContactUs() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--background)] border-t border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[auto] lg:min-h-[640px]">

        {/* Map — top on mobile (shorter height), left column on desktop */}
        <div className="relative w-full h-[40vh] lg:h-auto order-1">
          <iframe
            src={contactInfo.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2) brightness(0.75) saturate(0.4)" }}
            allowFullScreen={false}
            loading="lazy"
            title="Dr. Varshney's Dental Aesthetics Location Map"
            className="w-full h-full absolute inset-0"
          />
          {/* Dark tint overlay so the map reads intentional, not default Google colors */}
          <div className="absolute inset-0 bg-[var(--background)]/30 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--background)] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[var(--background)]/40" />
        </div>

        {/* Contact info — large confident type, real tap targets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 flex flex-col justify-center px-5 sm:px-10 lg:px-16 py-14 sm:py-20"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/30 text-xs font-semibold text-[var(--primary-tint)] tracking-wider uppercase mb-6 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-white mb-5">
            Empower Your Smile.
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md mb-10 font-light">
            {contactInfo.description}
          </p>

          <div className="space-y-1 mb-8">
            {/* Address */}
            <div className="flex items-start gap-4 py-4 border-t border-white/[0.08]">
              <MapPin className="w-5 h-5 text-[var(--primary-tint)] shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm sm:text-base leading-relaxed">{contactInfo.address}</span>
            </div>

            {/* Phone — real tel: link, 44px+ target */}
            <a
              href={contactInfo.phoneHref}
              className="flex items-center gap-4 py-4 border-t border-white/[0.08] min-h-[44px] hover:text-[var(--primary-tint)] transition-colors group"
            >
              <Phone className="w-5 h-5 text-[var(--primary-tint)] shrink-0" />
              <span className="text-white text-base sm:text-lg font-semibold group-hover:text-[var(--primary-tint)] transition-colors">{contactInfo.phone}</span>
            </a>

            {/* Email — real mailto: link */}
            <a
              href={contactInfo.emailHref}
              className="flex items-center gap-4 py-4 border-t border-white/[0.08] min-h-[44px] hover:text-[var(--primary-tint)] transition-colors group"
            >
              <Mail className="w-5 h-5 text-[var(--primary-tint)] shrink-0" />
              <span className="text-white text-sm sm:text-base font-medium break-all group-hover:text-[var(--primary-tint)] transition-colors">{contactInfo.email}</span>
            </a>

            {/* Hours */}
            <div className="flex items-start gap-4 py-4 border-t border-b border-white/[0.08]">
              <Clock className="w-5 h-5 text-[var(--primary-tint)] shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">{contactInfo.hours}</span>
            </div>
          </div>

          {/* WhatsApp CTA — large tap-friendly button */}
          <motion.a
            href={contactInfo.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-fit px-8 py-4 min-h-[52px] rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold text-base transition-colors flex items-center justify-center gap-2.5"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Book Appointment on WhatsApp</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
