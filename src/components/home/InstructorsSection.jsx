import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import InstructorCard from '../common/InstructorCard';
import { instructors } from '../../data/mockData';

export default function InstructorsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="section-title">
          <span className="section-title-tag">
            Featured Coaches
          </span>
          <h2 className="section-title-heading">
            Top Earning Teachers
          </h2>
          <p className="section-title-desc">
            Trained on this platform. Rated by real students. Available now.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link to="/instructors" className="btn-outline">
            <span>View All Top Earning Teachers</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
