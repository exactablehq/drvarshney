import { services } from "../data/services";
import { reviewsData } from "../data/reviews";
import { doctorsData } from "../data/doctors";

export function generateJsonLd() {
  const baseUrl = "https://drvarshney.in";
  const clinicId = `${baseUrl}/#dentist`;
  const websiteId = `${baseUrl}/#website`;
  const webpageId = `${baseUrl}/#webpage`;

  // Calculate review aggregation
  const averageRating =
    reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length;

  // Individual Reviews Schema
  const reviewsSchema = reviewsData.map((review) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.patientName,
    },
    datePublished: "2026-07-01",
    reviewBody: review.reviewText,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@id": clinicId,
    },
  }));

  // Doctor / Staff Profiles Schema
  const physiciansSchema = doctorsData.map((doc) => ({
    "@type": "Physician",
    "@id": `${baseUrl}/#doctor-${doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: doc.name,
    jobTitle: doc.credentials,
    description: doc.bio,
    medicalSpecialty: doc.specialization,
    worksFor: {
      "@id": clinicId,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: doc.education.split("·")[0]?.trim() || "Dental College",
    },
    image: `${baseUrl}/${doc.image.startsWith("/") ? doc.image.slice(1) : doc.image}`,
    knowsAbout: doc.expertise,
  }));

  // Services Catalog
  const offerCatalog = {
    "@type": "OfferCatalog",
    name: "Comprehensive Dental Treatments & Aesthetic Procedures",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "MedicalProcedure",
        name: service.title,
        description: service.description,
        procedureType: "NonSurgicalProcedure",
        category: service.category,
        url: `${baseUrl}/#services`,
        provider: {
          "@id": clinicId,
        },
      },
    })),
  };

  // FAQPage Schema - Extract all service FAQs
  const allFaqs = services.flatMap((service) =>
    service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    }))
  );

  const faqPageSchema = {
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    mainEntity: allFaqs,
  };

  // WebSite Schema
  const websiteSchema = {
    "@type": "WebSite",
    "@id": websiteId,
    url: baseUrl,
    name: "Dr. Varshney's Dental Aesthetics",
    description:
      "Premier dental clinic in Nani Daman offering cosmetic dentistry, dental implants, root canals, orthodontics, and smile makeovers.",
    publisher: {
      "@id": clinicId,
    },
    inLanguage: "en-IN",
  };

  // WebPage Schema
  const webPageSchema = {
    "@type": "WebPage",
    "@id": webpageId,
    url: baseUrl,
    name: "Dr. Varshney's Dental Aesthetics | Best Dentist in Daman",
    description:
      "Experience advanced, patient-focused dentistry in Nani Daman. From dental implants to root canals and smile makeovers.",
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": clinicId,
    },
    inLanguage: "en-IN",
    breadcrumb: {
      "@id": `${baseUrl}/#breadcrumb`,
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ],
  };

  // Main Dentist / MedicalBusiness Schema
  const dentistSchema = {
    "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
    "@id": clinicId,
    name: "Dr. Varshney's Dental Aesthetics",
    alternateName: [
      "Dr. Varshney Dental Clinic",
      "Dr. Varshney's Dental Clinic Daman",
      "Dr. Ayush Varshney Dental Aesthetics",
    ],
    description:
      "Dr. Varshney's Dental Aesthetics is a state-of-the-art dental clinic in Nani Daman led by Dr. Ayush Varshney (B.D.S.) and team of dental specialists, providing dental implants, single-sitting root canals, cosmetic dentistry, braces, aligners, and painless family dental care.",
    url: baseUrl,
    logo: `${baseUrl}/branding/logo.svg`,
    image: [
      `${baseUrl}/branding/og-image.jpg`,
      `${baseUrl}/about-dentist.png`,
      `${baseUrl}/hero-dental.png`,
    ],
    telephone: "+91 79774 54648",
    email: "dr.varshneydental@gmail.com",
    hasMap: "https://maps.app.goo.gl/Zr5mhcbeftFzhSgu7",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: [
      "Cash",
      "UPI",
      "Credit Card",
      "Debit Card",
      "Net Banking",
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
      latitude: 20.4162086,
      longitude: 72.8379419,
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
      {
        "@type": "City",
        name: "Vapi",
      },
      {
        "@type": "City",
        name: "Silvassa",
      },
      {
        "@type": "City",
        name: "Valsad",
      },
    ],
    medicalSpecialty: [
      "Dentistry",
      "CosmeticDentistry",
      "Orthodontics",
      "PediatricDentistry",
      "Periodontics",
      "Prosthodontics",
      "Endodontics",
    ],
    founder: {
      "@type": "Person",
      name: "Dr. Ayush Varshney",
      jobTitle: "Chief Dental Surgeon",
      alumniOf: "Gujarat University",
      sameAs: "https://wa.me/917977454648",
    },
    employee: physiciansSchema.map((p) => ({
      "@id": p["@id"],
      name: p.name,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviewsData.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviewsSchema,
    hasOfferCatalog: offerCatalog,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 79774 54648",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    sameAs: [
      "https://maps.app.goo.gl/Zr5mhcbeftFzhSgu7",
      "https://wa.me/917977454648",
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      dentistSchema,
      websiteSchema,
      webPageSchema,
      breadcrumbSchema,
      faqPageSchema,
      ...physiciansSchema,
    ],
  };
}
