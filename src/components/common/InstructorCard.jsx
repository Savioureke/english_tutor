import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Star, BookOpen } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export default function InstructorCard({ instructor }) {
  const { setInquiryModalTeacher } = usePortal();

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group text-center flex flex-col h-full">
      {/* Image container */}
      <div className="relative overflow-hidden bg-slate-100 aspect-square">
        <img
          src={instructor.image || instructor.avatar}
          alt={instructor.name || instructor.full_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80';
          }}
        />

        {/* Floating Social Icons Bar */}
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-2">
            <a
              href={instructor.social?.facebook || '#'}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-theme-primary hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={instructor.social?.twitter || '#'}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-theme-primary hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href={instructor.social?.linkedin || '#'}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-theme-primary hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h4 className="text-lg sm:text-xl font-bold font-jost text-theme-navy group-hover:text-theme-primary transition-colors">
            <Link to={`/instructor/${instructor.id}`}>
              {instructor.name || instructor.full_name}
            </Link>
          </h4>
          <p className="text-xs sm:text-sm text-theme-primary font-medium mt-1">
            {instructor.role || `Certified English Coach · ★ ${instructor.rating || 4.9} · ${instructor.students || '120+'} students`}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-center justify-around text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-theme-primary" />
              <span>{instructor.coursesCount || 8} Modules</span>
            </span>
            <span className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>★ {instructor.rating || 4.9}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setInquiryModalTeacher(instructor)}
            className="w-full py-2 bg-theme-primary/10 hover:bg-theme-primary text-theme-primary hover:text-white font-jost font-semibold text-xs rounded-lg transition-colors text-center cursor-pointer"
          >
            Message & Book
          </button>
        </div>
      </div>
    </div>
  );
}
