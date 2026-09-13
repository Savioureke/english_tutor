import React from 'react';
import PageHeader from '../components/common/PageHeader';
import InstructorCard from '../components/common/InstructorCard';
import { instructors } from '../data/mockData';
import { Award, Users, Star } from 'lucide-react';

export default function Instructors() {
  return (
    <div>
      <PageHeader
        title="Meet Our Certified Native Tutors"
        subtitle="Learn from accredited ESL educators passionate about personalized speaking practice and English language success."
        breadcrumbs={[{ label: 'English Tutors' }]}
      />

      <section className="py-16 lg:py-24 bg-[#f8f9fc]">
        <div className="container mx-auto">
          {/* Instructors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>

          {/* Instructor Benefits Banner */}
          <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-theme-primary/10 text-theme-primary flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-jost text-theme-navy">CELTA & TEFL Certified</h4>
                <p className="text-xs sm:text-sm text-slate-500">Every tutor holds verified international teaching credentials and linguistics background.</p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-theme-coral/10 text-theme-coral flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-jost text-theme-navy">1-on-1 Dialogue Coaching</h4>
                <p className="text-xs sm:text-sm text-slate-500">Practice live conversations, get accent corrections, and build spontaneous confidence.</p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-jost text-theme-navy">4.9+ Average Rating</h4>
                <p className="text-xs sm:text-sm text-slate-500">Over 99% of our students report noticeable conversational fluency within 4 weeks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
