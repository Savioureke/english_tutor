import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { faqs } from '../data/mockData';
import { ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [expandedIndices, setExpandedIndices] = useState({ 0: true, 1: true });

  const toggleAccordion = (index) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our native English tutors, live speaking sessions, placement tests, and certificates."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="py-16 lg:py-24 bg-[#f8f9fc]">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = expandedIndices[index];
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold font-jost text-base sm:text-lg text-theme-navy pr-4">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-theme-primary text-white' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need More Assistance Card */}
          <div className="mt-16 max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-card text-center">
            <div className="w-14 h-14 rounded-2xl bg-theme-primary/10 text-theme-primary flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold font-jost text-theme-navy mb-2">
              Have Questions About Tutoring?
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              Our English advisors are here 24/7 to help you choose the right tutor and placement level.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary w-full sm:w-auto px-6 py-2.5 rounded">
                <span>Talk to an English Advisor</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
