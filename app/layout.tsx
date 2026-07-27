import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Dr. Varshney's Dental Aesthetics | Best Dentist in Nani Daman",
  description:
    "Modern dental care by Dr. Ayush Varshney in Nani Daman. Offering root canal treatment, dental implants, crowns, bridges, dentures, braces, aligners, scaling, and children dental care.",
  keywords: [
    "Dentist in Nani Daman",
    "Best Dental Clinic in Daman",
    "Dr. Ayush Varshney",
    "Root Canal Treatment Nani Daman",
    "Dental Implants Daman",
    "Teeth Scaling & Cleaning Daman",
    "Braces and Aligners Daman",
    "Children Dentistry Daman",
    "Dental Surgeon Nani Daman",
    "Varshney Dental Clinic"
  ],
  openGraph: {
    title: "Dr. Varshney's Dental Aesthetics | Best Dentist in Nani Daman",
    description:
      "Modern dental care by Dr. Ayush Varshney in Nani Daman. Offering root canal treatment, dental implants, crowns, bridges, dentures, braces, aligners, scaling, and children dental care.",
    url: "https://drvarshneysdental.com",
    siteName: "Dr. Varshney's Dental Aesthetics",
    images: [
      {
        url: "https://drvarshneysdental.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Dr. Varshney's Dental Aesthetics Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Dr. Varshney's Dental Aesthetics",
  "image": "https://drvarshneysdental.com/logo.png",
  "@id": "https://drvarshneysdental.com/#dentist",
  "url": "https://drvarshneysdental.com",
  "telephone": "+917977454648",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shop No. 105, Dutt Sagar Appt. Above IDBI Bank, Airport Road",
    "addressLocality": "Nani Daman",
    "addressRegion": "Daman and Diu",
    "postalCode": "396210",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "20.4162086",
    "longitude": "72.8379419"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "13:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "16:00",
      "closes": "20:00"
    }
  ],
  "sameAs": [
    "https://wa.me/919797454648"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
