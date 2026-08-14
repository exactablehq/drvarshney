import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { contactInfo } from "../data/contact";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#030109] cursor-default">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 px-6 pt-20 pb-10 text-center">
        <Link
          href="/#hero"
          className="cursor-pointer! inline-block"
          aria-label="Home"
        >
          <Image
            src="/branding/wordmark.svg"
            alt="Dr. Varshney's Dental Aesthetics"
            width={44}
            height={44}
            className="w-auto h-11 object-cover"
          />
        </Link>

        <div className="h-px w-16 bg-purple-500/40" />

        <div className="grid w-full gap-8 sm:grid-cols-2 sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            {/* Phone link */}
            <a
              href="tel:+917977454648"
              className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-purple-300 cursor-pointer"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-purple-400">
                <Phone className="w-3.5 h-3.5" />
              </span>
              {
                contactInfo.details.find((d) => d.title === "Phone Number")
                  ?.value
              }
            </a>

            {/* Address link opens Google Maps */}
            <a
              href="https://maps.app.goo.gl/Zr5mhcbeftFzhSgu7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-purple-300 cursor-pointer text-left group"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-purple-400 mt-0.5 group-hover:text-purple-300">
                <MapPin className="w-3.5 h-3.5" />
              </span>
              <p className="text-sm text-white/60 group-hover:text-purple-300 transition-colors text-left cursor-pointer">
                Dr. Varshney&apos;s Dental Aesthetics
                <br />
                Airport Road, Nani Daman
              </p>
            </a>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <Link
              href="/terms-of-service"
              className="text-sm text-white/60 transition-colors hover:text-purple-300 cursor-pointer"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-white/60 transition-colors hover:text-purple-300 cursor-pointer"
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
            className="group flex flex-col items-center gap-1.5 opacity-90 transition-all duration-300 hover:brightness-125 hover:opacity-100 cursor-pointer"
          >
            <span className="text-[9px] font-bold tracking-[0.25em] text-zinc-500 uppercase cursor-pointer">
              Crafted By
            </span>
            <div className="flex items-center">
              <Image
                src="/branding/exactable.svg"
                alt="Exactable"
                width={120}
                height={22}
                className="h-5 w-auto object-contain cursor-pointer"
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
