import React from 'react';
import { Users, GraduationCap, BookOpen, Award } from 'lucide-react';
import { statistics } from '../../data/mockData';

const iconMap = {
  Users: Users,
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  Award: Award,
};

export default function StatsCounter() {
  return (
    <section className="relative -mt-8 sm:-mt-12 z-20 pb-12">
      <div className="container mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {statistics.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Users;
              return (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4 ${
                    index > 0 ? 'pt-6 sm:pt-0 sm:pl-6 lg:pl-8' : ''
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-theme-primary/10 text-theme-primary flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-jost text-theme-navy">
                      {stat.count}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
