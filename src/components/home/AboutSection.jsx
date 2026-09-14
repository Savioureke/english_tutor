import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Play, Award, ArrowRight } from 'lucide-react';

export default function AboutSection({ onOpenVideo }) {
  const points = [
    {
      title: "How to Structure a 45-Minute Lesson Plan",
      desc: "Step-by-step blueprints to balance presentation, guided student speaking practice, and targeted drills without running out of time."
    },
    {
      title: "How to Correct Student Errors Without Friction",
      desc: "Master tactful delayed feedback and natural conversational correction techniques that build student fluency and trust."
    },
    {
      title: "How to Set Hourly Rates ($20–$65+/hr) & Onboard Students",
      desc: "Proven onboarding workflows to set your pricing, handle initial client consultations, and turn trial lessons into long-term bookings."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#f8f9fc]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Media & Video Trigger */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&auto=format&fit=crop&q=80"
                  alt="English Tutoring Classroom"
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                />
                
                {/* Play Video Trigger Overlay */}
                <button
                  onClick={onOpenVideo}
                  aria-label="Play Video"
                  className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-theme-primary/90 text-white flex items-center justify-center hover:bg-theme-coral hover:scale-110 transition-all shadow-xl backdrop-blur-sm"
                >
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                </button>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-4 animate-float">
                <div className="w-12 h-12 rounded-xl bg-theme-coral/10 text-theme-coral flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-jost text-theme-navy">100% Practical</div>
                  <div className="text-xs text-slate-500">Step-by-Step Procedures</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content & Bullet points */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <span className="section-title-tag">
                Step-by-Step Procedures
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-jost text-theme-navy leading-tight mt-2">
                Learn the Exact Procedures to Run Lessons and Onboard Paying Students
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
                You already have the language. We teach you the professional teaching methodology, lesson structuring protocols, and monetization steps to build a high-earning independent coaching service.
              </p>
            </div>

            {/* Checklist items */}
            <div className="space-y-4">
              {points.map((pt, idx) => (
                <div key={idx} className="flex items-start space-x-3.5">
                  <div className="w-6 h-6 rounded-full bg-theme-primary/10 text-theme-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold font-jost text-theme-navy">
                      {pt.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link to="/about" className="btn-primary">
                <span>Explore Teaching Procedures</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
