import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import VideoModal from '../components/common/VideoModal';
import { courses } from '../data/mockData';
import { Star, Clock, BookOpen, Users, CheckCircle2, Play, Lock, ChevronDown, ChevronUp, Share2, Award, Globe } from 'lucide-react';

export default function CourseDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [videoOpen, setVideoOpen] = useState(false);
  const [expandedCurriculum, setExpandedCurriculum] = useState({ 0: true });

  const course = courses.find((c) => c.id === parseInt(id || '1')) || courses[0];

  const curriculumSections = [
    {
      title: "Module 1: Foundations & Core Principles",
      lecturesCount: 4,
      duration: "2 hours",
      lessons: [
        { title: "1.1 Introduction & Course Objectives", duration: "15 min", preview: true },
        { title: "1.2 Essential Vocabulary & Terminology", duration: "25 min", preview: true },
        { title: "1.3 Interactive Practice Quiz 1", duration: "30 min", preview: false },
        { title: "1.4 Practical Case Study Walkthrough", duration: "50 min", preview: false },
      ]
    },
    {
      title: "Module 2: Intermediate Techniques & Applied Scenarios",
      lecturesCount: 5,
      duration: "3.5 hours",
      lessons: [
        { title: "2.1 Step-by-Step Implementation", duration: "40 min", preview: false },
        { title: "2.2 Common Mistakes & Troubleshooting", duration: "35 min", preview: false },
        { title: "2.3 Real-World Project Assignment", duration: "60 min", preview: false },
        { title: "2.4 Instructor Feedback Breakdown", duration: "45 min", preview: false },
        { title: "2.5 Knowledge Check Quiz 2", duration: "30 min", preview: false },
      ]
    },
    {
      title: "Module 3: Advanced Mastery & Final Certification Project",
      lecturesCount: 4,
      duration: "3 hours",
      lessons: [
        { title: "3.1 Professional Best Practices", duration: "45 min", preview: false },
        { title: "3.2 Capstone Project Overview", duration: "60 min", preview: false },
        { title: "3.3 Portfolio Review & Optimization", duration: "45 min", preview: false },
        { title: "3.4 Final Exam & Certificate Issuance", duration: "30 min", preview: false },
      ]
    }
  ];

  const toggleCurriculum = (index) => {
    setExpandedCurriculum((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div>
      <PageHeader
        title={course.title}
        breadcrumbs={[
          { label: 'Courses', path: '/courses' },
          { label: 'Course Details' }
        ]}
      />

      <section className="py-16 bg-[#f8f9fc]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Main Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Course Top Highlights Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-theme-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <div className="flex items-center space-x-1 text-amber-500 text-sm">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold text-theme-navy">{course.rating}</span>
                    <span className="text-slate-400">({course.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{course.students} students enrolled</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-jost text-theme-navy mb-6">
                  {course.title}
                </h2>

                <div className="flex items-center space-x-4 border-t border-slate-100 pt-6">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-xs text-slate-400 block">Instructor</span>
                    <span className="text-sm sm:text-base font-bold font-jost text-theme-navy">
                      {course.instructor.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
                <div className="flex border-b border-slate-100 overflow-x-auto">
                  {['overview', 'curriculum', 'instructor'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 text-sm font-bold font-jost capitalize border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab
                          ? 'border-theme-primary text-theme-primary bg-slate-50/50'
                          : 'border-transparent text-slate-600 hover:text-theme-navy'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-6 sm:p-8">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold font-jost text-theme-navy mb-3">Course Description</h3>
                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                          {course.description || "This course delivers an immersive and comprehensive study program crafted by industry leaders. You will explore core concepts, hands-on scenarios, practical assignments, and interactive exercises to build true mastery."}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold font-jost text-theme-navy mb-4">What You Will Learn</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {[
                            "Master core linguistic & technical frameworks",
                            "Real-world problem solving methodologies",
                            "Conversational fluency & active listening",
                            "Live interactive project reviews & critiques",
                            "Accredited shareable certificate for LinkedIn",
                            "24/7 access to instructor Q&A community"
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
                              <span className="text-sm text-slate-600">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Curriculum Tab */}
                  {activeTab === 'curriculum' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-2">
                        <span>3 Modules • 13 Lectures • 8.5 Hours Total</span>
                      </div>

                      {curriculumSections.map((section, sIdx) => {
                        const isExpanded = expandedCurriculum[sIdx];
                        return (
                          <div key={sIdx} className="border border-slate-200 rounded-xl overflow-hidden">
                            <button
                              onClick={() => toggleCurriculum(sIdx)}
                              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
                            >
                              <div>
                                <h4 className="font-bold font-jost text-theme-navy text-sm sm:text-base">
                                  {section.title}
                                </h4>
                                <span className="text-xs text-slate-500">
                                  {section.lecturesCount} Lectures • {section.duration}
                                </span>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-slate-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-slate-500" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="p-4 space-y-3 bg-white divide-y divide-slate-100">
                                {section.lessons.map((lesson, lIdx) => (
                                  <div key={lIdx} className="flex items-center justify-between pt-3 first:pt-0 text-sm">
                                    <div className="flex items-center space-x-3">
                                      {lesson.preview ? (
                                        <Play className="w-4 h-4 text-theme-primary flex-shrink-0" />
                                      ) : (
                                        <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                      )}
                                      <span className="text-slate-700 font-medium">{lesson.title}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      {lesson.preview && (
                                        <button
                                          onClick={() => setVideoOpen(true)}
                                          className="text-xs font-semibold text-theme-primary hover:underline"
                                        >
                                          Preview
                                        </button>
                                      )}
                                      <span className="text-xs text-slate-400">{lesson.duration}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Instructor Tab */}
                  {activeTab === 'instructor' && (
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-24 h-24 rounded-2xl object-cover border border-slate-200"
                      />
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold font-jost text-theme-navy">
                          {course.instructor.name}
                        </h4>
                        <p className="text-sm text-theme-primary font-medium">
                          {course.instructor.role || "Certified Lead Tutor"}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          With over a decade of hands-on teaching experience, our instructors are passionate about breaking down advanced concepts into easy-to-master practical lessons.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Sidebar: Sticky Pricing & Enrollment Card (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden sticky top-24">
                {/* Course Video Preview */}
                <div className="relative aspect-video bg-slate-900 group cursor-pointer" onClick={() => setVideoOpen(true)}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-theme-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded">
                    Preview Course
                  </span>
                </div>

                {/* Price and CTA */}
                <div className="p-6 space-y-6">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl font-extrabold font-jost text-theme-navy">
                      ${course.price.toFixed(2)}
                    </span>
                    {course.originalPrice && (
                      <span className="text-base text-slate-400 line-through">
                        ${course.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-xs bg-theme-coral/10 text-theme-coral font-bold px-2 py-0.5 rounded">
                      50% OFF
                    </span>
                  </div>

                  <Link to="/contact" className="btn-primary w-full text-center py-3.5 rounded-lg shadow-md block">
                    Enroll Now & Start Learning
                  </Link>

                  <div className="border-t border-slate-100 pt-6 space-y-3.5 text-xs sm:text-sm">
                    <h5 className="font-bold font-jost text-theme-navy text-base">This course includes:</h5>
                    <div className="flex items-center space-x-3 text-slate-600">
                      <Clock className="w-4 h-4 text-theme-primary" />
                      <span>{course.duration || "14 Hours"} on-demand video</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-600">
                      <BookOpen className="w-4 h-4 text-theme-primary" />
                      <span>{course.lessons} downloadable learning modules</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-600">
                      <Award className="w-4 h-4 text-theme-primary" />
                      <span>Verifiable Certificate of Completion</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-600">
                      <Globe className="w-4 h-4 text-theme-primary" />
                      <span>100% Online & Self-Paced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1"
      />
    </div>
  );
}
