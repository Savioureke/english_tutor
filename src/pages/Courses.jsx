import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import CourseCard from '../components/common/CourseCard';
import { courses, courseCategories } from '../data/mockData';
import { Search, Filter } from 'lucide-react';

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="Explore Online Courses"
        subtitle="Browse our comprehensive library of accredited courses taught by certified native tutors and specialists."
        breadcrumbs={[{ label: 'Courses' }]}
      />

      <section className="py-16 lg:py-20 bg-[#f8f9fc]">
        <div className="container mx-auto">
          
          {/* Filter & Search Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-card border border-slate-100 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-11 pr-4 text-sm text-theme-navy placeholder-slate-400 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              {courseCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-jost transition-colors ${
                    selectedCategory === category
                      ? 'bg-theme-primary text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-8 text-sm text-slate-500">
            <span>Showing <strong className="text-theme-navy">{filteredCourses.length}</strong> available courses</span>
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="text-theme-coral hover:underline font-medium text-xs"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm max-w-lg mx-auto">
              <p className="text-lg font-bold font-jost text-theme-navy mb-2">No courses found</p>
              <p className="text-sm text-slate-500 mb-6">Try searching with a different keyword or selecting a different category.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="btn-primary text-sm px-6 py-2.5 rounded"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
