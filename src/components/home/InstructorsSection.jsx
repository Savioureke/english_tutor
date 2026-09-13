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
            Meet Our Team
          </span>
          <h2 className="section-title-heading">
            Learn From Certified Expert Instructors
          </h2>
          <p className="section-title-desc">
            Our global educators bring real industry leadership and passionate teaching methodologies to every session.
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
            <span>View All Instructors</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
