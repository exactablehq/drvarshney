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
  metadataBase: new URL("https://drvarshney.in"),

  title: {
    default:
      "Dr. Varshney's Dental Aesthetics | Trusted Dental Care in Daman",
    template: "%s | Dr. Varshney's Dental Aesthetics",
  },

  description:
    "Your smile deserves the best. Experience advanced, patient-focused dentistry—from routine dental care to smile makeovers, dental implants, and full mouth rehabilitation—at Dr. Varshney's Dental Aesthetics in Nani Daman.",

  keywords: [
    "Dentist in Nani Daman",
    "Best Dental Clinic in Daman",
    "Dr Ayush Varshney",
    "Dental Implants Daman",
    "Root Canal Treatment Daman",
    "Smile Makeover",
    "Cosmetic Dentistry",
    "Teeth Whitening",
    "Dental Veneers",
    "Wisdom Tooth Removal",
    "Braces",
    "Aligners",
    "Children Dentist",
    "Family Dental Care",
    "Full Mouth Rehabilitation",
    "Dental Aesthetics",
  ],

  alternates: {
    canonical: "https://drvarshney.in",
  },

  openGraph: {
    title:
      "Dr. Varshney's Dental Aesthetics | Trusted Dental Care in Nani Daman",

    description:
      "Your smile deserves the best. Experience advanced, patient-focused dentistry—from routine dental care to smile makeovers and dental implants—designed to keep every smile healthy, confident, and beautiful.",

    url: "https://drvarshney.in",

    siteName: "Dr. Varshney's Dental Aesthetics",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dr. Varshney's Dental Aesthetics",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Dr. Varshney's Dental Aesthetics | Trusted Dental Care in Nani Daman",

    description:
      "Your smile deserves the best. Experience advanced, patient-focused dentistry—from routine dental care to smile makeovers and dental implants—designed to keep every smile healthy, confident, and beautiful.",

    images: ["/og-image.png"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": "https://drvarshney.in/#dentist",

  name: "Dr. Varshney's Dental Aesthetics",

  description:
    "Dr. Varshney's Dental Aesthetics is a modern dental clinic in Nani Daman led by Dr. Ayush Varshney (B.D.S.), providing comprehensive dental care including dental implants, root canal treatment, cosmetic dentistry, smile makeovers, and family dental care.",

  inLanguage: "en-IN",

  url: "https://drvarshney.in",

  image: "https://drvarshney.in/og-image.png",

  logo: "https://drvarshney.in/logo.png",

  telephone: "+91 79774 54648",

  email: "dr.varshneydental@gmail.com",

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 79774 54648",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: [
      "English",
      "Hindi",
      "Gujarati"
    ]
  },

  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: [
    "Cash",
    "UPI",
    "Credit Card",
    "Debit Card"
  ],

  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Shop No. 105, Dutt Sagar Appt., Above IDBI Bank, Airport Road",
    addressLocality: "Nani Daman",
    addressRegion: "Daman",
    postalCode: "396210",
    addressCountry: "IN",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: "20.4162086",
    longitude: "72.8379419",
  },

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "16:00",
      closes: "20:00",
    },
  ],

  areaServed: [
    {
      "@type": "City",
      name: "Nani Daman",
    },
    {
      "@type": "City",
      name: "Daman",
    },
  ],

  medicalSpecialty: "Dentistry",

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dental Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dental Implants",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Root Canal Treatment",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Teeth Whitening",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dental Veneers",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wisdom Tooth Removal",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Smile Makeover",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Smile Design",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full Mouth Rehabilitation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Complete Dentures",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Implant Supported Dentures",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bone Grafting",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gingivectomy",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gingivoplasty",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gum Contouring",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Post and Core Treatment",
        },
      },
    ],
  },

  founder: {
    "@type": "Person",
    name: "Dr. Ayush Varshney",
    jobTitle: "Dental Surgeon",
    alumniOf: "Gujarat University",
  },

  sameAs: [
    "https://wa.me/917977454648",
  ],
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
