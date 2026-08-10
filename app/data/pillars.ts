import { ShieldCheck, HeartHandshake, Scale, Award } from "lucide-react";

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
      "We prescribe only necessary treatments with complete honesty, prioritizing long-term health over short-term revenue.",
    tag: "100% Patient-First",
    icon: ShieldCheck,
  },
  {
    id: 2,
    word: "Trust",
    subtitle: "Enduring Relationships",
    description:
      "Earned over decades through compassionate care, consistent outcomes, and strict safety protocols.",
    tag: "Decades of Legacy",
    icon: HeartHandshake,
  },
  {
    id: 3,
    word: "Principles",
    subtitle: "Evidence-Based Science",
    description:
      "Built on rigorous scientific standards, modern technology, and anatomical precision — never guesswork.",
    tag: "Scientific Rigor",
    icon: Scale,
  },
  {
    id: 4,
    word: "Ethics",
    subtitle: "Uncompromised Standards",
    description:
      "Strict adherence to gold-standard sterilization, fair pricing, and uncompromised medical ethics.",
    tag: "Gold Sterilization",
    icon: Award,
  },
];
