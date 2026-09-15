import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CourseCard from '../components/common/CourseCard';
import { usePortal } from '../context/PortalContext';
import { instructors, courses } from '../data/mockData';
import { Star, BookOpen, Users, Facebook, Twitter, Linkedin, MessageSquare, ArrowRight } from 'lucide-react';

export default function InstructorDetails() {
  const { id } = useParams();
  const { liveTeachers, enrollment, setInquiryModalTeacher } = usePortal();

  // Find in Supabase enrollment or fallback to mock directory
  const dbTeacher = (enrollment || []).find((u) => String(u.id) === String(id));
  const mockTeacher = instructors.find((ins) => String(ins.id) === String(id)) || instructors[0];

  const instructor = dbTeacher
    ? {
        id: dbTeacher.id,
        name: dbTeacher.full_name,
        role: `Certified Native Coach · $${dbTeacher.hourly_rate || 25}/hr`,
        image: dbTeacher.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
        bio: dbTeacher.qualifications || 'Trained English coach specializing in conversational fluency, PPP lesson plans, and British & American pronunciation.',
        coursesCount: 5,
        rating: dbTeacher.rating || 5.0,
        students: `${dbTeacher.total_students || 0}+`,
        hourly_rate: dbTeacher.hourly_rate || 25.00,
      }
    : mockTeacher;

  const instructorCourses = courses.filter((c) => c.instructor.name === instructor.name);

  const skills = [
    { name: "Conversational Coaching & Dialogue", percentage: 98 },
    { name: "Accent Reduction & Phonetics", percentage: 95 },
    { name: "IELTS / TOEFL Exam Strategy", percentage: 94 },
    { name: "Grammar Demystification & Syntax", percentage: 96 },
  ];

  return (
    <div>
      <PageHeader
        title={instructor.name}
        breadcrumbs={[
          { label: 'English Tutors', path: '/instructors' },
          { label: 'Tutor Details' }
        ]}
      />

      <section className="py-16 bg-[#f8f9fc]">
        <div className="container mx-auto">
          {/* Top Profile Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-100 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Avatar & Social */}
              <div className="lg:col-span-4 text-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden mx-auto shadow-lg border-4 border-slate-100 mb-6">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-theme-primary hover:text-white transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-theme-primary hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-theme-primary hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Bio & Skills */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-theme-primary text-sm font-semibold uppercase tracking-wider">
                    {instructor.role}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-jost text-theme-navy mt-1 mb-4">
                    {instructor.name}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {instructor.bio} Passionate about breaking down speaking anxiety and accelerating natural verbal fluency through interactive conversation scenarios and constructive accent feedback.
                  </p>
                </div>

                {/* Skill Bars */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-bold font-jost text-theme-navy text-lg">Tutoring Competencies</h4>
                  {skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between text-xs sm:text-sm font-medium text-slate-700">
                        <span>{skill.name}</span>
                        <span>{skill.percentage}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-theme-primary rounded-full transition-all duration-1000"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Info Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <BookOpen className="w-4 h-4 text-theme-primary" />
                    <span>{instructor.coursesCount} English Courses</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Users className="w-4 h-4 text-theme-coral" />
                    <span>{instructor.students} Students Coached</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{instructor.rating} Tutor Rating</span>
                  </div>
                </div>

                {/* Direct Booking Action */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setInquiryModalTeacher(instructor)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-theme-primary hover:bg-theme-navy text-white font-jost font-bold text-sm rounded-xl transition-all shadow-md shadow-theme-primary/20 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Book 1-on-1 Lesson with {instructor.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Assigned Courses Section */}
          <div>
            <h3 className="text-2xl font-bold font-jost text-theme-navy mb-8">
              Courses Taught by {instructor.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(instructorCourses.length > 0 ? instructorCourses : courses.slice(0, 3)).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
