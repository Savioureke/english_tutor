import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import StatsCounter from '../components/home/StatsCounter';
import CourseFilterSection from '../components/home/CourseFilterSection';
import AboutSection from '../components/home/AboutSection';
import InstructorsSection from '../components/home/InstructorsSection';
import PricingSection from '../components/home/PricingSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogSection from '../components/home/BlogSection';
import PartnerLogos from '../components/home/PartnerLogos';
import VideoModal from '../components/common/VideoModal';

export default function HomeTwo() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div>
      {/* Home 2 Hero Section */}
      <section className="relative bg-[#0b104a] text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#525fe1_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-block text-theme-coral font-bold text-xs sm:text-sm uppercase tracking-wider bg-theme-coral/10 px-4 py-1.5 rounded-full">
                Teacher Training & Monetization Platform
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-jost text-white leading-tight">
                You Already Speak English. <span className="text-theme-coral">Learn to Teach</span> & Get Paid
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Transform your existing fluency into a remote coaching business with structured teaching methodologies, lesson plans, and direct client acquisition.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link to="/courses" className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-md">
                  <span>Start Teaching Training</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="btn-white w-full sm:w-auto px-8 py-3.5 rounded-md flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Monetize Your Skill</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white/5 backdrop-blur-sm p-2">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&auto=format&fit=crop&q=80"
                  alt="Online English Study"
                  className="rounded-2xl w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <StatsCounter />
      <CourseFilterSection />
      <AboutSection onOpenVideo={() => setVideoOpen(true)} />
      <InstructorsSection />
      <PricingSection />
      <TestimonialsSection />
      <BlogSection />
      <PartnerLogos />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1"
      />
    </div>
  );
}
