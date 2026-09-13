import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle2, Star, Users, Sparkles, BookOpen } from 'lucide-react';

export default function Hero({ onOpenVideo }) {
  return (
    <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#f8f9fc] via-white to-white">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-theme-primary/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 -ml-20 w-80 h-80 rounded-full bg-theme-coral/5 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Text */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-theme-primary/10 text-theme-primary px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-theme-primary" />
              <span>#1 English & Digital Learning Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold font-jost text-theme-navy leading-[1.15] tracking-tight">
              Master English & Unlock <br className="hidden sm:inline" />
              <span className="text-theme-primary relative inline-block">
                Global Career
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C60 3 190 3 247 9" stroke="#f26b65" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span> Opportunities
            </h1>

            <p className="text-base sm:text-lg text-theme-body max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Accelerate your language fluency and acquire in-demand professional skills through interactive live classes, 1-on-1 mentorship, and accredited certifications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/courses" className="btn-primary w-full sm:w-auto px-8 py-4 text-base rounded-md shadow-md hover:shadow-lg">
                <span>Explore All Courses</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              
              <button
                onClick={onOpenVideo}
                className="inline-flex items-center space-x-3 px-6 py-3.5 text-theme-navy font-jost font-semibold hover:text-theme-primary transition-colors group"
              >
                <span className="w-12 h-12 rounded-full bg-theme-primary/10 text-theme-primary flex items-center justify-center group-hover:bg-theme-primary group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </span>
                <span>Watch Video Tour</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Certified Native Tutors</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Lifetime Video Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified Certificates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Background Decorative Shape */}
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative z-10 rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-white">
                <img
                  src="/assets/img/about1.png"
                  alt="Student Learning English"
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80';
                  }}
                />
              </div>

              {/* Floating Stat Badge: Satisfied Students */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-4 animate-float">
                <div className="w-12 h-12 rounded-xl bg-theme-primary/10 flex items-center justify-center text-theme-primary">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-jost text-theme-navy">45,000+</div>
                  <div className="text-xs text-slate-500">Enrolled Students Worldwide</div>
                </div>
              </div>

              {/* Floating Rating Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="text-base font-bold font-jost text-theme-navy">4.9 / 5.0</div>
                  <div className="text-xs text-slate-500">Rated by 2,400+ Reviews</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
