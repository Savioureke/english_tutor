import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CourseCard from '../common/CourseCard';
import { courses, courseCategories } from '../../data/mockData';

export default function CourseFilterSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(c => c.category === selectedCategory);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="section-title">
          <span className="section-title-tag">
            Monetize Your Skill
          </span>
          <h2 className="section-title-heading">
            How to Teach English While Making Money
          </h2>
          <p className="section-title-desc">
            Follow our proven monetization pathway: turn your existing English fluency into a paid service, set up your payment channel, and get discovered by paying students.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {courseCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold font-jost transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-theme-primary text-white shadow-md shadow-theme-primary/20 scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-theme-navy'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link to="/courses" className="btn-outline">
            <span>Browse All Teaching Training Modules</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
