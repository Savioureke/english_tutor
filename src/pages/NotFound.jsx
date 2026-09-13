import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="py-20 lg:py-28 bg-[#f8f9fc] min-h-[70vh] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div className="mb-8">
          <img
            src="/assets/img/404.svg"
            alt="Page Not Found"
            className="w-full max-w-sm mx-auto h-auto"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="hidden text-8xl sm:text-9xl font-extrabold font-jost text-theme-primary mb-4">
            404
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-jost text-theme-navy mb-4">
          Oops! Page Not Found
        </h1>

        <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-lg shadow-md flex items-center justify-center space-x-2">
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link to="/courses" className="btn-outline w-full sm:w-auto px-8 py-3.5 rounded-lg flex items-center justify-center space-x-2">
            <span>Browse Courses</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
