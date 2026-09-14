import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Sparkles } from 'lucide-react';
import { pricingPlans } from '../../data/mockData';

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="section-title">
          <span className="section-title-tag">
            Teacher Plans
          </span>
          <h2 className="section-title-heading">
            Teacher Training & Monetization Plans
          </h2>
          <p className="section-title-desc">
            Choose your training pathway to master English teaching methodology, unlock your profile listing, and acquire paying students.
          </p>
        </div>

        {/* Monthly / Yearly Toggle Switch */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <span className={`text-sm font-semibold font-jost ${!isYearly ? 'text-theme-navy' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
              isYearly ? 'bg-theme-primary' : 'bg-slate-300'
            }`}
            aria-label="Toggle Billing Frequency"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                isYearly ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-semibold font-jost ${isYearly ? 'text-theme-navy' : 'text-slate-400'}`}>
              Yearly Billing
            </span>
            <span className="bg-theme-coral/10 text-theme-coral text-xs font-bold px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const period = isYearly ? '/year' : '/month';

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-theme-navy text-white shadow-2xl scale-105 z-10 border-2 border-theme-primary'
                    : 'bg-white text-theme-navy border border-slate-200 shadow-card hover:shadow-card-hover'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-theme-coral text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold font-jost mb-2 ${plan.popular ? 'text-white' : 'text-theme-navy'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs sm:text-sm ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <span className="text-4xl sm:text-5xl font-extrabold font-jost">
                      ${price}
                    </span>
                    <span className={`text-sm font-medium ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                      {period}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3.5 mb-8 text-sm">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-theme-coral' : 'text-emerald-500'}`} />
                        <span className={plan.popular ? 'text-slate-200' : 'text-slate-600'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                    {plan.unavailableFeatures?.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 opacity-40">
                        <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400" />
                        <span className="line-through text-slate-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  to="/contact"
                  className={`w-full py-3.5 rounded-lg font-jost font-semibold text-center transition-all duration-300 block ${
                    plan.popular
                      ? 'bg-theme-primary text-white hover:bg-theme-coral shadow-lg'
                      : 'bg-slate-100 text-theme-navy hover:bg-theme-primary hover:text-white'
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
