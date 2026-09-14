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

export const demoUsers = {
  student: {
    id: "stu-101",
    name: "Alex Morgan",
    email: "student@engtutor.com",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    enrolledDate: "January 2026",
    level: "B2 Upper Intermediate",
    streakDays: 14,
    hoursLearned: 38.5,
    fluencyScore: "78%",
    targetExam: "IELTS Band 7.5+",
    primaryTutor: "Emma Watson",
  },
  teacher: {
    id: "tch-201",
    name: "Emma Watson",
    email: "teacher@engtutor.com",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    qualifications: "MA TESOL, Cambridge CELTA Certified",
    specialty: "British Pronunciation & IELTS Speaking",
    totalStudents: 142,
    hoursTaught: 320,
    rating: 4.98,
    activeCourses: 3,
  }
};

export const studentEnrolledCourses = [
  {
    id: 1,
    title: "Conversational English Fluency: Speak Naturally in 30 Days",
    instructor: "Emma Watson",
    instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&auto=format&fit=crop&q=80",
    progress: 72,
    totalLessons: 24,
    completedLessons: 17,
    lastLesson: "Lesson 18: Mastering Idiomatic Phrasal Verbs in Dialogue",
    category: "Conversational",
    nextLiveDate: "Tomorrow at 10:00 AM UTC",
    modules: [
      {
        title: "Module 1: Everyday Natural Phrasing",
        lessons: [
          { id: 101, title: "1.1 Breaking Free From Literal Translations", duration: "18 mins", completed: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 102, title: "1.2 Small Talk Mastery & Topic Starters", duration: "24 mins", completed: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 103, title: "1.3 Interactive Roleplay: Coffee Shop & Travel Scenarios", duration: "30 mins", completed: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ]
      },
      {
        title: "Module 2: Pronunciation, Rhythm & Connected Speech",
        lessons: [
          { id: 104, title: "2.1 The Magic of Linking Sounds & Elision", duration: "22 mins", completed: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 105, title: "2.2 Sentence Stress & Intonation Patterns", duration: "28 mins", completed: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 106, title: "2.3 Eliminating Accent Blockers (Th, R, L sounds)", duration: "35 mins", completed: false, isCurrent: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ]
      },
      {
        title: "Module 3: Advanced Idioms & Spontaneous Fluency",
        lessons: [
          { id: 107, title: "3.1 Top 50 Essential Idioms for Social Conversations", duration: "25 mins", completed: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 108, title: "3.2 Thinking in English Without Mental Translating", duration: "32 mins", completed: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ]
      }
    ]
  },
  {
    id: 2,
    title: "IELTS Academic Band 7.5+ Masterclass (Speaking & Writing)",
    instructor: "Michael Davies",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&auto=format&fit=crop&q=80",
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    lastLesson: "Lesson 15: IELTS Writing Task 2 - Structuring Agree/Disagree Essays",
    category: "Exam Prep",
    nextLiveDate: "Thursday at 2:00 PM UTC",
    modules: [
      {
        title: "Section 1: Speaking Band 8 Descriptors",
        lessons: [
          { id: 201, title: "1.1 Fluency & Coherence Scoring Criteria", duration: "20 mins", completed: true },
          { id: 202, title: "1.2 Lexical Resource: High Band Synonyms", duration: "25 mins", completed: true },
        ]
      },
      {
        title: "Section 2: Writing Task 1 & 2 Strategies",
        lessons: [
          { id: 203, title: "2.1 Describing Graphs & Charts accurately", duration: "30 mins", completed: true },
          { id: 204, title: "2.2 Structuring Cohesive Academic Paragraphs", duration: "35 mins", completed: false, isCurrent: true },
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Executive Business English: Presentations, Meetings & Negotiation",
    instructor: "Sophia Rodriguez",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&auto=format&fit=crop&q=80",
    progress: 20,
    totalLessons: 20,
    completedLessons: 4,
    lastLesson: "Lesson 5: Leading Cross-Cultural Business Meetings",
    category: "Business English",
    nextLiveDate: "Friday at 4:30 PM UTC",
  }
];

export const upcomingLiveSessions = [
  {
    id: "live-1",
    title: "1-on-1 Accent Reduction & Speaking Drill",
    tutor: "Emma Watson",
    tutorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    date: "Tomorrow, Sep 15",
    time: "10:00 AM - 10:45 AM (UTC)",
    status: "Confirmed",
    roomLink: "https://meet.engtutor.com/room/live-emma-alex",
    topic: "Mastering the British /th/ & /r/ sounds in rapid speech",
  },
  {
    id: "live-2",
    title: "IELTS Speaking Part 2 & 3 Mock Simulation",
    tutor: "Michael Davies",
    tutorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    date: "Thursday, Sep 17",
    time: "02:00 PM - 02:45 PM (UTC)",
    status: "Confirmed",
    roomLink: "https://meet.engtutor.com/room/live-michael-alex",
    topic: "Simulated Examiner Interview & Instant Band Feedback",
  },
  {
    id: "live-3",
    title: "Business Pitch & Presentation Q&A Practice",
    tutor: "Sophia Rodriguez",
    tutorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    date: "Friday, Sep 18",
    time: "04:30 PM - 05:15 PM (UTC)",
    status: "Upcoming",
    roomLink: "https://meet.engtutor.com/room/live-sophia-alex",
    topic: "Persuasive Phrasing for Stakeholder Pitches",
  }
];

export const studentAssignments = [
  {
    id: "asg-1",
    title: "IELTS Task 2: Artificial Intelligence & Future of Education",
    course: "IELTS Academic Band 7.5+ Masterclass",
    dueDate: "Sep 18, 2026",
    status: "Graded",
    score: "Band 7.5",
    feedback: "Outstanding cohesion and topic-specific vocabulary! Work on reducing minor comma splices in complex conditionals.",
    submissionDate: "Sep 12, 2026",
    criteria: [
      { name: "Task Achievement", score: "8.0" },
      { name: "Coherence & Cohesion", score: "7.5" },
      { name: "Lexical Resource", score: "8.0" },
      { name: "Grammatical Accuracy", score: "7.0" },
    ]
  },
  {
    id: "asg-2",
    title: "Voice Audio Task: 2-Minute Spontaneous Opinion on Remote Work",
    course: "Conversational English Fluency",
    dueDate: "Sep 16, 2026",
    status: "Submitted",
    score: "Pending Review",
    feedback: "Tutor Emma Watson is evaluating your audio pronunciation.",
    submissionDate: "Sep 14, 2026",
  },
  {
    id: "asg-3",
    title: "Business Email Rewrite: Resolving Client Conflict with Tact",
    course: "Executive Business English",
    dueDate: "Sep 22, 2026",
    status: "Pending",
    score: "--",
    feedback: "Not yet submitted. Word count: 180 - 250 words.",
    submissionDate: "--",
  }
];

export const vocabularyCards = [
  {
    id: 1,
    word: "Articulate",
    phonetic: "/ɑːrˈtɪk.jə.lət/",
    partOfSpeech: "adjective / verb",
    definition: "Able to express thoughts and ideas clearly and effectively in speech or writing.",
    example: "She gave an articulate and persuasive speech at the global conference.",
    level: "C1 Advanced",
    audioSample: "articulate",
  },
  {
    id: 2,
    word: "Concur",
    phonetic: "/kənˈkɜːr/",
    partOfSpeech: "verb",
    definition: "To agree with someone or have the same opinion.",
    example: "I concur with your assessment that we need more practice with connected speech.",
    level: "B2 Upper-Intermediate",
    audioSample: "concur",
  },
  {
    id: 3,
    word: "Meticulous",
    phonetic: "/məˈtɪk.jə.ləs/",
    partOfSpeech: "adjective",
    definition: "Showing great attention to detail; very careful and precise.",
    example: "His meticulous essay drafting resulted in a Band 8.5 score.",
    level: "C1 Advanced",
    audioSample: "meticulous",
  },
  {
    id: 4,
    word: "Pragmatic",
    phonetic: "/præɡˈmæt.ɪk/",
    partOfSpeech: "adjective",
    definition: "Dealing with things sensibly and realistically based on practical rather than theoretical considerations.",
    example: "Taking 15 minutes of daily conversational drills is a pragmatic approach to fluency.",
    level: "B2 Upper-Intermediate",
    audioSample: "pragmatic",
  }
];

export const studentCertificates = [
  {
    id: "cert-101",
    title: "Certificate of English Fluency (CEFR B2 Level)",
    issuedBy: "ENGtutor International Language Academy",
    date: "August 2026",
    grade: "Distinction (94%)",
    credentialId: "ENG-B2-2026-98144",
    tutor: "Emma Watson, Lead Tutor",
  },
  {
    id: "cert-102",
    title: "IELTS Intensive Speaking Preparation Certificate",
    issuedBy: "ENGtutor Exam Board",
    date: "July 2026",
    grade: "Band 7.5 Predicted",
    credentialId: "ENG-IELTS-2026-47201",
    tutor: "Michael Davies, Senior Examiner",
  }
];

// TEACHER LMS DATA
export const teacherRoster = [
  {
    id: "stu-101",
    name: "Alex Morgan",
    email: "student@engtutor.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    course: "Conversational English Fluency",
    level: "B2 Upper Intermediate",
    progress: 72,
    attendance: "96%",
    nextSession: "Tomorrow, 10:00 AM",
    lastFeedback: "Excellent tone control; needs work on /th/ sound.",
    status: "Active",
  },
  {
    id: "stu-102",
    name: "David Kim",
    email: "david.k@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    course: "IELTS Academic Band 7.5+ Masterclass",
    level: "B2 Intermediate",
    progress: 58,
    attendance: "88%",
    nextSession: "Wednesday, 3:00 PM",
    lastFeedback: "Task 1 paragraph structure improved drastically.",
    status: "Active",
  },
  {
    id: "stu-103",
    name: "Elena Rostova",
    email: "elena.r@outlook.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    course: "Conversational English Fluency",
    level: "C1 Advanced",
    progress: 90,
    attendance: "100%",
    nextSession: "Friday, 11:30 AM",
    lastFeedback: "Near-native idiomatic expression in dialogues.",
    status: "Active",
  },
  {
    id: "stu-104",
    name: "Carlos Mendez",
    email: "carlos.m@yahoo.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    course: "Executive Business English",
    level: "B1 Intermediate",
    progress: 35,
    attendance: "80%",
    nextSession: "Next Monday, 2:00 PM",
    lastFeedback: "Practicing polite email openers and email closures.",
    status: "Needs Support",
  }
];

export const teacherSubmissionsToGrade = [
  {
    id: "sub-1",
    studentName: "Alex Morgan",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    title: "Spontaneous Speaking Audio Clip: Tech in Daily Life",
    course: "Conversational English Fluency",
    submittedTime: "2 hours ago",
    type: "Audio Recording (2m 14s)",
    status: "Awaiting Feedback",
    currentGrade: null,
  },
  {
    id: "sub-2",
    studentName: "David Kim",
    studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    title: "IELTS Writing Task 1: Renewable Energy Bar Graph",
    course: "IELTS Academic Band 7.5+ Masterclass",
    submittedTime: "5 hours ago",
    type: "Essay (190 words)",
    status: "Awaiting Feedback",
    currentGrade: null,
  },
  {
    id: "sub-3",
    studentName: "Carlos Mendez",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    title: "Business Email: Resolving Delivery Delay",
    course: "Executive Business English",
    submittedTime: "1 day ago",
    type: "Writing (210 words)",
    status: "Graded",
    currentGrade: "92/100 (A)",
  }
];

export const teacherTodaySchedule = [
  {
    id: "sch-1",
    time: "10:00 AM - 10:45 AM",
    student: "Alex Morgan",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    topic: "Accent Reduction: /th/ & /r/ Sounds Drill",
    type: "1-on-1 Video Session",
    status: "Ready",
  },
  {
    id: "sch-2",
    time: "02:00 PM - 02:45 PM",
    student: "David Kim",
    studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    topic: "IELTS Mock Speaking Evaluation (Parts 1-3)",
    type: "Examiner Simulation",
    status: "Upcoming",
  },
  {
    id: "sch-3",
    time: "04:30 PM - 05:30 PM",
    student: "Group Batch (8 Students)",
    studentAvatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&auto=format&fit=crop&q=80",
    topic: "Live Group Workshop: British Idioms & Slang",
    type: "Group Live Webinar",
    status: "Upcoming",
  }
];

