import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Dr. Varshney&apos;s Dental Aesthetics",
  description:
    "Terms of Service for Dr. Varshney&apos;s Dental Aesthetics in Nani Daman. Terms governing clinical appointments, treatment consultations, and website usage.",
  alternates: {
    canonical: "https://drvarshney.in/terms-of-service",
  },
};

export default function TermsOfServicePage() {
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
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Clinical Terms & Conditions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-white/50">Last updated: August 2026</p>
        </div>

        {/* Content Card */}
        <div className="rounded-3xl bg-[#130b21]/60 backdrop-blur-xl border border-white/10 p-6 sm:p-10 space-y-8 text-sm text-white/80 leading-relaxed shadow-2xl">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">1. Agreement to Terms</h2>
            <p>
              Welcome to <strong>Dr. Varshney&apos;s Dental Aesthetics</strong>. By accessing our website (<Link href="/" className="text-purple-300 underline underline-offset-4">drvarshney.in</Link>), booking an appointment online, or undergoing dental consultations at our clinic in Nani Daman, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">2. Scope of Dental Practice</h2>
            <p>
              All clinical consultations, diagnosis, preventive procedures, aesthetic dentistry, implants, and surgical treatments are conducted by or under the direct supervision of <strong>Dr. Ayush Varshney (B.D.S., Reg. No. A-22861)</strong> and qualified dental specialists.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">3. Appointment Bookings & Cancellations</h2>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Online appointment submissions are requests subject to clinic schedule confirmation.</li>
              <li>Patients are encouraged to arrive 10 minutes before their scheduled time slot.</li>
              <li>If you need to cancel or reschedule your visit, please contact the clinic at least 4 hours in advance.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">4. Medical Disclaimer</h2>
            <p>
              The text, treatment guides, service overviews, and FAQ content provided on this website are for general informational and educational purposes only. They do not constitute formal medical diagnosis or advice. A full in-person clinical examination and diagnostic x-rays are required prior to any treatment plan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">5. Payment & Billing Terms</h2>
            <p>
              Payment for clinical procedures is due at the time of treatment unless a structured multi-phase treatment plan is established. We accept Cash, UPI, Credit Cards, and Debit Cards. Price ranges indicated on the website are estimates subject to clinical evaluation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">6. Limitation of Liability</h2>
            <p>
              Dr. Varshney&apos;s Dental Aesthetics shall not be liable for any indirect or consequential damages arising from website technical downtime. Clinical treatment outcomes vary based on individual oral health conditions and patient compliance with post-treatment care instructions.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-xl font-bold text-white tracking-tight text-purple-300">7. Contact & Jurisdiction</h2>
            <p>These terms are governed by the laws of India. For any operational or legal inquiries:</p>
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
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
