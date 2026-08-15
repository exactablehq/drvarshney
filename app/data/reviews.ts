export interface ReviewItem {
  id: string;
  patientName: string;
  role: string;
  location: string;
  avatar: string;
  initials: string;
  rating: number;
  date: string;
  treatment: string;
  highlight: string;
  reviewText: string;
  verifiedSource: string;
}

export const reviewsData: ReviewItem[] = [
  {
    id: "rev-1",
    patientName: "Rajesh Patel",
    role: "Business Owner",
    location: "Nani Daman",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    initials: "RP",
    rating: 5,
    date: "2 weeks ago",
    treatment: "Dental Implant & Crown",
    highlight: "100% Pain-Free Dental Implant",
    reviewText: "Dr. Ayush Varshney explained the entire implant procedure with complete transparency. The surgical placement was surprisingly pain-free, and the final crown matches my natural teeth seamlessly.",
    verifiedSource: "Google Review"
  },
  {
    id: "rev-2",
    patientName: "Kavita Desai",
    role: "Educator",
    location: "Vapi",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    initials: "KD",
    rating: 5,
    date: "3 weeks ago",
    treatment: "Single-Sitting Root Canal",
    highlight: "Single-Sitting Pain Relief",
    reviewText: "I went in with acute throbbing tooth pain and was terrified of root canals. Dr. Varshney performed single-sitting RCT with zero pain during or after. An immaculate sterile environment!",
    verifiedSource: "Google Review"
  },
  {
    id: "rev-3",
    patientName: "Pooja Sharma",
    role: "Corporate Executive",
    location: "Silvassa",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    initials: "PS",
    rating: 5,
    date: "1 month ago",
    treatment: "Laser Whitening & Scaling",
    highlight: "Instant Whitening & Zero Sensitivity",
    reviewText: "The ultrasonic scaling and clinical laser whitening results were unbelievable! My teeth look naturally bright and healthy, without any post-treatment sensitivity.",
    verifiedSource: "Verified Patient"
  },
  {
    id: "rev-4",
    patientName: "Dr. Jayesh Solanki",
    role: "Medical Officer",
    location: "Moti Daman",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80",
    initials: "JS",
    rating: 5,
    date: "1 month ago",
    treatment: "Aesthetic Smile Restoration",
    highlight: "Gold-Standard Hygiene & Precision",
    reviewText: "As a doctor myself, I am very particular about infection control. Dr. Varshney adheres strictly to gold-standard sterilization protocols and delivers meticulous anatomical tooth restorations.",
    verifiedSource: "Google Review"
  },
  {
    id: "rev-5",
    patientName: "Sneha Bhandari",
    role: "Homemaker",
    location: "Valsad",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    initials: "SB",
    rating: 5,
    date: "2 months ago",
    treatment: "Pediatric Dental Care",
    highlight: "Gentle Care For Children",
    reviewText: "Brought my 7-year-old daughter for her first dental filling. Dr. Varshney and his team were so gentle, patient, and child-friendly! She felt completely at ease.",
    verifiedSource: "Google Review"
  },
  {
    id: "rev-6",
    patientName: "Amitabh Roy",
    role: "Regional Manager",
    location: "Surat",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    initials: "AR",
    rating: 5,
    date: "2 months ago",
    treatment: "Clear Aligners",
    highlight: "Flawless Aligner Treatment",
    reviewText: "Traveled from Surat specifically for clear aligner therapy. Dr. Varshney planned everything digitally. The aligners are virtually invisible and fit comfortably.",
    verifiedSource: "Verified Patient"
  }
];
