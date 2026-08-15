export interface GalleryItem {
  id: string;
  title: string;
  category: "transformations" | "ambience" | "technology" | "care";
  categoryLabel: string;
  description: string;
  image: string;
  tag: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Clinic Facade & Main Entrance",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Prominent front view of Dr. Varshney's Dental Aesthetics located on Main Airport Road in Nani Daman.",
    image: "/gallery/IMG_0010.jpeg",
    tag: "Exterior"
  },
  {
    id: "gal-2",
    title: "Helios 3D Intraoral Scanning Suite",
    category: "technology",
    categoryLabel: "Advanced Tech",
    description: "Helios software displaying real-time 3D digital impressions for crowns, bridges, and smile makeovers.",
    image: "/gallery/IMG_0093.jpeg",
    tag: "3D Impression"
  },
  {
    id: "gal-3",
    title: "Dr. Ayush Varshney Consultation Suite",
    category: "care",
    categoryLabel: "Doctor Care",
    description: "Dr. Ayush Varshney analyzing digital smile design cases and consulting with patients on custom treatment plans.",
    image: "/gallery/IMG_0046.jpeg",
    tag: "Doctor Care"
  },
  {
    id: "gal-4",
    title: "Woson Class B Autoclave Sterilizer",
    category: "technology",
    categoryLabel: "Advanced Tech",
    description: "Hospital-grade Class B vacuum autoclave machine for 100% infection control and instrument sterilization.",
    image: "/gallery/IMG_0095.jpeg",
    tag: "Autoclave Tech"
  },
  {
    id: "gal-5",
    title: "Welcome Reception & Waiting Lounge",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Tranquil, air-conditioned waiting area featuring plush seating and accredited certification wall.",
    image: "/gallery/IMG_0029.jpeg",
    tag: "Reception"
  },
  {
    id: "gal-6",
    title: "Dual Clinical Operatory Suite",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Expansive clinical room equipped with dual high-end dental units for simultaneous multi-specialty care.",
    image: "/gallery/IMG_0104.jpeg",
    tag: "Operatory Suite"
  },
  {
    id: "gal-7",
    title: "Invisalign & Clear Aligner Consultation",
    category: "care",
    categoryLabel: "Doctor Care",
    description: "Personalized patient counseling for clear aligners, digital orthodontics, and full mouth rehabilitation.",
    image: "/gallery/IMG_0051.jpeg",
    tag: "Smile Planning"
  },
  {
    id: "gal-8",
    title: "Intraoral 3D Scanner Workstation",
    category: "technology",
    categoryLabel: "Advanced Tech",
    description: "High-precision digital intraoral scanner for painless impressions without traditional messy molds.",
    image: "/gallery/140648.jpg",
    tag: "Digital Tech"
  },
  {
    id: "gal-9",
    title: "UV Sterilization & Disinfection Chamber",
    category: "technology",
    categoryLabel: "Advanced Tech",
    description: "Dedicated ultraviolet instrument disinfection chamber ensuring continuous microbiological cleanliness.",
    image: "/gallery/140658.jpg",
    tag: "Sterilization"
  },
  {
    id: "gal-10",
    title: "3D Digital Diagnostic Operatory",
    category: "technology",
    categoryLabel: "Advanced Tech",
    description: "Ergonomic treatment workstation equipped with high-resolution digital display monitor for precision care.",
    image: "/gallery/140642.jpg",
    tag: "Digital Diagnostics"
  },
  {
    id: "gal-11",
    title: "Reception Counter & Patient Kiosk",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Warm patient greeting counter equipped with informative treatment displays and digital payment support.",
    image: "/gallery/IMG_0038.jpeg",
    tag: "Front Desk"
  },
  {
    id: "gal-12",
    title: "Aesthetic Case Planning & Smile Analysis",
    category: "care",
    categoryLabel: "Doctor Care",
    description: "Dr. Ayush Varshney evaluating complex restorative and smile design cases using high-res digital tools.",
    image: "/gallery/IMG_0058.jpeg",
    tag: "Smile Analysis"
  },
  {
    id: "gal-13",
    title: "Spacious Operatory Hall View",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Modern, brightly lit operatory hall with climate control and ergonomic patient chairs for optimal comfort.",
    image: "/gallery/140665.jpg",
    tag: "Operatory"
  },
  {
    id: "gal-14",
    title: "Clinical Accreditations & Academic Wall",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Wall display of continuous dental education certificates, IDA memberships, and clinical honors.",
    image: "/gallery/IMG_0055.jpeg",
    tag: "Certifications"
  },
  {
    id: "gal-15",
    title: "Surgical Hygiene & Patient Care Setup",
    category: "care",
    categoryLabel: "Doctor Care",
    description: "Fully sterilized patient tray, LED shadowless light fixture, and ergonomic practitioner seating.",
    image: "/gallery/IMG_0108.jpeg",
    tag: "Clinical Care"
  },
  {
    id: "gal-16",
    title: "Diagnostic Desk & Oral Care Center",
    category: "care",
    categoryLabel: "Doctor Care",
    description: "Doctor consultation desk with curated oral hygiene care products and digital record management.",
    image: "/gallery/IMG_0052.jpeg",
    tag: "Oral Health"
  },
  {
    id: "gal-17",
    title: "Main Airport Road Location View",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Conveniently accessible clinic building opposite Ocean View Hotel with ample ground-level parking.",
    image: "/gallery/IMG_0019.jpeg",
    tag: "Location"
  },
  {
    id: "gal-18",
    title: "Ultraviolet Disinfection Bay",
    category: "technology",
    categoryLabel: "Advanced Tech",
    description: "State-of-the-art UV cabinet for maintaining continuous micro-biological sterility of surgical tools.",
    image: "/gallery/IMG_0091.jpeg",
    tag: "UV Disinfection"
  },
  {
    id: "gal-19",
    title: "Micro-Endodontic Treatment Suite",
    category: "technology",
    categoryLabel: "Advanced Tech",
    description: "Ergonomic clinical chair setup integrated with overhead LED lighting and real-time digital monitor.",
    image: "/gallery/IMG_0066.jpeg",
    tag: "Clinical Chair"
  },
  {
    id: "gal-20",
    title: "Doctor Executive Consultation Desk",
    category: "care",
    categoryLabel: "Doctor Care",
    description: "Consultation workspace featuring digital smile modeling screens and clinical accolades.",
    image: "/gallery/IMG_0056.jpeg",
    tag: "Consultation"
  },
  {
    id: "gal-21",
    title: "Sterilization Suite Corridor",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Seamless, pristine clinical hallway connecting operatory suites with the sterilization lab.",
    image: "/gallery/IMG_0088.jpeg",
    tag: "Clinic Interior"
  },
  {
    id: "gal-22",
    title: "Laser Aesthetics & Anatomical Models",
    category: "technology",
    categoryLabel: "Advanced Tech",
    description: "Diplomas in Cosmetology & Laser Aesthetics alongside high-precision dental anatomical models.",
    image: "/gallery/IMG_0057.jpeg",
    tag: "Laser & Aesthetics"
  },
  {
    id: "gal-23",
    title: "Airport Road Street View",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Easily identifiable street frontage in Kathiria, Nani Daman, welcoming patients across Daman and Vapi.",
    image: "/gallery/IMG_0023.jpeg",
    tag: "Landmark"
  },
  {
    id: "gal-24",
    title: "Patient Comfort & Washroom Facility",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Immaculately maintained restroom and hand hygiene wash basin facility for patient convenience.",
    image: "/gallery/IMG_0102.jpeg",
    tag: "Patient Comfort"
  }
];
