import React from 'react';
import { partnerLogos } from '../../data/mockData';

export default function PartnerLogos() {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 font-jost">
            Trusted by Leading Educational Institutions & Global Companies
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity">
          {partnerLogos.map((logo, index) => (
            <div key={index} className="p-4 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105">
              <img
                src={logo}
                alt={`Partner brand ${index + 1}`}
                className="h-8 sm:h-10 w-auto object-contain max-w-[120px]"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-slate-400 font-bold font-jost text-sm">
                BRAND {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
