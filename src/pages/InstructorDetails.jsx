import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CourseCard from '../components/common/CourseCard';
import { instructors, courses } from '../data/mockData';
import { Star, BookOpen, Users, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function InstructorDetails() {
  const { id } = useParams();
  const instructor = instructors.find((ins) => ins.id === parseInt(id || '1')) || instructors[0];
  const instructorCourses = courses.filter((c) => c.instructor.name === instructor.name);

  const skills = [
    { name: "Language Teaching Methodology", percentage: 95 },
    { name: "Curriculum & Lesson Planning", percentage: 90 },
    { name: "Conversational Coaching", percentage: 98 },
    { name: "Student Mentorship & Support", percentage: 92 },
  ];

  return (
    <div>
      <PageHeader
        title={instructor.name}
        breadcrumbs={[
          { label: 'Instructors', path: '/instructors' },
          { label: 'Instructor Details' }
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
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80';
                    }}
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
                    {instructor.bio} With years of active classroom and online tutoring experience, {instructor.name} specializes in personalized learning paths, interactive dialogues, and boosting conversational fluency for international professionals.
                  </p>
                </div>

                {/* Skill Bars */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-bold font-jost text-theme-navy text-lg">Core Competencies</h4>
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
                    <span>{instructor.coursesCount} Courses Taught</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Users className="w-4 h-4 text-theme-coral" />
                    <span>{instructor.students} Students</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{instructor.rating} Instructor Rating</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Assigned Courses Section */}
          <div>
            <h3 className="text-2xl font-bold font-jost text-theme-navy mb-8">
              Courses by {instructor.name}
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
