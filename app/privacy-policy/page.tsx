import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Varshney&apos;s Dental Aesthetics",
  description:
    "Privacy Policy for Dr. Varshney&apos;s Dental Aesthetics in Nani Daman. Understand how we collect, protect, and handle your patient information.",
  alternates: {
    canonical: "https://drvarshney.in/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#030109] text-white selection:bg-purple-500/30 selection:text-purple-200 flex flex-col justify-between">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#030109]/80 backdrop-blur-xl border-b border-purple-500/10 px-4 sm:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-[#030109] border border-purple-500/30">
              <Image src="/logo.png" alt="Dr. Varshney's Logo" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-extrabold text-sm block leading-none text-white group-hover:text-purple-300 transition-colors">DR. VARSHNEY&apos;S</span>
              <span className="text-[8px] uppercase font-bold text-[#D8B4FE] tracking-[0.15em] block mt-0.5">Dental Aesthetics</span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/20 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full">
        
        {/* Title Badge */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Patient Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-white/50">Last updated: August 2026</p>
        </div>

        {/* Content Card */}
        <div className="rounded-3xl bg-[#130b21]/60 backdrop-blur-xl border border-white/10 p-6 sm:p-10 space-y-8 text-sm text-white/80 leading-relaxed shadow-2xl">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">1. Introduction</h2>
            <p>
              At <strong>Dr. Varshney&apos;s Dental Aesthetics</strong>, led by Dr. Ayush Varshney (B.D.S., Reg. No. A-22861), we respect your privacy and are committed to protecting the personal and clinical information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website (<Link href="/" className="text-purple-300 underline underline-offset-4">drvarshney.in</Link>) or use our online appointment booking services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">2. Information We Collect</h2>
            <p>We collect information necessary to provide comprehensive dental care and manage clinic appointments:</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li><strong className="text-white">Personal Contact Information:</strong> Full name, phone number, email address, and preferred appointment dates/time slots.</li>
              <li><strong className="text-white">Clinical & Dental Notes:</strong> Specific dental concerns, symptoms, or notes submitted voluntarily through our booking form.</li>
              <li><strong className="text-white">Technical Usage Data:</strong> Anonymized site statistics (e.g. device type, pages visited) strictly used to optimize user experience.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">3. How We Use Your Information</h2>
            <p>Your information is used solely for clinical and operational purposes, including:</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Scheduling, confirming, or managing your clinical appointments.</li>
              <li>Communicating clinical updates, post-treatment instructions, or appointment reminders.</li>
              <li>Improving our dental website navigation and overall patient care service.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">4. Confidentiality & Patient Data Security</h2>
            <p>
              We treat all patient records with strict medical confidentiality. We do not sell, rent, trade, or share your personal details with third-party advertisers. Data access is restricted strictly to authorized clinic staff for healthcare management.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">5. Cookies & Local Storage</h2>
            <p>
              Our website uses browser local storage strictly to remember your appointment bookings locally on your device for easy retrieval. We do not use intrusive tracking cookies or cross-site tracking scripts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Request access to the personal contact details we hold for your appointments.</li>
              <li>Request correction or updating of your contact information.</li>
              <li>Request deletion of your online booking record from our portal.</li>
            </ul>
          </section>

          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">7. Contact Us</h2>
            <p>For any privacy inquiries or record requests, please contact our clinic staff:</p>
            <div className="space-y-2.5 text-xs text-white/90 bg-black/30 p-5 rounded-2xl border border-purple-500/20">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Shop No. 105, Dutt Sagar Appt., Above IDBI Bank, Airport Road, Nani Daman - 396210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="tel:7977454648" className="hover:text-purple-300 font-bold transition-colors">+91 79774 54648</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="mailto:dr.varshneydental@gmail.com" className="hover:text-purple-300 transition-colors">dr.varshneydental@gmail.com</a>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-purple-500/10 py-6 text-center text-xs text-white/50">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© {new Date().getFullYear()} Dr. Varshney&apos;s Dental Aesthetics. All rights reserved. Reg. No. A-22861.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>|</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
