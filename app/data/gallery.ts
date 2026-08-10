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
    title: "Smile Aesthetic Transformation",
    category: "transformations",
    categoryLabel: "Smile Design",
    description: "Complete cosmetic veneer & smile restoration achieved through digital smile design precision.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=85",
    tag: "Cosmetic Dentistry"
  },
  {
    id: "gal-2",
    title: "Modern Clinical Suite",
    category: "ambience",
    categoryLabel: "Clinic Ambience",
    description: "Ultra-sterile, tranquil, and comfortable treatment rooms designed for patient relaxation.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85",
    tag: "Infrastructure"
  },
  {
    id: "gal-3",
    title: "3D Digital Imaging & Diagnostics",
    category: "technology",
    categoryLabel: "Advanced Tech",
    description: "High-precision digital intraoral scanners & 3D CBCT imaging for painless diagnostic accuracy.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=85",
    tag: "Digital Tech"
  },
  {
    id: "gal-4",
    title: "Precision Dental Implantology",
    category: "transformations",
    categoryLabel: "Restorative",
    description: "Natural-looking permanent dental implants crafted for optimal functionality & speech alignment.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1400&q=85",
    tag: "Implants"
  },
  {
    id: "gal-5",
    title: "Sterile Procedure Setup",
    category: "ambience",
    categoryLabel: "Safety First",
    description: "Gold-standard autoclave sterilization protocols and surgical hygiene standards.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=85",
    tag: "Hygiene"
  },
  {
    id: "gal-6",
    title: "Invisalign & Clear Aligners",
    category: "transformations",
    categoryLabel: "Orthodontics",
    description: "Virtually invisible aligner solutions tailored to straighten teeth seamlessly without metal braces.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1400&q=85",
    tag: "Orthodontics"
  }
];
