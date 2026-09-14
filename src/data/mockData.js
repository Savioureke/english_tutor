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
    title: "Training",
    path: "/courses",
    sublinks: [
      { title: "Teacher Training Modules", path: "/courses" },
      { title: "Methodology Details", path: "/course/1" },
    ]
  },
  {
    title: "Pages",
    path: "#",
    sublinks: [
      { title: "Top Earning Teachers", path: "/instructors" },
      { title: "Teacher Profile", path: "/instructor/1" },
      { title: "Monetization Plans", path: "/pricing" },
      { title: "FAQ Page", path: "/faq" },
    ]
  },
  {
    title: "Blog",
    path: "/blog",
    sublinks: [
      { title: "Teaching Guides", path: "/blog" },
      { title: "Article Details", path: "/blog/1" },
    ]
  },
  { title: "Contact", path: "/contact" },
];

export const statistics = [
  { count: "$35/hr+", label: "Avg. Teacher Rate", icon: "Users" },
  { count: "1,200+", label: "Trained English Coaches", icon: "GraduationCap" },
  { count: "100%", label: "Procedural Methodology", icon: "BookOpen" },
  { count: "98.7%", label: "Teacher Success Rate", icon: "Award" },
];

export const promoCards = [
  {
    id: 1,
    title: "PPP Teaching Methodology",
    description: "Master the Presentation–Practice–Production (PPP) framework to deliver structured 45-minute lesson plans that keep students engaged.",
    icon: "Lightbulb",
    bgClass: "bg-[#f4f7ff] text-[#525fe1]",
    accentBorder: "border-[#525fe1]/20",
  },
  {
    id: 2,
    title: "Task-Based & Natural Coaching",
    description: "Implement Task-Based Language Teaching (TBLT) and Natural Conversational Coaching to run high-value student speaking sessions.",
    icon: "Compass",
    bgClass: "bg-[#fff7f0] text-[#ffa41b]",
    accentBorder: "border-[#ffa41b]/20",
  },
  {
    id: 3,
    title: "Business & Accent Blueprints",
    description: "Deploy specialized blueprints for executive business coaching, interview prep, error correction without friction, and accent reduction.",
    icon: "Target",
    bgClass: "bg-[#f0fbf7] text-[#28a745]",
    accentBorder: "border-[#28a745]/20",
  }
];

export const courseCategories = ["All", "Teaching Frameworks", "Lesson Planning", "Monetization & Rates", "Client Acquisition", "Business Coaching"];

export const courses = [
  {
    id: 1,
    title: "The Complete English Teacher Blueprint: From Fluent Speaker to $50/hr Coach",
    category: "Teaching Frameworks",
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
      role: "Lead Methodology Trainer"
    },
    tag: "Core Framework",
    description: "Learn how to structure 45-minute lessons, manage teacher talk time, correct student errors without friction, and build a dependable client roster.",
    featured: true,
  },
  {
    id: 2,
    title: "PPP & TBLT Lesson Structuring Masterclass for 1-on-1 & Group Classes",
    category: "Lesson Planning",
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
      role: "Senior Methodology Specialist"
    },
    tag: "Lesson Planning",
    description: "Step-by-step procedures to plan 45-minute sessions, execute engaging practice activities, and evaluate student progress systematically.",
    featured: true,
  },
  {
    id: 3,
    title: "Monetization & Client Acquisition: Setting Rates ($20–$65+/hr) & Onboarding",
    category: "Monetization & Rates",
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
      role: "Teaching Business Coach"
    },
    tag: "Monetization",
    description: "Set up payment channels, onboard your first paying students, establish transparent hourly rates, and optimize your teacher profile for student inquiries.",
    featured: true,
  },
  {
    id: 4,
    title: "Error Correction & Conversational Coaching Without Student Friction",
    category: "Teaching Frameworks",
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
      role: "Phonetics & Feedback Mentor"
    },
    tag: "Coaching Skills",
    description: "Master delayed vs immediate error correction, tactful pronunciation guidance, and conversational prompts that encourage student output.",
    featured: true,
  },
  {
    id: 5,
    title: "Grammar Teaching Procedures: Clear Explanations & Target Drills",
    category: "Lesson Planning",
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
      role: "Linguistic Procedures Mentor"
    },
    tag: "Grammar Methods",
    description: "Teach grammar conceptually using timelines, elicitation techniques, and guided discovery rather than dry rule memorization.",
    featured: true,
  },
  {
    id: 6,
    title: "High-Ticket Business English & Executive Coaching Blueprint",
    category: "Business Coaching",
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
      role: "Executive English Mentor"
    },
    tag: "High-Ticket",
    description: "Equip yourself to train corporate executives in international business meetings, negotiations, and cross-cultural communication.",
    featured: true,
  }
];

export const instructors = [
  {
    id: 1,
    name: "Emma Watson",
    role: "Certified English Coach · ★ 4.9 · 142+ students",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    bio: "Trained on this platform. Specializes in conversational fluency procedures, PPP lesson plans, and British pronunciation drills.",
    coursesCount: 14,
    rating: 4.9,
    students: "142+",
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
    role: "Certified English Coach · ★ 5.0 · 210+ students",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    bio: "Trained on this platform. Expert in IELTS exam preparation frameworks, essay marking rubrics, and mock interview coaching.",
    coursesCount: 10,
    rating: 5.0,
    students: "210+",
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
    role: "Certified English Coach · ★ 4.9 · 120+ students",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    bio: "Trained on this platform. Mentors corporate professionals in executive presentation delivery, business emails, and negotiation.",
    coursesCount: 8,
    rating: 4.9,
    students: "120+",
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
    role: "Certified English Coach · ★ 4.8 · 160+ students",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    bio: "Trained on this platform. Delivers structured phonetics blueprints, rhythm drills, and friction-free error correction.",
    coursesCount: 12,
    rating: 4.8,
    students: "160+",
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
    name: "Marcus Vance",
    role: "Full-Time Remote English Coach (London)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    review: "I already spoke fluent English, but I had zero clue how to structure a lesson or find students. This platform taught me the PPP framework, how to onboard students, and within 3 weeks I was charging $45/hr with a full schedule!",
    rating: 5,
  },
  {
    id: 2,
    name: "Clara Johansson",
    role: "Independent IELTS Tutor (Stockholm)",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    review: "The procedure-based training is gold. Learning how to correct errors without discouraging students and structuring 45-minute lesson plans turned my natural English into a reliable $3,200/month remote income.",
    rating: 5,
  },
  {
    id: 3,
    name: "David O'Connor",
    role: "Executive Business English Coach (Dublin)",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    review: "Funding my account activated my listing and students started messaging me directly. The lead fee deduction model is completely transparent and paid for itself on my very first client session.",
    rating: 5,
  }
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Teacher Foundations",
    monthlyPrice: 29,
    yearlyPrice: 290,
    popular: false,
    description: "Complete methodology training for fluent speakers starting their teaching journey.",
    features: [
      "Access to Core Teacher Methodology Modules",
      "PPP & TBLT Lesson Plan Blueprints",
      "Error Correction Guide & Worksheets",
      "Teacher Training Certificate",
      "Weekly Teaching Tips & Strategies",
    ],
    unavailableFeatures: [
      "Homepage Teacher Advertising Listing",
      "Direct Student Messaging Channel",
      "Monetization Lead Fee System"
    ]
  },
  {
    id: "standard",
    name: "Monetization Pro",
    monthlyPrice: 59,
    yearlyPrice: 590,
    popular: true,
    description: "Full training plus profile activation to receive direct student booking inquiries.",
    features: [
      "Complete Teacher Training & Methodology Access",
      "Active Homepage Teacher Profile Listing",
      "Direct Student Lead Generation System",
      "Hourly Rate Calculator ($20–$65+/hr)",
      "Payment Channel Setup & Onboarding Kit",
      "Verified English Coach Badge"
    ],
    unavailableFeatures: [
      "1-on-1 Mentorship with Master Trainer"
    ]
  },
  {
    id: "executive",
    name: "Master Coach Accelerator",
    monthlyPrice: 119,
    yearlyPrice: 1150,
    popular: false,
    description: "Accelerated training with priority homepage placement and high-ticket business blueprints.",
    features: [
      "Unlimited Access to All Teaching Blueprints",
      "Priority Top-Earning Teacher Directory Placement",
      "High-Ticket Business English Coaching System",
      "Direct Mentorship with Lead Trainer",
      "Client Contract & Invoicing Templates",
      "Advanced Lead Optimization Strategy"
    ],
    unavailableFeatures: []
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "How to Structure a High-Impact 45-Minute English Lesson: Step-by-Step",
    date: "14 May, 2026",
    comments: 12,
    author: "Emma Watson",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&auto=format&fit=crop&q=80",
    excerpt: "Learn how to balance teacher talk time, presentation, guided practice, and independent production to deliver engaging 1-on-1 English sessions.",
    category: "Methodology"
  },
  {
    id: 2,
    title: "Setting Your Hourly Rates: How Remote English Tutors Earn $35–$65+/hr",
    date: "10 May, 2026",
    comments: 19,
    author: "James Miller",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&auto=format&fit=crop&q=80",
    excerpt: "Discover how positioning, specialized frameworks (IELTS, Business English), and professional onboarding allow teachers to command premium hourly fees.",
    category: "Monetization"
  },
  {
    id: 3,
    title: "Correcting Student Errors Without Friction: The Art of Delayed Feedback",
    date: "06 May, 2026",
    comments: 8,
    author: "Michael Davies",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&auto=format&fit=crop&q=80",
    excerpt: "Practical techniques for noting student grammar and pronunciation mistakes during conversational drills and addressing them tactfully at the end.",
    category: "Teaching Skills"
  }
];

export const faqs = [
  {
    question: "Do I need prior teaching experience to join?",
    answer: "No. You already speak English fluently. Our platform teaches you the step-by-step procedures, lesson structuring frameworks (PPP & TBLT), and student management techniques required to teach professionally."
  },
  {
    question: "How does the monetization and homepage listing work?",
    answer: "After completing your initial training, funding your account (minimum $10) unlocks the monetization module and activates your profile on the homepage so students can discover and message you directly."
  },
  {
    question: "How does the lead fee deduction work?",
    answer: "When your profile is live on the homepage, each direct student message deducts the platform lead fee from your funded balance. You set your own hourly rates ($20–$65+/hr) and keep 100% of the lesson fees you charge students."
  },
  {
    question: "What teaching methodologies will I learn?",
    answer: "You will master the Presentation–Practice–Production (PPP) model, Task-Based Language Teaching (TBLT), Natural Conversational Coaching, and blueprints for IELTS prep and Business English."
  },
  {
    question: "How much can I charge as a trained teacher?",
    answer: "Trained teachers on our platform typically charge between $20 to $65+ per hour, depending on their specialization (general conversational coaching, IELTS preparation, or executive business English)."
  },
  {
    question: "How do I set up my payment channel?",
    answer: "Inside your teacher workspace, you can configure your preferred payout channel (Stripe, PayPal, direct bank transfer) so students can pay you seamlessly for their scheduled sessions."
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

