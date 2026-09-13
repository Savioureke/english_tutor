import React from 'react';
import { Link } from 'react-router-dom';
import { Star, User, BookOpen, Clock, Heart } from 'lucide-react';

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group">
      {/* Thumbnail Container */}
      <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80';
          }}
        />
        {/* Category Tag */}
        <span className="absolute top-3.5 left-3.5 bg-theme-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {course.category}
        </span>
        {/* Price Tag Badge */}
        <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md shadow text-theme-navy font-jost font-bold text-sm">
          ${course.price.toFixed(2)}
          {course.originalPrice && (
            <span className="text-xs text-slate-400 line-through ml-1.5 font-normal">
              ${course.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating & Lessons */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-3">
            <div className="flex items-center space-x-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-theme-navy">{course.rating}</span>
              <span className="text-slate-400">({course.reviewsCount})</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-500">
              <BookOpen className="w-3.5 h-3.5 text-theme-primary" />
              <span>{course.lessons} Lessons</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold font-jost text-theme-navy group-hover:text-theme-primary transition-colors line-clamp-2 mb-3 leading-snug">
            <Link to={`/course/${course.id}`}>
              {course.title}
            </Link>
          </h3>
        </div>

        {/* Bottom Details & Instructor */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
              }}
            />
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              {course.instructor.name}
            </span>
          </div>

          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <User className="w-3.5 h-3.5 text-theme-coral" />
            <span>{course.students} Students</span>
          </div>
        </div>
      </div>
    </div>
  );
}
