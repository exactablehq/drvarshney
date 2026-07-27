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
  details: [
    {
      icon: MapPin,
      title: "Clinic Address",
      value: "Shop No. 105, Dutt Sagar Appt. Above IDBI Bank, Airport Road, Nani Daman"
    },
    {
      icon: Phone,
      title: "Phone Number",
      value: "+91 79774 54648",
      link: "tel:+917977454648"
    },
    {
      icon: Mail,
      title: "Email Address",
      value: "dr.varshneydental@gmail.com",
      link: "mailto:dr.varshneydental@gmail.com"
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon - Sat: 10:00 AM - 1:00 PM & 4:00 PM - 8:00 PM\nSunday: Closed"
    }
  ],
  whatsappLink: "https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment.",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.191244837582!2d72.8379419!3d20.4162086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0cf31b2ad1845%3A0x6b7fa1f67f8b9e6f!2sAirport%20Rd%2C%20Nani%20Daman%2C%20Daman%20and%20Diu%20396210!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
};

export default function ContactUs() {
  // Stagger animation container
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section id="contact" className="relative pt-10 pb-10 lg:pt-14 lg:pb-14 overflow-hidden bg-[#090611] border-t border-[#35063e]/20 flex flex-col justify-center">
      
      {/* Oversized Background Typography - "CONTACT" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
        <span className="text-[12vw] font-black text-purple-950/[0.02] tracking-[0.25em] uppercase leading-none select-none">
          CONTACT
        </span>
      </div>

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-[5%] w-[300px] h-[300px] bg-purple-600/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-[5%] w-[300px] h-[300px] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a0516]/65 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1),_inset_0_1px_0_rgba(255,255,255,0.1)] text-xs font-semibold text-purple-300 tracking-wider uppercase backdrop-blur-[10px]">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Contact Us</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight leading-[1.15]">
              <span className="text-white mr-3">Empower</span>
              <span className="beautiful-smiles-glow">Your Smile.</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              {contactInfo.description}
            </p>

            {/* Glass Info Cards Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4"
            >
              {contactInfo.details.map((item, idx) => {
                const IconComponent = item.icon;
                const isLink = !!item.link;
                const CardWrapper = isLink ? "a" : "div";

                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    whileHover={{
                      y: -4,
                      borderColor: "rgba(168, 85, 247, 0.4)",
                      boxShadow: "0 8px 24px rgba(168, 85, 247, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    }}
                    className="p-5 rounded-[24px] bg-[#0e071b]/60 border border-[#35063e]/20 backdrop-blur-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 flex items-start gap-4 text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.05)]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                        {item.title}
                      </h4>
                      {isLink ? (
                        <a
                          href={item.link}
                          className="text-white hover:text-purple-300 transition-colors text-sm font-semibold break-all leading-snug"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white/80 text-sm font-light leading-snug whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Google Map Placeholder & WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 w-full space-y-6 lg:pt-[100px] lg:pl-10"
          >
            {/* Map Frame */}
            <div className="w-full max-w-xl lg:max-w-[480px] aspect-[16/9] rounded-[28px] overflow-hidden border border-[#35063e]/30 bg-[#0a0516]/70 backdrop-blur-[20px] shadow-2xl relative">
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2) brightness(0.8)" }}
                allowFullScreen={false}
                loading="lazy"
                title="Dr. Varshney's Dental Clinic Location Map"
                className="w-full h-full rounded-[28px]"
              />
            </div>

            {/* WhatsApp CTA Button */}
            <div className="w-full max-w-xl lg:max-w-[480px]">
              <motion.a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.01, boxShadow: "0px 10px 25px -5px rgba(168, 85, 247, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full bg-[#35063e] hover:bg-[#4a0956] text-white font-semibold text-base shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300 ease-out flex items-center justify-center gap-2.5 cursor-pointer border border-purple-500/50 hover:border-purple-400 w-full"
              >
                <MessageCircle className="w-5.5 h-5.5 text-white" />
                <span>Book Appointment on WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
