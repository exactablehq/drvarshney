"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { contactInfo } from "../data/contact";

export default function ContactUs() {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="contact"
      className="relative pt-10 pb-10 lg:pt-14 lg:pb-14 overflow-hidden bg-[#030109] flex flex-col justify-center cursor-default"
    >
      {/* Oversized Background Typography - "CONTACT" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
        <span className="text-[12vw] font-black text-purple-950/[0.02] tracking-[0.25em] uppercase leading-none select-none">
          CONTACT
        </span>
      </div>

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-[5%] w-[18.75rem] h-[18.75rem] bg-purple-600/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-[5%] w-[18.75rem] h-[18.75rem] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-stretch">
          {/* Left Column: Heading & Contact Info Cards (Order 2 on mobile, Order 1 on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            {/* Thin accent rule */}
            <div className="h-px w-10 bg-purple-500/60" />

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight leading-[1.15]">
              <span className="text-white mr-3">Empower</span>
              <span className="beautiful-smiles-glow">Your Smile.</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              {contactInfo.description}
            </p>

            {/* Editorial contact list — thin dividers, no boxes */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full pt-4 border-t border-white/10 divide-y divide-white/10"
            >
              {contactInfo.details.map((item, idx) => {
                const IconComponent = item.icon;
                const isLink = !!item.link;

                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="py-5 flex items-start gap-4 text-left"
                  >
                    <IconComponent className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-semibold text-purple-300/80 uppercase tracking-[0.14em]">
                        {item.title}
                      </h4>
                      {isLink ? (
                        <a
                          href={item.link}
                          target={
                            item.link.startsWith("https") ? "_blank" : undefined
                          }
                          rel={
                            item.link.startsWith("https")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="cursor-pointer text-white hover:text-purple-300 transition-colors text-sm sm:text-base font-medium break-word leading-snug inline-block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white/75 text-sm sm:text-base font-light leading-snug whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Google Map & WhatsApp CTA (Order 1 on mobile, Order 2 on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 w-full flex flex-col gap-5 lg:pt-4 lg:h-full order-1 lg:order-2"
          >
            {/* Map Frame — borderless, single hairline, ambient glow. Matches the left column's height on desktop. */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[22.5rem] rounded-[1.75rem] overflow-hidden">
              <div className="absolute inset-[-1.25rem] bg-purple-500/[0.06] rounded-[2.5rem] blur-[40px] pointer-events-none -z-10" />
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "contrast(1.2) brightness(0.9)",
                }}
                allowFullScreen={false}
                loading="lazy"
                title="Dr. Varshney's Dental Aesthetics Location Map"
                className="w-full h-full"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.75rem] pointer-events-none" />
            </div>

            {/* WhatsApp CTA Button */}
            <motion.a
              href={contactInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -2,
                scale: 1.01,
                boxShadow: "0px 10px 25px -5px rgba(168, 85, 247, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-[#35063e] hover:bg-[#4a0956] text-white font-semibold text-base shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300 ease-out flex items-center justify-center gap-2.5 cursor-pointer border border-purple-500/50 hover:border-purple-400 w-full"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Book Now</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
