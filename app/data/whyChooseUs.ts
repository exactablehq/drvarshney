import {
  Cpu,
  ClipboardList,
  Award,
  Shield,
  Heart,
  CalendarDays,
} from "lucide-react";

export interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export const whyChooseUsData: FeatureItem[] = [
  {
    icon: Cpu,
    title: "Advanced Digital Technology",
    description:
      "Equipped with state-of-the-art diagnostic equipment and digital imaging systems for ultra-precise treatment planning.",
  },
  {
    icon: ClipboardList,
    title: "Personalized Treatment Plans",
    description:
      "Every smile is unique. We craft individualized dental solutions tailored precisely to your anatomy and aesthetic goals.",
  },
  {
    icon: Award,
    title: "Experienced Dental Team",
    description:
      "Led by Dr. Ayush Varshney, our team utilizes advanced clinical expertise to provide modern and gentle dental procedures.",
  },
  {
    icon: Shield,
    title: "Sterile & Hygienic Environment",
    description:
      "We adhere to gold-standard sterilization protocols and clinical hygiene measures for your absolute safety.",
  },
  {
    icon: Heart,
    title: "Comfortable & Painless Procedures",
    description:
      "Designed with patient comfort in mind, using advanced pain-free techniques and a soothing ambient environment.",
  },
  {
    icon: CalendarDays,
    title: "Flexible Appointment Scheduling",
    description:
      "Book appointments effortlessly online, with flexible slots designed to fit seamlessly into your busy calendar.",
  },
];
