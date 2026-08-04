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
      "Dr. Varshney's Dental Aesthetics | Best Dentist in Daman",
    template: "%s | Dr. Varshney's Dental Aesthetics",
  },

  description:
    "Experience advanced, patient-focused dentistry in Nani Daman. From dental implants to root canals and smile makeovers at Dr. Varshney's Dental Aesthetics.",

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
      "Dr. Varshney's Dental Aesthetics | Best Dentist in Daman",

    description:
      "Advanced dental care in Nani Daman. From implants to smile makeovers, experience expert, patient-focused dentistry for a healthy smile.",

    url: "https://drvarshney.in",

    siteName: "Dr. Varshney's Dental Aesthetics",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/og-image_opt.png",
        width: 1200,
        height: 630,
        alt: "Dr. Varshney's Dental Aesthetics",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Dr. Varshney's Dental Aesthetics | Best Dentist in Daman",

    description:
      "Advanced, patient-focused dental care in Nani Daman. Implants, root canals, braces & smile makeovers at Dr. Varshney's Dental Aesthetics.",

    images: ["/og-image_opt.png"],
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

  url: "https://drvarshney.in",

  image: "https://drvarshney.in/og-image_opt.png",

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
    name: "Comprehensive Dental Services Catalog",
    itemListElement: [
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Tooth Filling",
          description: "Restore decayed or chipped teeth with aesthetic composite resin fillings that blend seamlessly.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Tooth Extraction",
          description: "Safe and pain-free removal of severely damaged, infected, or crowded teeth, including wisdom teeth.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Root Canal Treatment",
          description: "Save deeply infected or damaged teeth by removing diseased pulp and sealing the canals.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Crowns & Bridges, Dentures",
          description: "Restore missing or damaged teeth with custom-fabricated crowns, bridges, or full and partial dentures.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Dental Implants",
          description: "Permanent, bio-compatible titanium implants capped with crowns to replace missing teeth from the root up.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Braces & Aligners",
          description: "Straighten misaligned teeth and correct bites with traditional braces or discreet clear aligners.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Scaling & Cleaning",
          description: "Remove plaque, tartar, and surface stains to restore clean, healthy gums and fresh breath.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Children Dental Care",
          description: "Friendly, gentle pediatric dental treatments including sealants, fluorides, and early cavity prevention.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Wisdom Tooth Removal",
          description: "Specialized extraction of impacted, painful, or misaligned wisdom teeth with surgical precision.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Teeth Whitening",
          description: "Professional in-office laser whitening to remove deep stains and dramatically brighten your smile.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Dental Veneers",
          description: "Ultra-thin custom porcelain or composite shells that transform shape, shade, and alignment.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Post and Core Treatment",
          description: "Rebuild heavily broken or root-canal-treated teeth to provide a sturdy foundation for a crown.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Gingivectomy",
          description: "Surgical removal of diseased or excess gum tissue to treat periodontal pockets or gummy smiles.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Gingivoplasty",
          description: "Cosmetic surgical sculpting of gum margins for symmetrical, aesthetically pleasing gumlines.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Bone Grafting",
          description: "Rebuild jawbone volume and density to prepare for stable dental implant placement.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Complete Dentures",
          description: "Custom full-arch removable prosthetics to restore chewing function, speech, and youthful facial support.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Implant-Supported Dentures",
          description: "Snap-on overdentures fixed onto dental implants for superior stability without slippage.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Gum Contouring",
          description: "Laser or surgical reshaping of uneven gumlines to reveal longer, beautifully proportioned teeth.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Night Guards for Teeth Grinding",
          description: "Custom-fit protective night appliances to prevent tooth wear, jaw pain, and bruxism damage.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Sports Guards",
          description: "Shock-absorbing custom athletic mouthguards to safeguard teeth and gums during sports.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Inlays and Onlays",
          description: "Custom porcelain or composite partial crowns to repair moderately damaged back teeth.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Gum (Flap Surgery)",
          description: "Advanced periodontic surgery to clean deep root surfaces and regenerate damaged bone structures.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Fluoride Application",
          description: "High-potency mineral varnish treatment to remineralize enamel and shield against decay.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      },
      {
        "@type": "Offer",
        offeredBy: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" },
        itemOffered: {
          "@type": ["Service", "MedicalProcedure"],
          name: "Full Mouth Rehabilitation",
          description: "Comprehensive multi-disciplinary treatment to rebuild worn, broken, or missing teeth across the entire mouth.",
          url: "https://drvarshney.in/#services",
          provider: { "@type": "Dentist", name: "Dr. Varshney's Dental Aesthetics" }
        }
      }
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
