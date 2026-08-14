import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { contactInfo } from "../data/contact";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#030109]">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 px-6 pt-20 pb-10 text-center">
        <Image
          src="/logo.png"
          alt="Dr. Varshney's Dental Aesthetics"
          width={44}
          height={44}
          className="w-11 h-11 rounded-full object-cover"
        />

        <div className="h-px w-16 bg-purple-500/40" />

        <div className="grid w-full gap-8 sm:grid-cols-2 sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <a
              href="tel:+917977454648"
              className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-purple-300"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-purple-400">
                <Phone className="w-3.5 h-3.5" />
              </span>
              {
                contactInfo.details.find((d) => d.title === "Phone Number")
                  ?.value
              }
            </a>
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-purple-400 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </span>
              <p className="text-sm text-white/60 text-left">
                Dr. Varshney&apos;s Dental Aesthetics
                <br />
                Airport Road, Nani Daman
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <Link
              href="/terms-of-service"
              className="text-sm text-white/60 transition-colors hover:text-purple-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-white/60 transition-colors hover:text-purple-300"
            >
              Privacy Policy
            </Link>
            <p className="mt-4 text-xs text-white/30">
              &copy; {new Date().getFullYear() + " "} Dr. Varshney&apos;s Dental
              Aesthetics. Reg. No. A-22861.
            </p>
          </div>
        </div>

        {/* Attribution Subfooter */}
        <div className="mt-16 flex flex-col items-center justify-center gap-1.5 border-t border-white/5 pt-8">
          <a
            href="https://exactable.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1.5 opacity-60 transition-opacity duration-300 hover:opacity-100"
          >
            <span className="text-[9px] font-bold tracking-[0.25em] text-zinc-500 uppercase">
              Crafted By
            </span>
            <div className="flex items-center">
              <Image
                src="/exactable.svg"
                alt="Exactable"
                width={120}
                height={22}
                className="h-5 w-auto object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
