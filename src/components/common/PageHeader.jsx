import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="relative bg-[#0b104a] text-white py-14 sm:py-20 overflow-hidden">
      {/* Subtle background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-theme-coral/10 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>
      
      <div className="container mx-auto relative z-10 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jost text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            {subtitle}
          </p>
        )}
        
        {/* Breadcrumb path */}
        <nav className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm">
          <Link to="/" className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              {crumb.path ? (
                <Link to={crumb.path} className="text-slate-300 hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-theme-coral font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </section>
  );
}
