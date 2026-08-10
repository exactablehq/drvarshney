export interface DoctorProfileData {
  name: string;
  credentials: string;
  regNo: string;
  experience: string;
  education: string;
  specialization: string;
  bio: string;
  expertise: string[];
  image: string;
  phone?: string;
  whatsapp?: string;
}

export const doctorsData: DoctorProfileData[] = [
    {
        name: "Dr. Ayush Varshney",
        credentials: "B.D.S. (Dental Surgeon)",
        regNo: "Reg. No.: A-22861",
        experience: "Chief Dental Surgeon at Dr. Varshney's Dental Aesthetics · 3+ Years of Clinical Practice (Dental Surgeon)",
        education: "B.D.S. from Gujarat University ",
        specialization: "Aesthetic & Restorative Dentistry, Implantology, Root Canal Therapy",
        bio: "A dedicated and compassionate dental surgeon with over three years of experience in transforming smiles and restoring oral health. Dr. Varshney combines advanced clinical techniques with a gentle, patient-centric approach to deliver exceptional care. Committed to continuous learning and innovation, he specializes in modern aesthetic restorations, pain-free root canal treatments, and long-lasting dental implant solutions.",
        expertise: [
            "Aesthetic Smile Makeovers",
            "Pain-Free Root Canal Treatments",
            "Dental Implant Surgery",
            "Cosmetic Bonding & Veneers"
        ],
        image: "drAyush_nobg.png",
        phone: "+91 79774 54648",
        whatsapp: "https://wa.me/919797454648?text=Hello%20Dr.%20Varshney,%20I%20would%20like%20to%20book%20an%20appointment."
    },
        {
        name: "Dr. Poorav P. Patel",
        credentials: "M.D.S. (Pedodontics & Preventive Dentistry) · B.D.S.",
        regNo: "Consultant Pediatric Dentist · Rank 3 Gujarat University",
        experience: "3rd Rank M.D.S. Gujarat University · National Best Poster Winner (ISPPD 2023)",
        education: "M.D.S. (GDC Ahmedabad) · B.D.S. (GDC Jamnagar)",
        specialization: "Conscious Sedation (Nitrous Oxide), GA Rehabilitation, Zirconia Crowns & Pediatric Dentistry",
        bio: "Dr. Poorav P. Patel is an academically distinguished Consultant Pediatric Dentist (Pedodontist) who secured 3rd Rank in M.D.S. at Gujarat University (GDC Ahmedabad) and won the National Best Poster Award at ISPPD 2023. He specializes in comprehensive, gentle pediatric oral healthcare, non-pharmacological behavior management (Tell-Show-Do), conscious sedation (Nitrous Oxide / Laughing Gas), and full mouth rehabilitation under General Anesthesia (GA) for uncooperative or anxious children. Dr. Patel is highly skilled in pediatric root canals (Pulpectomy, Apexification), Zirconia & Stainless Steel Crowns, trauma management, habit breaking appliances, and special needs dentistry.",
        expertise: [
            "Conscious Sedation & GA Rehabilitation",
            "Pulpectomy & Zirconia / Steel Crowns",
            "Trauma Care & Habit Breaking Appliances",
            "Special Care Dentistry & Fluoride Therapy"
        ],
        image: "drPoorav_nobg.png",
       
    },
    {
        name: "Dr. Aakash Pankaj Parmar",
        credentials: "M.D.S. (Orthodontics & Dentofacial Orthopaedics)",
        regNo: "Consultant Orthodontist",
        experience: "5+ Years of Orthodontic Practice",
        education: "M.D.S. (Vyas Dental College) · B.D.S. (Vaidik Dental College)",
        specialization: "Self-Ligating Braces, Invisible Aligners (Orthodontics), TADs",
        bio: "Dynamic and results-driven Orthodontist with over 5 years of specialized experience in creating beautiful smiles and enhancing oral health. Dr. Aakash Parmar is dedicated to delivering exceptional care and achieving optimal treatment outcomes using advanced orthodontic systems, clear aligners, and skeletal anchorage procedures.",
        expertise: [
            "Invisible Orthodontics (Aligners)",
            "Self-Ligating & Bracket Systems",
            "Skeletal Anchorage System (TADs)",
            "Myo-functional Appliance Therapy"
        ],
        image: "drAakash_nobg.png"
    },
    {
        name: "Dr. Vishal Rohit",
        credentials: "M.D.S. (Orthodontics)",
        regNo: "Visiting Consultant · Certified Invisalign Provider",
        experience: "Visiting Consultant Orthodontist",
        education: "GDC Kozhikode · GDC Thrissur · GDC Indore",
        specialization: "Invisalign, Clear Aligners & Advanced Orthodontics",
        bio: "Visiting Consultant Orthodontist and certified Invisalign Provider with extensive training across prestigious institutions including GDC Kozhikode, GDC Thrissur, and GDC Indore. Dr. Vishal Rohit specializes in state-of-the-art clear aligner therapy, orthodontic alignment, and comprehensive smile corrections.",
        expertise: [
            "Invisalign & Clear Aligners",
            "Orthodontic Braces & Alignment",
            "Dentofacial Orthopaedics",
            "Esthetic Smile Corrections"
        ],
        image: "dr3_nobg.png",
        
    },
    {
        name: "Dr. Kunjan Patel",
        credentials: "M.D.S. (Oral & Maxillofacial Surgery) · Gold Medalist",
        regNo: "Consultant Oral & Maxillofacial Surgeon",
        experience: "Gold Medalist · University First Rank (M.D.S.)",
        education: "M.D.S. (Pacific Dental College) · B.D.S. (Gujarat University)",
        specialization: "Facial Trauma, Orthognathic Surgery, TMJ Disorders & Maxillofacial Procedures",
        bio: "Academically distinguished Gold Medalist and Oral & Maxillofacial Surgeon specializing in facial trauma, orthognathic jaw surgery, TMJ disorders, and complex dentoalveolar surgeries. Dr. Kunjan Patel brings surgical precision, clinical excellence, and patient-centered care to advanced reconstructive and rehabilitation procedures.",
        expertise: [
            "Facial Trauma & Fracture Surgery",
            "Orthognathic & Jaw Correction",
            "TMJ Disorders & Maxillofacial Care",
            "Complex Tooth Extractions & Biopsies"
        ],
        image: "dr4_nobg.png",
        
    },
    {
        name: "Dr. Het M. Shah",
        credentials: "B.D.S., M.D.S. (Oral & Maxillofacial Surgery & Implantology)",
        regNo: "Chief Oral & Maxillofacial Surgeon · National Award Winner",
        experience: "Dr. R. Ahemad National Student Award Winner · 5 Registered Copyrights",
        education: "M.D.S. (Oral & Maxillofacial Surgery) · B.D.S.",
        specialization: "Dental Implants, Maxillofacial Trauma, Oral Pathology & TMJ Disorders",
        bio: "Dr. Het M. Shah is our Chief Oral & Maxillofacial Surgeon and the proud recipient of the Dr. R. Ahemad National Student Award for Best Postgraduate Academic Excellence. He specializes in dental implants, oral and maxillofacial surgery, maxillofacial trauma, oral pathology, and TMJ disorders, delivering advanced surgical care with precision, compassion, and the latest evidence-based techniques. Dr. Shah also pursues his keen interest in academics having 5 registered copyrights in his name. Experienced in performing complex oral and maxillofacial procedures under sedation and general anesthesia, Dr. Shah is committed to restoring oral health, function, facial aesthetics, and patient confidence through personalized treatment.",
        expertise: [
            "Dental Implants & Implantology",
            "Maxillofacial Trauma & Reconstruction",
            "Oral Pathology & TMJ Disorders",
            "Surgeries Under Sedation & GA"
        ],
        image: "dr5_nobg.png",
        
        
    },
    {
        name: "Dr. Heli Patel",
        credentials: "M.D.S. (Periodontology & Implantology) · B.D.S.",
        regNo: "Consultant Periodontist & Implantologist",
        experience: "Periodontist & Implantologist",
        education: "M.D.S. Periodontology & Implantology (Karnavati School of Dentistry) · B.D.S. (Dharamsinh Desai University)",
        specialization: "Periodontology, Dental Implantology, Bone Grafting & Laser Dentistry",
        bio: "Passionate and detail-oriented Periodontist and Implantologist with extensive training in diagnosing and treating periodontal diseases, soft and hard tissue management, and implant placements. Skilled in patient education, surgical procedures, and interdisciplinary treatment planning. Dedicated to providing high-quality dental care while staying updated with the latest advancements in periodontology and implantology.",
        expertise: [
            "Periodontal Surgery & Soft Tissue Management",
            "Dental Implantology (Placement & Restoration)",
            "Bone Grafting & Sinus Augmentation",
            "Laser-Assisted Periodontal Therapy"
        ],
        image: "drHeli_nobg.png",
        
    },
    {
        name: "Dr. Basav Joshi",
        credentials: "M.D.S. (Prosthodontics) · B.D.S.",
        regNo: "Consultant Prosthodontist & Implantologist",
        experience: "2+ Years of Clinical Experience in Prosthodontics & Restorative Dentistry",
        education: "M.D.S. Prosthodontics (2024) · B.D.S. (2018)",
        specialization: "Prosthodontics, Dental Implantology, Full Mouth Rehabilitation & Smile Design",
        bio: "Dedicated and skilled Prosthodontist with expertise in restorative and implant dentistry, committed to delivering high-quality patient care with precision, aesthetics, and modern treatment approaches. Passionate about full mouth rehabilitation and prosthetic excellence.",
        expertise: [
            "Full Mouth Rehabilitation",
            "Dental Implant & Implant Prosthesis",
            "Fixed & Removable Prosthodontics",
            "Smile & Occlusal Rehabilitation"
        ],
        image: "drBasav_gen_nobg.png",
        
    },
    {
        name: "Dr. Riddhika H. Shah",
        credentials: "M.D.S. (Pediatric & Preventive Dentistry) · Gold Medalist",
        regNo: "Chief Pediatric & Preventive Dentist",
        experience: "Gold Medalist in Pediatric Dentistry · Chief Pediatric & Preventive Dentist",
        education: "M.D.S. (Pediatric & Preventive Dentistry)",
        specialization: "Pediatric Dentistry, Oral Sedation, Nitrous Oxide (Laughing Gas) Sedation & Special Needs Care",
        bio: "Dr. Riddhika H. Shah is our Chief Pediatric & Family Dentist, committed to providing gentle, compassionate dental care for children, adults, and specially abled individuals. With expertise in Child Dentistry, Oral Sedation, and Nitrous Oxide (Laughing Gas) Sedation, she creates safe, comfortable, and anxiety-free dental experiences for every patient.",
        expertise: [
            "Child & Family Dentistry",
            "Nitrous Oxide (Laughing Gas) Sedation",
            "Oral Sedation & Anxiety-Free Care",
            "Special Needs Dentistry"
        ],
        image: "drRiddhika_nobg.png"
    },
    {
        name: "Dr. Hitesh Patel",
        credentials: "Senior Microdentist & Implantologist",
        regNo: "Root Canal Specialist · 15+ Years of Experience",
        experience: "15+ Years of Clinical Experience in Microscopic Dentistry & Implantology",
        education: "Rajiv Gandhi University (2010)",
        specialization: "Advanced Microscopic Dentistry, Root Canal Treatment & Dental Implants",
        bio: "With 15+ years of clinical experience, Dr. Hitesh Patel specializes in advanced microscopic dentistry, root canal treatment, and dental implant procedures. He is committed to providing precise, painless, and high-quality dental care using modern techniques and technology.",
        expertise: [
            "Senior Microdentist & Implantologist",
            "Root Canal Specialist",
            "Advanced Microscopic Dentistry",
            "Dental Implant Procedures"
        ],
        image: "drHitesh_nobg.png"
    },
    {
        name: "Dr. Ankur Patel",
        credentials: "Senior Implantologist",
        regNo: "15+ Years of Experience",
        experience: "15+ Years of Clinical Experience in Dental Implantology",
        education: "Rajiv Gandhi University (2010)",
        specialization: "Advanced Dental Implantology & Patient-Centered Care",
        bio: "With 15+ years of clinical experience, Dr. Ankur Patel specializes in advanced dental implantology and is committed to providing precise, reliable, and patient-centered dental care using modern techniques and technology.",
        expertise: [
            "Senior Implantologist",
            "Advanced Dental Implantology",
            "15+ Years Clinical Experience",
            "Patient-Centered Dental Care"
        ],
        image: "drAnkul_nobg.png"
    },   {
        name: "Dr. Ronit Tiwari",
        credentials: "M.D.S. (Orthodontics & Dentofacial Orthopaedics) · B.D.S.",
        regNo: "Consultant Orthodontist & Dentofacial Orthopedist",
        experience: "AIR 162 (MDS Entrance) · Silver Medalist (BDS 3rd & Final Year) · Senior Lecturer at Vaidik Dental College",
        education: "M.D.S. (GDC Ahmedabad) · B.D.S. (2014–2019) · Vallabh Ashram School",
        specialization: "Evidence-Based Orthodontics, Dentofacial Orthopedics, Facial Aesthetics & Functional Harmony",
        bio: "Dr. Ronit Tiwari is a Consultant Orthodontist and Dentofacial Orthopedist dedicated to providing evidence-based, personalized orthodontic care with a focus on both function and facial aesthetics. An academically distinguished practitioner, he earned Silver Medals in both 3rd and final years of BDS (2014–2019) and secured All India Rank 162 in General Category to pursue MDS in Orthodontics at the prestigious Government Dental College and Hospital, Ahmedabad. Currently serving as Senior Lecturer at Vaidik Dental College and Research Centre",
        expertise: [
            "Evidence-Based Orthodontic Care",
            "Dentofacial Orthopedics & Growth Modulation",
            "Facial Aesthetics & Functional Balance",
            "Tailored Aligners & Braces Therapy"
        ],
        image: "drRonit_nobg.png"
    },
    {
        name: "Dr. Pal Desai",
        credentials: "M.D.S. (Oral & Maxillofacial Pathology)",
        regNo: "Consulting Oral & Maxillofacial Pathologist · Senior Lecturer",
        experience: "Consulting Oral & Maxillofacial Pathologist · Senior Lecturer",
        education: "M.D.S. in Oral & Maxillofacial Pathology",
        specialization: "Oral & Maxillofacial Pathology, Histopathological Evaluation & Early Cancer Detection",
        bio: "Dr. Pal Desai is a highly qualified Consulting Oral & Maxillofacial Pathologist with an MDS in Oral & Maxillofacial Pathology and currently serves as a Senior Lecturer. Dedicated to diagnosis and microscopic evaluation (histopathological evaluation) of diseases affecting the oral cavity, jaws, salivary glands, and maxillofacial region. A strong emphasis is placed on the early detection of oral potentially malignant disorders and oral cancer, helping improve patient outcomes through prompt intervention.",
        expertise: [
            "Histopathological & Microscopic Evaluation",
            "Early Detection of Oral Cancer",
            "Oral Potentially Malignant Disorders (OPMDs)",
            "Salivary Gland & Maxillofacial Pathology"
        ],
        image: "drPal_nobg.png"
    },
    {
        name: "Dr. Amit Mathur",
        credentials: "Oral & Maxillofacial Radiologist",
        regNo: "Consultant Oral & Maxillofacial Radiologist · 16+ Years Experience",
        experience: "16+ Years of Clinical Experience in Advanced Maxillofacial Imaging",
        education: "Specialist in Oral & Maxillofacial Radiology",
        specialization: "CBCT Scan Interpretation, Digital Radiography & Maxillofacial Diagnostic Imaging",
        bio: "Dr. Amit Mathur is a highly experienced Oral and Maxillofacial Radiologist with over 16 years of expertise in advanced dental and maxillofacial imaging. He specializes in the interpretation of CBCT scans, digital radiography, and diagnostic imaging for accurate treatment planning in dentistry and maxillofacial care. Known for his precision, clinical excellence, and patient-centered approach, Dr. Mathur is committed to delivering reliable radiological diagnosis and supporting comprehensive dental treatment outcomes.",
        expertise: [
            "CBCT Scan Interpretation & 3D Imaging",
            "Digital Radiography & Diagnostic Imaging",
            "Maxillofacial Treatment Planning",
            "Radiological Diagnosis & Consultation"
        ],
        image: "drAmit_nobg.png"
    }

];
