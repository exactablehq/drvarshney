import {
  ShieldCheck,
  HeartHandshake,
  Scale,
  Award,
  Feather,
  Sparkles,
  Cpu,
  Users,
} from "lucide-react";

export interface PillarItem {
  id: number;
  word: string;
  subtitle: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const pillarsData: PillarItem[] = [
  {
    id: 1,
    word: "Integrity",
    subtitle: "Transparent Clinical Care",
    description:
      "We recommend only what's clinically necessary and explain every option in plain language — long-term health over short-term revenue, always.",
    tag: "100% Patient-First",
    icon: ShieldCheck,
  },
  {
    id: 2,
    word: "Trust",
    subtitle: "Relationships Built Over Decades",
    description:
      "Earned through consistent outcomes, compassionate chairside manner, and safety protocols that never bend under pressure.",
    tag: "Decades of Legacy",
    icon: HeartHandshake,
  },
  {
    id: 3,
    word: "Precision",
    subtitle: "Evidence-Based Dentistry",
    description:
      "Every diagnosis and treatment plan is grounded in rigorous science, digital imaging, and anatomical accuracy — never guesswork.",
    tag: "Scientific Rigor",
    icon: Scale,
  },
  {
    id: 4,
    word: "Ethics",
    subtitle: "Uncompromised Standards",
    description:
      "Gold-standard sterilization, fair and transparent pricing, and a code of practice that puts the patient first, always.",
    tag: "Gold-Standard Sterilization",
    icon: Award,
  },
  // {
  //   id: 5,
  //   word: "Comfort",
  //   subtitle: "Anxiety-Free by Design",
  //   description:
  //     "Gentle numbing techniques and an unhurried chairside experience, built for patients who've been putting off the dentist for years.",
  //   tag: "Gentle-Touch Protocols",
  //   icon: Feather,
  // },
  // {
  //   id: 6,
  //   word: "Artistry",
  //   subtitle: "Smiles Crafted, Not Just Treated",
  //   description:
  //     "Cosmetic and restorative work shaped with an eye for facial symmetry, natural shade-matching, and lasting aesthetic detail.",
  //   tag: "Aesthetic Precision",
  //   icon: Sparkles,
  // },
  // {
  //   id: 7,
  //   word: "Innovation",
  //   subtitle: "Modern Tools, Better Outcomes",
  //   description:
  //     "Digital X-rays, intraoral scanning, and contemporary techniques replace guesswork with speed, comfort, and accuracy.",
  //   tag: "Digital-First Dentistry",
  //   icon: Cpu,
  // },
  // {
  //   id: 8,
  //   word: "Accessibility",
  //   subtitle: "Care Without Barriers",
  //   description:
  //     "Flexible scheduling, clear cost breakdowns upfront, and a welcoming practice for every age and background.",
  //   tag: "Every Patient Welcome",
  //   icon: Users,
  // },
];
