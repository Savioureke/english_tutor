import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';

export default function VideoCTA({ onOpenVideo }) {
  return (
    <section className="relative py-20 lg:py-28 bg-[#0b104a] text-white overflow-hidden">
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#525fe1_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-theme-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-theme-coral/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto relative z-10 text-center max-w-3xl">
        {/* Play Button */}
        <div className="mb-8">
          <button
            onClick={onOpenVideo}
            aria-label="Play Lesson Video"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-theme-primary text-white flex items-center justify-center mx-auto hover:bg-theme-coral transition-all transform hover:scale-110 shadow-2xl animate-pulse-slow"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
          </button>
        </div>

        <span className="inline-block text-theme-coral font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3">
          Interactive Live Lesson Tour
        </span>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-jost text-white leading-tight mb-6">
          Experience How 1-on-1 English Tutoring Unlocks Spoken Fluency Fast
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
          Watch a sample lesson with our native tutors to see how real-time dialogue coaching, pronunciation correction, and personalized feedback build confidence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/courses" className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-md">
            <span>Explore English Courses</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link to="/contact" className="btn-white w-full sm:w-auto px-8 py-3.5 rounded-md">
            <span>Book Free Trial Lesson</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
