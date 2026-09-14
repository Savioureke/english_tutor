import React from 'react';
import { Lightbulb, Compass, Target, ArrowRight } from 'lucide-react';
import { promoCards } from '../../data/mockData';
import { Link } from 'react-router-dom';

const iconMap = {
  Lightbulb: Lightbulb,
  Compass: Compass,
  Target: Target,
};

export default function PromoFeatures() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {promoCards.map((promo) => {
            const Icon = iconMap[promo.icon] || Lightbulb;
            return (
              <div
                key={promo.id}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${promo.bgClass}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-jost text-theme-navy mb-3 group-hover:text-theme-primary transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    {promo.description}
                  </p>
                </div>

                <Link
                  to="/courses"
                  className="inline-flex items-center space-x-2 text-sm font-semibold font-jost text-theme-navy group-hover:text-theme-primary transition-colors pt-4 border-t border-slate-100"
                >
                  <span>Explore Methodology</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
