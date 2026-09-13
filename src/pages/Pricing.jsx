import React from 'react';
import PageHeader from '../components/common/PageHeader';
import PricingSection from '../components/home/PricingSection';
import { ShieldCheck, HelpCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div>
      <PageHeader
        title="Transparent Pricing Plans"
        subtitle="Choose the perfect subscription plan for your learning pace and professional objectives."
        breadcrumbs={[{ label: 'Pricing Plans' }]}
      />

      <PricingSection />

      {/* Guarantee & Help Banner */}
      <section className="py-12 bg-[#f8f9fc] border-t border-slate-200">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 sm:p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold font-jost text-theme-navy">
                  30-Day Money-Back Guarantee
                </h4>
                <p className="text-xs sm:text-sm text-slate-500">
                  Try any plan risk-free. If you're not 100% satisfied, get a complete refund within 30 days.
                </p>
              </div>
            </div>

            <Link to="/faq" className="btn-outline text-sm px-6 py-2.5 rounded whitespace-nowrap">
              View FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
