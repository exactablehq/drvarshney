import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";
import { generateJsonLd } from "./lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#030109",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://drvarshney.in"),

  title: {
    default: "Dr. Varshney's Dental Aesthetics | Best Dentist in Daman",
    template: "%s | Dr. Varshney's Dental Aesthetics",
  },

  description:
    "Experience advanced, patient-focused dentistry in Nani Daman. From dental implants to root canals and smile makeovers at Dr. Varshney's Dental Aesthetics.",

  applicationName: "Dr. Varshney's Dental Aesthetics",
  authors: [{ name: "Dr. Ayush Varshney", url: "https://drvarshney.in" }],
  creator: "Dr. Ayush Varshney",
  publisher: "Dr. Varshney's Dental Aesthetics",
  category: "Health & Medical",

  keywords: [
    "Dentist in Nani Daman",
    "Best Dental Clinic in Daman",
    "Dr Ayush Varshney",
    "Dental Clinic Daman",
    "Dental Implants Daman",
    "Root Canal Treatment Daman",
    "Smile Makeover Daman",
    "Cosmetic Dentistry",
    "Teeth Whitening Daman",
    "Dental Veneers Daman",
    "Wisdom Tooth Removal",
    "Braces and Aligners Daman",
    "Pediatric Dentist Daman",
    "Children Dentist",
    "Family Dental Care",
    "Full Mouth Rehabilitation",
    "Dental Aesthetics Daman",
    "Top Dentist in Vapi",
    "Dentist near Silvassa",
  ],

  alternates: {
    canonical: "https://drvarshney.in",
  },

  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  openGraph: {
    title: "Dr. Varshney's Dental Aesthetics | Best Dentist in Daman",
    description:
      "Advanced, patient-focused dental care in Nani Daman. Dental implants, painless root canals, smile makeovers, and family dentistry.",
    url: "https://drvarshney.in",
    siteName: "Dr. Varshney's Dental Aesthetics",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/branding/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Varshney's Dental Aesthetics Clinic - Daman",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dr. Varshney's Dental Aesthetics | Best Dentist in Daman",
    description:
      "Advanced, patient-focused dental care in Nani Daman. Implants, root canals, braces & smile makeovers at Dr. Varshney's Dental Aesthetics.",
    images: ["/branding/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },

  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateJsonLd();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
