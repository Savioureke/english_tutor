import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/mockData';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-[#f8f9fc] relative overflow-hidden">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="section-title">
          <span className="section-title-tag">
            Teacher Success Stories
          </span>
          <h2 className="section-title-heading">
            What Trained Teachers Say About ENGtutor
          </h2>
          <p className="section-title-desc">
            Read inspiring stories from fluent English speakers who mastered teaching methodology and built lucrative remote teaching incomes.
          </p>
        </div>

        {/* Testimonial Card Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-100 relative">
            
            {/* Large Quote Icon */}
            <div className="w-14 h-14 rounded-2xl bg-theme-primary/10 text-theme-primary flex items-center justify-center mb-6">
              <Quote className="w-7 h-7 fill-current" />
            </div>

            {/* Stars */}
            <div className="flex items-center space-x-1 text-amber-400 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Review text */}
            <blockquote className="text-lg sm:text-2xl font-jost text-theme-navy font-medium leading-relaxed mb-8">
              "{currentTestimonial.review}"
            </blockquote>

            {/* Author Info & Nav Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-slate-100 pt-6 gap-4">
              <div className="flex items-center space-x-4">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                />
                <div>
                  <h4 className="text-lg font-bold font-jost text-theme-navy">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-theme-primary font-medium">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={prevSlide}
                  aria-label="Previous Testimonial"
                  className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-theme-primary hover:text-white hover:border-theme-primary transition-colors focus:outline-none"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next Testimonial"
                  className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-theme-primary hover:text-white hover:border-theme-primary transition-colors focus:outline-none"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-theme-primary' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
