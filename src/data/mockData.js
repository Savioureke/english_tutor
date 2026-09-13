export const navLinks = [
  {
    title: "Home",
    path: "/",
    sublinks: [
      { title: "Home 01", path: "/" },
      { title: "Home 02", path: "/home-2" },
    ]
  },
  { title: "About", path: "/about" },
  {
    title: "Course",
    path: "/courses",
    sublinks: [
      { title: "English Courses", path: "/courses" },
      { title: "Course Details", path: "/course/1" },
    ]
  },
  {
    title: "Pages",
    path: "#",
    sublinks: [
      { title: "English Tutors", path: "/instructors" },
      { title: "Tutor Details", path: "/instructor/1" },
      { title: "Pricing Plan", path: "/pricing" },
      { title: "FAQ Page", path: "/faq" },
      { title: "404 Page", path: "/404" },
    ]
  },
  {
    title: "Blog",
    path: "/blog",
    sublinks: [
      { title: "English Blog", path: "/blog" },
      { title: "Article Details", path: "/blog/1" },
    ]
  },
  { title: "Contact", path: "/contact" },
];

export const statistics = [
  { count: "35K+", label: "Fluent Graduates", icon: "Users" },
  { count: "65+", label: "Native English Tutors", icon: "GraduationCap" },
  { count: "120+", label: "English Video Modules", icon: "BookOpen" },
  { count: "99.4%", label: "Student Success Rate", icon: "Award" },
];

export const promoCards = [
  {
    id: 1,
    title: "Conversational Practice",
    description: "Immersive 1-on-1 speaking sessions with native tutors to build spontaneous confidence and vocabulary.",
    icon: "Lightbulb",
    bgClass: "bg-[#f4f7ff] text-[#525fe1]",
    accentBorder: "border-[#525fe1]/20",
  },
  {
    id: 2,
    title: "IELTS & TOEFL Prep",
    description: "Targeted strategies, mock speaking interviews, and essay evaluations to achieve your target band score.",
    icon: "Compass",
    bgClass: "bg-[#fff7f0] text-[#ffa41b]",
    accentBorder: "border-[#ffa41b]/20",
  },
  {
    id: 3,
    title: "Business English",
    description: "Executive presentation coaching, email writing etiquette, and professional cross-cultural communication.",
    icon: "Target",
    bgClass: "bg-[#f0fbf7] text-[#28a745]",
    accentBorder: "border-[#28a745]/20",
  }
];

export const courseCategories = ["All", "Conversational", "Business English", "Exam Prep", "Pronunciation", "Grammar"];

export const courses = [
  {
    id: 1,
    title: "Conversational English Fluency: Speak Naturally in 30 Days",
    category: "Conversational",
    price: 49.00,
    originalPrice: 99.00,
    rating: 4.9,
    reviewsCount: 128,
    students: 450,
    lessons: 24,
    duration: "18 Hours",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&auto=format&fit=crop&q=80",
    instructor: {
      name: "Emma Watson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      role: "British English Specialist"
    },
    tag: "Speaking",
    description: "Overcome fear of speaking, master everyday conversational idioms, and develop spontaneous fluency with live interactive dialogues and native audio breakdowns.",
    featured: true,
  },
  {
    id: 2,
    title: "IELTS Academic & General: Complete Band 8+ Masterclass",
    category: "Exam Prep",
    price: 59.00,
    originalPrice: 119.00,
    rating: 5.0,
    reviewsCount: 210,
    students: 620,
    lessons: 32,
    duration: "26 Hours",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&auto=format&fit=crop&q=80",
    instructor: {
      name: "James Miller",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      role: "Certified IELTS Examiner"
    },
    tag: "IELTS",
    description: "Step-by-step preparation for all four IELTS modules (Speaking, Writing Task 1 & 2, Reading, and Listening) with official sample answers and marking criteria.",
    featured: true,
  },
  {
    id: 3,
    title: "Business English & Executive Presentation Coaching",
    category: "Business English",
    price: 69.00,
    originalPrice: 139.00,
    rating: 4.9,
    reviewsCount: 94,
    students: 310,
    lessons: 20,
    duration: "16 Hours",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&auto=format&fit=crop&q=80",
    instructor: {
      name: "Michael Davies",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "Corporate English Coach"
    },
    tag: "Business",
    description: "Designed for international managers and professionals. Learn high-impact negotiation vocabulary, professional email phrasing, and confident pitching techniques.",
    featured: true,
  },
  {
    id: 4,
    title: "English Pronunciation & Accent Reduction Intensive",
    category: "Pronunciation",
    price: 39.00,
    originalPrice: 79.00,
    rating: 4.8,
    reviewsCount: 86,
    students: 280,
    lessons: 18,
    duration: "14 Hours",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&auto=format&fit=crop&q=80",
    instructor: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      role: "Phonetics & Accent Coach"
    },
    tag: "Accent",
    description: "Master English vowel sounds, connected speech, intonation curves, syllable stress, and eliminate common pronunciation hurdles.",
    featured: true,
  },
  {
    id: 5,
    title: "Complete English Grammar: From Zero to Advanced Mastery",
    category: "Grammar",
    price: 34.00,
    originalPrice: 69.00,
    rating: 4.9,
    reviewsCount: 142,
    students: 510,
    lessons: 30,
    duration: "22 Hours",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&auto=format&fit=crop&q=80",
    instructor: {
      name: "David Brooks",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      role: "Grammar & Linguistics Tutor"
    },
    tag: "Grammar",
    description: "Demystify complex English tenses, conditional sentences, passive voice, phrasal verbs, and prepositions with straightforward explanations and practical drills.",
    featured: true,
  },
  {
    id: 6,
    title: "TOEFL iBT Score Booster: High Scoring Strategies",
    category: "Exam Prep",
    price: 54.00,
    originalPrice: 109.00,
    rating: 4.9,
    reviewsCount: 78,
    students: 220,
    lessons: 22,
    duration: "18 Hours",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=700&auto=format&fit=crop&q=80",
    instructor: {
      name: "Sophia Taylor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      role: "TOEFL Prep Coach"
    },
    tag: "TOEFL",
    description: "Proven tactics for academic listening note-taking, speed reading comprehension, integrated speaking responses, and high-scoring independent essays.",
    featured: true,
  }
];

export const instructors = [
  {
    id: 1,
    name: "Emma Watson",
    role: "Senior British English Tutor",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    bio: "Emma is an Oxford-certified ESL educator with over 10 years of experience teaching conversational English, RP British pronunciation, and literature to global students.",
    coursesCount: 14,
    rating: 4.9,
    students: "18k+",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: 2,
    name: "James Miller",
    role: "Certified IELTS Examiner & Coach",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    bio: "James is a former British Council test examiner with 12+ years of coaching thousands of students to score Band 8.0 and above on the IELTS Academic test.",
    coursesCount: 10,
    rating: 5.0,
    students: "24k+",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: 3,
    name: "Michael Davies",
    role: "Corporate Business English Coach",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    bio: "Michael coaches senior executives and international professionals in cross-cultural corporate negotiation, diplomatic phrasing, and boardroom presentation.",
    coursesCount: 8,
    rating: 4.9,
    students: "12k+",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Pronunciation & Accent Specialist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    bio: "Sarah holds a Master's degree in Applied Linguistics and specializes in phonetic articulation, rhythm, and reducing accents for non-native English speakers.",
    coursesCount: 12,
    rating: 4.8,
    students: "16k+",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Elena Gomez",
    role: "Senior Product Manager (Madrid)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    review: "ENGtutor transformed my spoken English! In just 3 months of 1-on-1 speaking sessions with Emma, I went from hesitating in team meetings to leading international product demos with full confidence.",
    rating: 5,
  },
  {
    id: 2,
    name: "Kenji Tanaka",
    role: "Postgraduate Scholar (Tokyo)",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    review: "I needed a minimum IELTS score of 7.5 for my university admission in the UK. James's speaking feedback and writing frameworks helped me score an incredible 8.5 on my first attempt!",
    rating: 5,
  },
  {
    id: 3,
    name: "Amira Al-Mansoor",
    role: "Management Consultant (Dubai)",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    review: "The Business English coaching was exactly what I needed. Learning executive presentation techniques and negotiation vocabulary allowed me to secure a promotion at a global consulting firm.",
    rating: 5,
  }
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter Tutoring",
    monthlyPrice: 29,
    yearlyPrice: 290,
    popular: false,
    description: "Ideal for self-paced learners building grammar and vocabulary foundations.",
    features: [
      "Access to 40+ Core English Video Courses",
      "Interactive Grammar Quizzes & Worksheets",
      "Digital Certificate of Completion",
      "Mobile & Tablet App Access",
      "Weekly English Vocabulary Newsletter",
    ],
    unavailableFeatures: [
      "Live 1-on-1 Native Speaking Sessions",
      "IELTS / TOEFL Essay Grading",
      "Personalized Accent Correction"
    ]
  },
  {
    id: "standard",
    name: "Fluency Pro",
    monthlyPrice: 59,
    yearlyPrice: 590,
    popular: true,
    description: "Our most popular plan for rapid conversational fluency & exam success.",
    features: [
      "Access to All 120+ English Courses",
      "4 Live 1-on-1 Tutor Sessions / Month",
      "Monthly IELTS / TOEFL Mock Speaking Test",
      "Detailed Pronunciation & Accent Feedback",
      "Unlimited Essay & Writing Corrections",
      "Verifiable CEFR Certificate for LinkedIn"
    ],
    unavailableFeatures: [
      "Executive 1-on-1 Daily WhatsApp Coaching"
    ]
  },
  {
    id: "executive",
    name: "Executive Immersion",
    monthlyPrice: 119,
    yearlyPrice: 1150,
    popular: false,
    description: "Intensive 1-on-1 mentorship for executives, doctors, and exam takers.",
    features: [
      "Unlimited All-Access Course Library",
      "12 Live 1-on-1 Native Tutor Sessions / Month",
      "Direct WhatsApp Messaging with Lead Tutor",
      "Bespoke Business English & Interview Prep",
      "Comprehensive Accent Diagnostic & Plan",
      "Job Interview & Resume English Polish"
    ],
    unavailableFeatures: []
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "10 Daily Habits for Rapid Conversational English Fluency in 2026",
    date: "14 May, 2026",
    comments: 12,
    author: "Emma Watson",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&auto=format&fit=crop&q=80",
    excerpt: "Discover the psychological and linguistic micro-habits that help non-native speakers overcome speech hesitation and think directly in English.",
    category: "Fluency Tips"
  },
  {
    id: 2,
    title: "How to Score Band 8.0+ on IELTS Speaking: Examiner Secrets",
    date: "10 May, 2026",
    comments: 19,
    author: "James Miller",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&auto=format&fit=crop&q=80",
    excerpt: "Learn what IELTS examiners actually look for in lexical resource, grammatical accuracy, fluency, and pronunciation during the Part 2 and 3 interviews.",
    category: "Exam Prep"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Business English Email Etiquette & Phrasing",
    date: "06 May, 2026",
    comments: 8,
    author: "Michael Davies",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&auto=format&fit=crop&q=80",
    excerpt: "Polite expressions, diplomatic phrasing, and professional templates for communicating effectively with international clients and managers.",
    category: "Business English"
  }
];

export const faqs = [
  {
    question: "How do the 1-on-1 English tutoring sessions work?",
    answer: "Once enrolled, you can book live 1-on-1 video sessions with your chosen native tutor at any time that fits your schedule. Sessions focus on conversational dialogues, exam speaking practice, accent correction, or business presentations."
  },
  {
    question: "Are your English tutors certified native speakers?",
    answer: "Yes! 100% of our tutors are certified native English speakers holding accredited qualifications (CELTA, TEFL, TESOL) or university degrees in English linguistics."
  },
  {
    question: "How do I know my current English level?",
    answer: "After signing up, you can take our free 15-minute CEFR English placement test, which assesses your reading, listening, vocabulary, and grammar to place you in the optimal course level."
  },
  {
    question: "Can I prepare for IELTS, TOEFL, or Cambridge exams?",
    answer: "Absolutely. We offer dedicated exam prep masterclasses and 1-on-1 mock interviews designed by certified former examiners to help you achieve Band 7.5 - 9.0 in IELTS or 100+ in TOEFL."
  },
  {
    question: "Are the course completion certificates recognized internationally?",
    answer: "Yes, every course comes with a verifiable digital certificate linked to the Common European Framework of Reference for Languages (CEFR A1 - C2), perfect for LinkedIn and resumes."
  },
  {
    question: "What is your refund policy if I am not satisfied?",
    answer: "We offer a 30-day money-back guarantee on all our course plans. If you are not completely happy with your learning progress, simply contact us for a full refund."
  }
];

export const partnerLogos = [
  "/assets/img/clients/1.png",
  "/assets/img/clients/2.png",
  "/assets/img/clients/3.png",
  "/assets/img/clients/4.png",
  "/assets/img/clients/5.png",
  "/assets/img/clients/6.png",
];
