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
      { title: "Courses", path: "/courses" },
      { title: "Course Details", path: "/course/1" },
    ]
  },
  {
    title: "Pages",
    path: "#",
    sublinks: [
      { title: "Instructor", path: "/instructors" },
      { title: "Instructor Details", path: "/instructor/1" },
      { title: "Pricing Plan", path: "/pricing" },
      { title: "FAQ Page", path: "/faq" },
      { title: "404 Page", path: "/404" },
    ]
  },
  {
    title: "Blog",
    path: "/blog",
    sublinks: [
      { title: "Blog", path: "/blog" },
      { title: "Blog Details", path: "/blog/1" },
    ]
  },
  { title: "Contact", path: "/contact" },
];

export const statistics = [
  { count: "45K+", label: "Active Students", icon: "Users" },
  { count: "89+", label: "Best Instructors", icon: "GraduationCap" },
  { count: "150+", label: "Online Courses", icon: "BookOpen" },
  { count: "100%", label: "Satisfaction Rate", icon: "Award" },
];

export const promoCards = [
  {
    id: 1,
    title: "Creative Thinking",
    description: "Learn how to think creatively and apply innovative problem-solving in modern industries.",
    icon: "Lightbulb",
    bgClass: "bg-[#f4f7ff] text-[#525fe1]",
    accentBorder: "border-[#525fe1]/20",
  },
  {
    id: 2,
    title: "Career Path",
    description: "Guided pathways crafted by top industry specialists to help you land your dream tech job.",
    icon: "Compass",
    bgClass: "bg-[#fff7f0] text-[#ffa41b]",
    accentBorder: "border-[#ffa41b]/20",
  },
  {
    id: 3,
    title: "Practical Training",
    description: "Hands-on projects and interactive exercises for real-world mastery and portfolio building.",
    icon: "Target",
    bgClass: "bg-[#f0fbf7] text-[#28a745]",
    accentBorder: "border-[#28a745]/20",
  }
];

export const courseCategories = ["All", "Web Design", "Development", "Business", "Marketing"];

export const courses = [
  {
    id: 1,
    title: "Financial Security Thinking and Principles Fundamentals",
    category: "Business",
    price: 49.00,
    originalPrice: 99.00,
    rating: 4.8,
    reviewsCount: 24,
    students: 120,
    lessons: 16,
    duration: "12 Hours",
    image: "/assets/img/course1.png",
    instructor: {
      name: "Jonathon Doe",
      avatar: "/assets/img/team1.png",
      role: "Finance Expert"
    },
    tag: "Finance",
    description: "Master the fundamental principles of financial security, capital allocation, risk management, and long-term wealth protection with industry-proven frameworks.",
    featured: true,
  },
  {
    id: 2,
    title: "Complete Python Bootcamp From Zero to Hero in Python",
    category: "Development",
    price: 39.00,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 38,
    students: 230,
    lessons: 22,
    duration: "18 Hours",
    image: "/assets/img/course2.png",
    instructor: {
      name: "Alanna Mary",
      avatar: "/assets/img/team2.png",
      role: "Senior Software Engineer"
    },
    tag: "Python",
    featured: true,
  },
  {
    id: 3,
    title: "Modern UI/UX Design System with Figma & Prototyping",
    category: "Web Design",
    price: 59.00,
    originalPrice: 120.00,
    rating: 5.0,
    reviewsCount: 45,
    students: 310,
    lessons: 18,
    duration: "14 Hours",
    image: "/assets/img/course3.png",
    instructor: {
      name: "David Smith",
      avatar: "/assets/img/team3.png",
      role: "Lead Product Designer"
    },
    tag: "UI/UX",
    featured: true,
  },
  {
    id: 4,
    title: "Digital Marketing Mastery 2026: Grow Your Brand Online",
    category: "Marketing",
    price: 29.00,
    originalPrice: 69.00,
    rating: 4.7,
    reviewsCount: 19,
    students: 95,
    lessons: 14,
    duration: "10 Hours",
    image: "/assets/img/course4.png",
    instructor: {
      name: "Sophia Taylor",
      avatar: "/assets/img/team4.png",
      role: "Growth Marketer"
    },
    tag: "Marketing",
    featured: true,
  },
  {
    id: 5,
    title: "React & Next.js Full Stack Web App Development",
    category: "Development",
    price: 69.00,
    originalPrice: 139.00,
    rating: 4.9,
    reviewsCount: 52,
    students: 420,
    lessons: 28,
    duration: "24 Hours",
    image: "/assets/img/course5.png",
    instructor: {
      name: "Jonathon Doe",
      avatar: "/assets/img/team1.png",
      role: "Fullstack Architect"
    },
    tag: "React",
    featured: true,
  },
  {
    id: 6,
    title: "Business Communication & Public Speaking for Leaders",
    category: "Business",
    price: 34.00,
    originalPrice: 79.00,
    rating: 4.6,
    reviewsCount: 15,
    students: 80,
    lessons: 10,
    duration: "8 Hours",
    image: "/assets/img/course6.png",
    instructor: {
      name: "Alanna Mary",
      avatar: "/assets/img/team2.png",
      role: "Communication Coach"
    },
    tag: "Leadership",
    featured: true,
  }
];

export const instructors = [
  {
    id: 1,
    name: "Jonathon Doe",
    role: "Senior Instructor",
    image: "/assets/img/team1.png",
    bio: "Jonathon has over 12 years of experience teaching computer science and business analytics to thousands of global learners.",
    coursesCount: 12,
    rating: 4.9,
    students: "15k+",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: 2,
    name: "Alanna Mary",
    role: "Software Specialist",
    image: "/assets/img/team2.png",
    bio: "Alanna is a full-stack engineer and educator passionate about simplifying complex algorithms for beginning students.",
    coursesCount: 8,
    rating: 4.8,
    students: "11k+",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: 3,
    name: "David Smith",
    role: "Lead UI/UX Designer",
    image: "/assets/img/team3.png",
    bio: "David has designed award-winning digital experiences for Fortune 500 startups and mentors aspiring digital designers.",
    coursesCount: 15,
    rating: 5.0,
    students: "22k+",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: 4,
    name: "Sophia Taylor",
    role: "Marketing Director",
    image: "/assets/img/team4.png",
    bio: "Sophia specializes in data-driven growth marketing, content strategy, and social media brand development.",
    coursesCount: 9,
    rating: 4.7,
    students: "9k+",
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
    name: "Sarah Jenkins",
    role: "Product Designer at Acme",
    avatar: "/assets/img/quote.png",
    review: "Eduleb completely transformed my career trajectory! The instructors are world-class and the structured hands-on projects allowed me to secure my first senior tech role within months.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Software Developer",
    avatar: "/assets/img/quote.png",
    review: "The curriculum is super intuitive, highly up-to-date with 2026 standards, and the community support is unparalleled. I recommend Eduleb to anyone serious about learning.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Marketing Specialist",
    avatar: "/assets/img/quote.png",
    review: "The bite-sized video lessons and interactive exercises fit perfectly around my busy schedule. High quality learning at a fraction of university costs!",
    rating: 5,
  }
];

export const pricingPlans = [
  {
    id: "basic",
    name: "Basic Plan",
    monthlyPrice: 19,
    yearlyPrice: 190,
    popular: false,
    description: "Great for individual students starting their journey.",
    features: [
      "Access to 50+ Starter Courses",
      "Standard Community Support",
      "Course Completion Certificates",
      "Mobile & Tablet App Access",
      "Standard Video Resolution",
    ],
    unavailableFeatures: [
      "1-on-1 Mentor Guidance",
      "Downloadable Source Codes",
      "Live Q&A Sessions"
    ]
  },
  {
    id: "standard",
    name: "Standard Plan",
    monthlyPrice: 49,
    yearlyPrice: 480,
    popular: true,
    description: "The most popular plan for fast-track career builders.",
    features: [
      "Access to All 150+ Courses",
      "Priority 24/7 Support",
      "Verified Certificate of Completion",
      "Full Offline Video Downloads",
      "1-on-1 Monthly Mentor Review",
      "Downloadable Source Files"
    ],
    unavailableFeatures: [
      "Dedicated Career Placement Coach"
    ]
  },
  {
    id: "premium",
    name: "Enterprise Plan",
    monthlyPrice: 99,
    yearlyPrice: 950,
    popular: false,
    description: "Comprehensive corporate training and elite mentoring.",
    features: [
      "Unlimited All-Access Course Pass",
      "Weekly 1-on-1 Coaching Calls",
      "Direct Line to Lead Instructors",
      "Exclusive Masterclasses & Workshops",
      "Job Placement & Resume Optimization",
      "Custom Learning Paths & Team Analytics"
    ],
    unavailableFeatures: []
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "10 Essential Techniques for Rapid English Speaking Fluency",
    date: "14 May, 2026",
    comments: 5,
    author: "Jonathon Doe",
    image: "/assets/img/blog1.png",
    excerpt: "Discover the psychological and linguistic strategies that accelerate conversational English mastery without tedious memorization.",
    category: "Learning Tips"
  },
  {
    id: 2,
    title: "How Online Micro-Credentials are Revolutionizing Modern Careers",
    date: "10 May, 2026",
    comments: 8,
    author: "Alanna Mary",
    image: "/assets/img/blog2.png",
    excerpt: "Explore how targeted skill badges and project portfolios are beating traditional degrees in today's remote hiring landscape.",
    category: "Career"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Effective Self-Paced Remote Learning",
    date: "06 May, 2026",
    comments: 3,
    author: "David Smith",
    image: "/assets/img/blog3.png",
    excerpt: "Proven time-management routines, cognitive memory techniques, and distraction blockers for high-impact study sessions.",
    category: "Productivity"
  }
];

export const faqs = [
  {
    question: "How do I enroll in a course on Eduleb?",
    answer: "Enrolling is simple! Browse our course catalog, choose your desired course, click 'Enroll Now', and follow the quick checkout process. You'll gain instant, lifetime access to all learning materials and updates."
  },
  {
    question: "Are the course certificates officially recognized?",
    answer: "Yes, every completed course includes a verifiable digital certificate that you can showcase on your LinkedIn profile, portfolio, and resume."
  },
  {
    question: "Can I learn on mobile or tablet devices?",
    answer: "Absolutely! Our platform is 100% responsive and optimized for smartphones, tablets, laptops, and desktop computers with seamless progress sync."
  },
  {
    question: "What is the refund policy if I am not satisfied?",
    answer: "We offer a 30-day money-back guarantee on all courses. If you're not completely satisfied with your learning experience, simply reach out to support for a full refund."
  },
  {
    question: "Do courses come with mentorship and code reviews?",
    answer: "Yes, our Standard and Enterprise plans, as well as selected professional bootcamps, include active instructor feedback, project reviews, and live Q&A sessions."
  },
  {
    question: "Can I download course videos for offline study?",
    answer: "Yes, students on our Standard and Premium plans can download video lectures and course resources directly for offline viewing."
  }
];

export const partnerLogos = [
  "/assets/img/client1.png",
  "/assets/img/client2.png",
  "/assets/img/client3.png",
  "/assets/img/client4.png",
  "/assets/img/client5.png",
  "/assets/img/client6.png",
];
