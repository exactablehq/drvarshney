# Project Technical Report: Dr. Varshney's Dental Aesthetics Web Platform

## 1. Executive Summary & Project Context
**Dr. Varshney's Dental Aesthetics** is a state-of-the-art Single-Page Web Application (SPA) developed to serve as the digital presence for a premium dental clinic in Nani Daman. Led by Dr. Ayush Varshney (Dental Surgeon) and Dr. Riya Varshney (M.D.S. Orthodontist), the platform acts as both a showcase for cosmetic and restorative treatments and a functional portal for offline-capable appointment management.

The platform is designed to provide clinical details, intuitive navigation, and user-friendly interactions while maintaining a luxury visual language.

---

## 2. Technical Stack & Architecture

The application uses a high-performance modern web development stack:

| Component | Technology | Purpose in Project |
| :--- | :--- | :--- |
| **Core UI Library** | React v19.2.4 | Manages interactive UI states (modals, sliding drawers, scroll tracking, form validation). |
| **Framework** | Next.js v16.2.11 (App Router) | Serves as the page structure, optimizing custom fonts and exporting static files (`output: "export"`). |
| **Programming Language** | TypeScript v5.0 | Provides strict type safety across layouts, component props, and state datasets. |
| **Styling Engine** | Tailwind CSS v4.0 | Drives utility styling for responsive layout spacing, flex boxes, and grids. |
| **Global Theme System** | Vanilla CSS (`globals.css`) | Implements glassmorphism variables, pulsing ambient glows, and keyframe text animations. |
| **Animation Library** | Framer Motion v12.4.2 | Animates page load pre-loaders, modals, spring-based drawers, and scroll-reveals. |
| **Vector Icons** | Lucide React | Provides clean, consistent vector icons styled dynamically via Tailwind classes. |
| **Hosting & CI/CD** | GitHub Pages & Actions | Automatically compiles and deploys static site assets on every branch push. |

---

## 3. Directory Structure & File Architecture

```text
dental-clinic/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for Pages deployment
├── app/
│   ├── components/             # Reusable UI sections
│   │   ├── ContactUs.tsx       # Contact details, WhatsApp booking trigger, Google Maps
│   │   ├── DoctorProfile.tsx   # Carousel slider showcasing doctor credentials
│   │   └── WhyChooseUs.tsx     # Feature grid detailing clinical highlights
│   ├── favicon.ico             # Brand tab icons
│   ├── globals.css             # CSS variables, animations, custom scrollbar & glows
│   ├── layout.tsx              # Root shell containing fonts, meta tags & JSON-LD schema
│   └── page.tsx                # Main page (Hero, Services, FAQ, Scheduler engine)
├── public/                     # Static graphics (logo.png, hero-dental.png, doctor images)
├── next.config.ts              # Next.js configurations for static exporting ("output: export")
├── package.json                # Project script workflows, dependencies & versions
├── tsconfig.json               # strict TypeScript compiler parameters
└── README.md                   # Repository guide and cloning setup
```

---

## 4. Core Modules & Functional Specifications

### 4.1. Root Layout & Local SEO (`app/layout.tsx`)
*   **Font Performance:** Loads Google Fonts (`Geist`, `Geist Mono`, `Playfair Display`, `Cormorant Garamond`) using optimized asset delivery to avoid layout shifts.
*   **JSON-LD Local Business Schema:** Injects structured data of type `Dentist` containing coordinates (`20.4162086, 72.8379419`), clinical hours, address, and telephone coordinates, boosting local SEO ranks.
*   **Social & Meta tags:** Configurations for search engine robots, target keywords, description texts, and OpenGraph social share media.

### 4.2. Pre-loader & Interactive Hero Section (`app/page.tsx`)
*   **Mounting Pre-loader:** Plays an initial brand loader screen with scaling circle highlights and a sliding loader bar before mounting the landing page.
*   **Spotlight Cursor Glow:** A real-time cursor tracker that captures mouse inputs (`onMouseMove`) and moves a translucent purple spotlight radial element across the Hero banner.
*   **Numerical Counters:** An intersection observer-backed counter that animates statistics (`3+ Years Experience`, `00+ Happy Patients`, `98% Success Rate`) from 0 when they enter the viewport.

### 4.3. Service Catalog & Sliding Treatment Drawer (`app/page.tsx`)
*   **Services Grid:** Renders 8 core service categories (Scaling, Fillings, Extractions, Root Canal, Prosthetics, Implants, Orthodontics, and Children's Care) inside hover-responsive cards.
*   **Slide-Out Details Drawer:** Clicking a service activates a state drawer (using `AnimatePresence` and spring transitions) displaying pricing models, typical durations, health benefits, and target FAQ answers.

### 4.4. Multi-Practitioner Carousel (`app/components/DoctorProfile.tsx`)
*   **Dual-Dentist Carousel Showcase:** A horizontally scrollable snap-grid showing profiles for Dr. Ayush Varshney and Dr. Riya Varshney.
*   **Mobile-First Layout Fixes:** Navigation arrows stack vertically at the bottom on smaller viewports, preventing text overlap and keeping the buttons clear of clinical details.

### 4.5. Appointment Scheduler & Persistent Database (`app/page.tsx`)
*   **Scheduler Form:** Captures booking details, specialized treatments, target date/time, and doctor choice.
*   **LocalStorage Persistence:** Simulates database storage by saving scheduled appointments to browser memory. The appointments persist after page refreshes, and patients can review or cancel them from a local dashboard.

### 4.6. Contacts Section & Dark-Theme Maps (`app/components/ContactUs.tsx`)
*   **Metadata Information Cards:** Organizes contacts, timings, and address details into clean cards.
*   **Custom Map Iframe:** Embeds a Google Map styled with a grayscale inversion CSS filter (`grayscale(1) invert(0.9) contrast(1.2) brightness(0.8)`) to match the dark aesthetic.

---

## 5. Visual Design Language

*   **Dark Theme Palette:**
    *   Primary Background: Deep Dark-Purple (`#07010c` / `#090611`)
    *   Card Backings: Translucent Glass Gradients (`#18022a` / `#120a24` / `#0a0516` at various opacities)
    *   Highlights: Vibrant Purple Accent Glows (`#35063e` / `#4a0956` / `#A855F7`)
    *   Typography: Soft lavenders and whites (`#FFFFFF`, `#C4B5FD`, `#A78BFA`)
*   **Glassmorphic Overlays:** Utilizes a custom border gradient selector (`premium-glass-frame`) that applies frosted glass blurs, drop shadows, and subtle inner glows.
*   **Animated Text Shader (`beautiful-smiles-glow`):** Moves a linear color gradient back and forth across header typography in a continuous 6-second loop.

---

## 6. Deployment Workflow & CI/CD Pipeline

The project implements a **GitHub Actions Pipeline** (`.github/workflows/deploy.yml`) for automated delivery:
1.  **Code Check-In:** Developer pushes changes to the `main` branch.
2.  **Runner Execution:** Workflow spins up an Ubuntu node, runs lints, and installs dependencies.
3.  **Static Build Compilation:** Next.js exports static pre-rendered HTML/CSS assets to `./out` via `npm run build`.
4.  **GitHub Pages Deployment:** Pushes compiled assets directly to the hosting server.
