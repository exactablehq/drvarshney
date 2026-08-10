export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails: string;
  priceRange: string;
  duration: string;
  benefits: string[];
  faqs: { q: string; a: string }[];
  image: string;
}

export const services: ServiceDetail[] = [
    {
      id: "filling",
      title: "Tooth Filling",
      category: "General & Preventive",
      image: "teethFilling.jpg",
      description:
        "Restore decayed or chipped teeth with aesthetic composite resin fillings that blend seamlessly.",
      fullDetails:
        "We utilize advanced, biocompatible tooth-colored composite resins to repair cavities, restore chipped edges, and close small gaps, ensuring a completely natural appearance and long-lasting durability.",
      priceRange: "Per Tooth",
      duration: "30 - 40 mins",
      benefits: [
        "Natural tooth-colored appearance",
        "Prevents further decay",
        "Bonds directly to tooth structure",
        "Mercury-free materials",
      ],
      faqs: [
        {
          q: "How long do composite fillings last?",
          a: "Typically 5 to 10 years with good oral hygiene.",
        },
        {
          q: "Will it look natural?",
          a: "Yes, the composite is customized to match the exact shade of your tooth.",
        },
      ],
    },
    {
      id: "extraction",
      title: "Tooth Extraction",
      category: "Surgical & Gum Care",
      image: "teethExtration.jpg",
      description:
        "Safe and pain-free removal of severely damaged, infected, or crowded teeth, including wisdom teeth.",
      fullDetails:
        "When a tooth cannot be saved due to extensive decay, fracture, or crowding, our team performs gentle extractions under local anesthesia, prioritizing your comfort and rapid post-care healing.",
      priceRange: "Based on complexity",
      duration: "30 - 60 mins",
      benefits: [
        "Relieves chronic pain and pressure",
        "Prevents spread of infection",
        "Relieves crowding for orthodontics",
        "Comfortable, safe procedure",
      ],
      faqs: [
        {
          q: "Is extraction painful?",
          a: "No, local anesthesia numbs the area completely. You will only feel some pressure, not pain.",
        },
        {
          q: "How long does healing take?",
          a: "The initial socket heals in 1-2 weeks. We provide clear post-extraction guidelines.",
        },
      ],
    },
    {
      id: "rct",
      title: "Root Canal Treatment",
      category: "Implants & Restorative",
      image: "root-canal-treatment.jpg",
      description:
        "Save deeply infected or damaged teeth by removing diseased pulp and sealing the canals.",
      fullDetails:
        "Our modern, single-visit or multi-visit root canal treatments utilize rotary instruments to clean, disinfect, and seal infected pulp space, alleviating severe toothaches and preserving your natural teeth.",
      priceRange: "Varies by roots",
      duration: "45 - 60 mins",
      benefits: [
        "Stops progressive toothache",
        "Preserves natural tooth structure",
        "Prevents abscess spread",
        "Restores normal bite force",
      ],
      faqs: [
        {
          q: "Is root canal treatment painful?",
          a: "No, modern anesthesia and tools make root canal therapy as comfortable as a routine filling.",
        },
        {
          q: "Will I need a crown after RCT?",
          a: "Yes, a crown is recommended to protect and strengthen the treated tooth.",
        },
      ],
    },
    {
      id: "crowns_bridges",
      title: "Crowns & Bridges, Dentures",
      category: "Implants & Restorative",
      image: "crown-1.jpg",
      description:
        "Restore missing or damaged teeth with custom-fabricated crowns, bridges, or full and partial dentures.",
      fullDetails:
        "We provide comprehensive prosthodontic options, including strong ceramic crowns to protect damaged teeth, dental bridges to fill gaps, and custom-designed dentures to restore complete function and confidence.",
      priceRange: "Custom Pricing",
      duration: "2 - 3 visits",
      benefits: [
        "Restores chewing and speech",
        "Prevents adjacent teeth shifting",
        "Aesthetic and durable",
        "Custom-fit for ultimate comfort",
      ],
      faqs: [
        {
          q: "What is the difference between a crown and a bridge?",
          a: "A crown covers a single damaged tooth, while a bridge uses adjacent teeth to suspend a replacement tooth in a gap.",
        },
        {
          q: "How do I care for dentures?",
          a: "Clean them daily with a soft brush and soak them overnight in water or a denture cleaning solution.",
        },
      ],
    },
    {
      id: "implants",
      title: "Implants",
      category: "Implants & Restorative",
      image: "implant-supported-dentures-.jpg",
      description:
        "Permanent, bio-compatible titanium implants capped with crowns to replace missing teeth from the root up.",
      fullDetails:
        "Dental implants are the gold standard for tooth replacement. They anchor directly into the jawbone, acting as artificial roots that support custom porcelain crowns for a strong, natural smile.",
      priceRange: "Custom Plan",
      duration: "3 - 6 months",
      benefits: [
        "Feels and acts like a natural tooth",
        "Prevents jawbone deterioration",
        "No support needed from adjacent teeth",
        "Lifetime durability with care",
      ],
      faqs: [
        {
          q: "Am I a candidate for implants?",
          a: "Most adults with healthy gums and sufficient jawbone density are excellent candidates.",
        },
        {
          q: "How successful are implants?",
          a: "They have a success rate of over 95%.",
        },
      ],
    },
    {
      id: "braces_aligners",
      title: "Braces & Aligners",
      category: "Orthodontics",
      image: "braces.jpg",
      description:
        "Straighten misaligned teeth and correct bites with traditional braces or discreet clear aligners.",
      fullDetails:
        "Whether you prefer traditional ceramic braces or modern clear aligners (like Invisalign), we design personalized orthodontic plans to guide your teeth into perfect, healthy alignment.",
      priceRange: "Custom Plan",
      duration: "6 - 24 months",
      benefits: [
        "Perfects smile symmetry",
        "Improves bite alignment",
        "Clear, removable aligner options",
        "Boosts confidence and oral hygiene",
      ],
      faqs: [
        {
          q: "Are clear aligners suitable for everyone?",
          a: "Aligners work well for mild to moderate crowding or spacing. Complex cases may need braces.",
        },
        {
          q: "Do aligners hurt?",
          a: "You may feel temporary pressure for a few days when changing to a new set of aligners.",
        },
      ],
    },
    {
      id: "scaling",
      title: "Scaling",
      category: "General & Preventive",
      image: "Scaling.jpg",
      description:
        "Remove plaque, tartar, and surface stains to restore clean, healthy gums and fresh breath.",
      fullDetails:
        "Our professional scaling and polishing utilizes ultrasonic scalers to safely and gently clear away plaque and hardened tartar from above and below the gumline, followed by a polishing paste to remove stubborn external stains.",
      priceRange: "Standard Rate",
      duration: "30 - 45 mins",
      benefits: [
        "Removes plaque and tartar",
        "Freshens breath",
        "Prevents gum disease",
        "Brightens your smile",
      ],
      faqs: [
        {
          q: "Is scaling painful?",
          a: "No, ultrasonic scaling is generally comfortable. We adjust the settings for sensitive teeth.",
        },
        {
          q: "How often should I get it done?",
          a: "Every 6 months to maintain optimal gum health.",
        },
      ],
    },
    {
      id: "children",
      title: "Children Dental Care",
      category: "Pediatric Care",
      image: "Child.jpg",
      description:
        "Friendly, gentle pediatric dental treatments including sealants, fluorides, and early cavity prevention.",
      fullDetails:
        "We provide a warm, encouraging environment to guide children through their first dental experiences. Our services include checkups, fluoride treatments, protective sealants, and cavity fillings.",
      priceRange: "Standard Rate",
      duration: "30 - 45 mins",
      benefits: [
        "Creates positive dental habits",
        "Prevents childhood cavities",
        "Protective dental sealants",
        "Gentle, child-friendly approach",
      ],
      faqs: [
        {
          q: "When should a child first visit the dentist?",
          a: "Around their first birthday, or when their first tooth emerges.",
        },
        {
          q: "What are dental sealants?",
          a: "Thin protective coatings applied to chewing surfaces of back teeth to prevent decay.",
        },
      ],
    },
    {
      id: "wisdom_tooth_removal",
      title: "Wisdom Tooth Removal",
      category: "Surgical & Gum Care",
      image: "wisdom.jpg",
      description:
        "Specialized extraction of impacted, painful, or misaligned wisdom teeth with surgical precision.",
      fullDetails:
        "Safe and surgical removal of third molars (wisdom teeth) that are impacted, causing pressure, tooth crowding, or recurring gum infections. Performed under gentle local anesthesia for maximum patient comfort.",
      priceRange: "Based on complexity",
      duration: "45 - 60 mins",
      benefits: [
        "Relieves severe molar and jaw pain",
        "Prevents crowding & alignment shifts",
        "Protects adjacent teeth from decay",
        "Prevents recurring gum infections",
      ],
      faqs: [
        {
          q: "Is wisdom tooth extraction painful?",
          a: "The procedure is completely numbed with local anesthesia. Post-operative discomfort is easily managed with prescribed care.",
        },
        {
          q: "How long is the recovery?",
          a: "Most patients recover comfortably within 3 to 5 days following post-extraction guidelines.",
        },
      ],
    },
    {
      id: "teeth_whitening",
      title: "Teeth Whitening",
      category: "Cosmetic & Aesthetics",
      image: "teethWhitening.jpeg",
      description:
        "Professional in-office laser whitening to remove deep stains and dramatically brighten your smile.",
      fullDetails:
        "Safe, effective clinical teeth bleaching treatment that lifts deep discoloration caused by coffee, tea, smoking, and aging, brightening teeth by several shades in a single comfortable session.",
      priceRange: "Standard Rate",
      duration: "45 - 60 mins",
      benefits: [
        "Instant multi-shade whitening",
        "Safe on tooth enamel",
        "Removes stubborn deep stains",
        "Boosts overall smile confidence",
      ],
      faqs: [
        {
          q: "Will whitening damage my enamel?",
          a: "No, professional clinical bleaching formulas are carefully pH-balanced and completely safe for enamel.",
        },
        {
          q: "How long do whitening results last?",
          a: "Results typically last 1 to 2 years depending on dietary habits and oral hygiene.",
        },
      ],
    },
    {
      id: "dental_veneers",
      title: "Dental Veneers",
      category: "Cosmetic & Aesthetics",
      image: "dentalV.jpg",
      description:
        "Ultra-thin custom porcelain or composite shells that transform shape, shade, and alignment.",
      fullDetails:
        "Custom-crafted thin porcelain laminates bonded to the front surface of teeth to instantly correct discoloration, chipped edges, minor gaps, and irregular tooth shapes for a flawless Hollywood smile.",
      priceRange: "Per Tooth",
      duration: "2 - 3 visits",
      benefits: [
        "Instant smile transformation",
        "Stain-resistant porcelain material",
        "Corrects gaps, chips & shade",
        "Minimal tooth reduction required",
      ],
      faqs: [
        {
          q: "How long do porcelain veneers last?",
          a: "High-quality porcelain veneers typically last 10 to 15+ years with good care.",
        },
        {
          q: "Are veneers stain resistant?",
          a: "Yes, porcelain is highly resistant to staining from coffee, tea, and red wine.",
        },
      ],
    },
    {
      id: "post_and_core",
      title: "Post and Core Treatment",
      category: "Implants & Restorative",
      image: "post.jpeg",
      description:
        "Rebuild heavily broken or root-canal-treated teeth to provide a sturdy foundation for a crown.",
      fullDetails:
        "When a tooth has lost significant natural structure due to extensive decay or fracture, a post is anchored into the root canal space, built up with a durable core material to securely anchor a protective dental crown.",
      priceRange: "Per Tooth",
      duration: "45 - 60 mins",
      benefits: [
        "Saves severely damaged natural teeth",
        "Creates a solid foundation for crowns",
        "Restores structural stability",
        "Prevents tooth extraction",
      ],
      faqs: [
        {
          q: "When is a post and core needed?",
          a: "It is required when a root-canal-treated tooth lacks enough natural structure to hold a crown.",
        },
        {
          q: "Is the procedure painful?",
          a: "No, as the tooth has already undergone root canal treatment, there is no active nerve pain.",
        },
      ],
    },
    {
      id: "gingivectomy",
      title: "Gingivectomy",
      category: "Surgical & Gum Care",
      image: "Gingivectomy.jpg",
      description:
        "Surgical removal of diseased or excess gum tissue to treat periodontal pockets or gummy smiles.",
      fullDetails:
        "Precision excision of overgrown or diseased gum tissue. Gingivectomy eliminates deep periodontal pockets where bacteria hide, halts progressive gum disease, and reshapes excess gum tissue.",
      priceRange: "Based on area",
      duration: "45 - 60 mins",
      benefits: [
        "Eliminates deep bacterial pockets",
        "Halts periodontal destruction",
        "Improves gum tissue health",
        "Reduces excessive gum display",
      ],
      faqs: [
        {
          q: "How long does it take for gums to heal after gingivectomy?",
          a: "Initial surface healing takes about 7 to 14 days, with full tissue maturation over a few weeks.",
        },
        {
          q: "Is local anesthesia used?",
          a: "Yes, the area is completely numbed so you remain comfortable throughout.",
        },
      ],
    },
    {
      id: "gingivoplasty",
      title: "Gingivoplasty",
      category: "Cosmetic & Aesthetics",
      image: "Gingivoplasty.jpeg",
      description:
        "Cosmetic surgical sculpting of gum margins for symmetrical, aesthetically pleasing gumlines.",
      fullDetails:
        "Surgical reshaping of healthy gum tissue around teeth to correct asymmetrical margins, thick ledges, or irregular contours, enhancing overall cosmetic smile harmony.",
      priceRange: "Custom Plan",
      duration: "30 - 45 mins",
      benefits: [
        "Creates symmetrical gum contours",
        "Enhances smile aesthetics",
        "Smooths irregular tissue edges",
        "Quick healing and minimal downtime",
      ],
      faqs: [
        {
          q: "What is the difference between gingivectomy and gingivoplasty?",
          a: "Gingivectomy removes diseased or excess tissue, whereas gingivoplasty reshapes healthy tissue for cosmetic balance.",
        },
        {
          q: "Will my gums grow back?",
          a: "When properly sculpted by a specialist, the reshaped contours remain stable.",
        },
      ],
    },
    {
      id: "bone_grafting",
      title: "Bone Grafting",
      category: "Surgical & Gum Care",
      image: "BoneGrafting.jpg",
      description:
        "Rebuild jawbone volume and density to prepare for stable dental implant placement.",
      fullDetails:
        "Surgical procedure utilizing specialized bio-compatible bone graft material to regenerate lost bone height and width caused by extraction, trauma, or gum disease, providing solid anchorage for implants.",
      priceRange: "Based on site",
      duration: "45 - 90 mins",
      benefits: [
        "Restores jawbone density",
        "Enables successful implant placement",
        "Preserves facial bone structure",
        "Prevents long-term bone collapse",
      ],
      faqs: [
        {
          q: "How long does bone graft integration take?",
          a: "Bone graft material integrates naturally over 3 to 6 months before placing implants.",
        },
        {
          q: "Where does the bone graft material come from?",
          a: "We use sterile, certified synthetic or natural bio-materials engineered for safe bone growth.",
        },
      ],
    },
    {
      id: "complete_dentures",
      title: "Complete Dentures",
      category: "Implants & Restorative",
      image: "Complete-denture.jpg",
      description:
        "Custom full-arch removable prosthetics to restore chewing function, speech, and youthful facial support.",
      fullDetails:
        "Custom-designed, lightweight removable full dentures tailored to fit the exact contours of your upper or lower arches, replacing all missing teeth while providing natural facial esthetics and chewing ability.",
      priceRange: "Per Arch / Full Set",
      duration: "3 - 4 visits",
      benefits: [
        "Full arch tooth replacement",
        "Restores clear speech & chewing",
        "Supports facial muscles & lips",
        "Custom shade and comfortable fit",
      ],
      faqs: [
        {
          q: "How long does it take to get used to new dentures?",
          a: "Most patients adjust within 2 to 4 weeks with initial practice speaking and eating soft foods.",
        },
        {
          q: "Should I sleep in my complete dentures?",
          a: "It is recommended to remove them overnight to let your gums rest and stay healthy.",
        },
      ],
    },
    {
      id: "implant_supported_dentures",
      title: "Implant-Supported Dentures",
      category: "Implants & Restorative",
      image: "Implant-SupportedDentures.jpg",
      description:
        "Snap-on overdentures fixed onto dental implants for superior stability without slippage.",
      fullDetails:
        "An advanced solution combining dental implants with custom dentures. Special attachments snap onto 2 to 4 titanium implants in the jaw, eliminating slipping, palate coverage, and messy adhesives.",
      priceRange: "Custom Plan",
      duration: "3 - 6 months",
      benefits: [
        "Zero slipping or clicking",
        "No messy denture adhesives needed",
        "Superior chewing power & stability",
        "Preserves jawbone from shrinking",
      ],
      faqs: [
        {
          q: "Can my current dentures be converted?",
          a: "In some cases, existing dentures can be modified with special locator attachments to fit implants.",
        },
        {
          q: "Are implant dentures removable?",
          a: "We offer both snap-on removable overdentures and fixed non-removable implant bridges.",
        },
      ],
    },
    {
      id: "gum_contouring",
      title: "Gum Contouring",
      category: "Cosmetic & Aesthetics",
      image: "Gum Contouring.jpg",
      description:
        "Laser or surgical reshaping of uneven gumlines to reveal longer, beautifully proportioned teeth.",
      fullDetails:
        "Minimally invasive cosmetic sculpting designed to correct a 'gummy' smile or uneven gum level, exposing more natural enamel for a balanced, harmonious aesthetic smile line.",
      priceRange: "Per Quadrant / Arch",
      duration: "30 - 45 mins",
      benefits: [
        "Corrects gummy smiles",
        "Evens out asymmetrical gum lines",
        "Minimally invasive precision",
        "Immediate cosmetic transformation",
      ],
      faqs: [
        {
          q: "Does gum contouring involve lasers?",
          a: "Yes, we often use dental lasers for precise trimming with instant cauterization and minimal bleeding.",
        },
        {
          q: "Is healing fast?",
          a: "Yes, soft tissue healing typically occurs within a few days to a week.",
        },
      ],
    },
    {
      id: "night_guards",
      title: "Night Guards for Teeth Grinding",
      category: "General & Preventive",
      image: "Night-Guards.jpg",
      description:
        "Custom-fit protective night appliances to prevent tooth wear, jaw pain, and bruxism damage.",
      fullDetails:
        "Custom-fabricated durable night guards engineered to cushion your upper and lower teeth during sleep, protecting enamel from heavy nighttime clenching, grinding (bruxism), and TMJ strain.",
      priceRange: "Standard Rate",
      duration: "2 visits",
      benefits: [
        "Protects enamel from heavy wear",
        "Relieves morning jaw pain & headaches",
        "Custom comfortable fit",
        "Prevents tooth fractures & restorations",
      ],
      faqs: [
        {
          q: "How do custom night guards compare to store-bought ones?",
          a: "Custom guards are precision-molded to your bite, offering far greater comfort, durability, and breathability.",
        },
        {
          q: "How do I clean my night guard?",
          a: "Rinse with cool water daily and brush gently with mild soap or denture cleaner.",
        },
      ],
    },
    {
      id: "sports_guards",
      title: "Sports Guards",
      category: "General & Preventive",
      image: "Sports-Mouth-Guard.jpg",
      description:
        "Shock-absorbing custom athletic mouthguards to safeguard teeth and gums during sports.",
      fullDetails:
        "High-impact custom mouthguards designed for athletes and sports enthusiasts. Protects teeth, lips, tongue, and jaw from impact injuries during contact sports and high-intensity activities.",
      priceRange: "Standard Rate",
      duration: "2 visits",
      benefits: [
        "Maximum shock absorption",
        "Prevents tooth loss and lip lacerations",
        "Custom fit allows clear breathing & speech",
        "Durable tear-resistant material",
      ],
      faqs: [
        {
          q: "Why choose a custom sports guard over over-the-counter guards?",
          a: "Custom sports guards fit snugly over teeth without slipping, allowing effortless breathing, speaking, and maximum protection.",
        },
        {
          q: "How long does a sports guard last?",
          a: "Typically 1 to 2 seasons depending on usage and growth.",
        },
      ],
    },
    {
      id: "inlays_and_onlays",
      title: "Inlay and Onlays",
      category: "Cosmetic & Aesthetics",
      image: "Inlays_Onlays.jpg",
      description:
        "Custom porcelain or composite partial crowns to repair moderately damaged back teeth.",
      fullDetails:
        "Lab-crafted indirect restorations used when a tooth has too much damage for a standard filling but enough healthy enamel to avoid a full crown. Inlays fit within cusps, while onlays cover one or more cusps.",
      priceRange: "Per Tooth",
      duration: "2 visits",
      benefits: [
        "Conserves natural tooth structure",
        "Extremely strong porcelain material",
        "Seamless color matching",
        "Longer lasting than standard fillings",
      ],
      faqs: [
        {
          q: "What is the difference between an inlay and an onlay?",
          a: "An inlay fills the space between cusps inside the tooth, while an onlay extends over one or more cusps.",
        },
        {
          q: "Are inlays stronger than fillings?",
          a: "Yes, ceramic inlays and onlays increase tooth strength by up to 75%.",
        },
      ],
    },
    {
      id: "gum_flap_surgery",
      title: "Gum (Flap Surgery)",
      category: "Surgical & Gum Care",
      image: "Gum-jpg",
      description:
        "Advanced periodontic surgery to clean deep root surfaces and regenerate damaged bone structures.",
      fullDetails:
        "Specialized periodontal procedure where gum tissue is gently separated from teeth to gain direct visual access for deep scaling, root planing, and bacterial debridement in severe periodontitis cases.",
      priceRange: "Per Quadrant",
      duration: "60 - 90 mins",
      benefits: [
        "Cleans deep un-reachable root surfaces",
        "Halts advanced periodontal decay",
        "Reduces deep gum pocket depth",
        "Allows bone grafting & tissue regeneration",
      ],
      faqs: [
        {
          q: "When is flap surgery required?",
          a: "When gum disease has progressed deeply and non-surgical scaling cannot reach deep root deposits.",
        },
        {
          q: "What is recovery like?",
          a: "Mild discomfort is managed with prescribed medication; stitches dissolve or are removed in 7-10 days.",
        },
      ],
    },
    {
      id: "fluoride_application",
      title: "Fluoride Application",
      category: "General & Preventive",
      image: "Fluoride-Application.jpg",
      description:
        "High-potency mineral varnish treatment to remineralize enamel and shield against decay.",
      fullDetails:
        "A quick, painless preventive treatment where a concentrated fluoride gel or varnish is applied directly to teeth to strengthen weakened enamel, reduce root sensitivity, and prevent future cavities.",
      priceRange: "Standard Rate",
      duration: "15 - 20 mins",
      benefits: [
        "Remineralizes early enamel erosion",
        "Significantly reduces cavity risk",
        "Desensitizes sensitive tooth roots",
        "Fast, painless application",
      ],
      faqs: [
        {
          q: "Can adults benefit from fluoride application?",
          a: "Yes! Fluoride is highly beneficial for adults with gum recession, root sensitivity, or high cavity risk.",
        },
        {
          q: "How long after treatment before I can eat?",
          a: "You can eat soft foods immediately, but avoid hot liquids and hard foods for 4 to 6 hours.",
        },
      ],
    },
    {
      id: "full_mouth_rehabilitation",
      title: "Full Mouth Rehabilitation",
      category: "Implants & Restorative",
      image: "Full-Mouth-Rehabilitation.jpg",
      description:
        "Comprehensive multi-disciplinary treatment to rebuild worn, broken, or missing teeth across the entire mouth.",
      fullDetails:
        "A customized master treatment plan combining prosthodontics, implantology, endodontics, and periodontics to fully restore severely worn, broken, misaligned, or missing teeth for optimal bite function and jaw harmony.",
      priceRange: "Custom Comprehensive Plan",
      duration: "Multiple Phases",
      benefits: [
        "Restores total bite function & chewing power",
        "Completely transforms smile aesthetics",
        "Relieves chronic jaw joint & TMJ pain",
        "Long-lasting structural rehabilitation",
      ],
      faqs: [
        {
          q: "Who needs full mouth rehabilitation?",
          a: "Patients with severely worn teeth, multiple missing teeth, severe bite collapse, or extensive dental trauma.",
        },
        {
          q: "How long does the complete process take?",
          a: "Depending on the complexity, treatment can span from a few weeks to several months across planned phases.",
        },
      ],
    },
  ];


export const serviceCategories = [
  "All",
  "General & Preventive",
  "Cosmetic & Aesthetics",
  "Implants & Restorative",
  "Surgical & Gum Care",
  "Orthodontics",
  "Pediatric Care",
];
