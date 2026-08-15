import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr. Varshney's Dental Aesthetics",
    short_name: "Dr. Varshney Dental",
    description:
      "Advanced, patient-focused dental care and aesthetic smile transformations in Nani Daman.",
    start_url: "/",
    display: "standalone",
    background_color: "#030109",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
