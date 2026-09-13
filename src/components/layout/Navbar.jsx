import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Phone, Mail, User, BookOpen } from 'lucide-react';
import { navLinks } from '../../data/mockData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileDropdowns, setExpandedMobileDropdowns] = useState({});
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileDropdown = (index) => {
    setExpandedMobileDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Bar for contact info & quick links */}
      <div className="bg-[#0b104a] text-white/80 text-xs sm:text-sm py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+1234567890" className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-theme-primary" />
              <span>+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@eduleb.com" className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-theme-primary" />
              <span>info@eduleb.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white/60">English Language Learning Platform</span>
            <span className="text-theme-coral font-medium">Free Placement Test Available</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header
        className={`w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'sticky top-0 bg-white/95 backdrop-blur-md shadow-header py-3'
            : 'relative bg-white py-4 sm:py-5 border-b border-slate-100'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5">
            <img
              src="/assets/img/logo.png"
              alt="Eduleb Logo"
              className="h-9 sm:h-10 w-auto object-contain"
              onError={(e) => {
                // Fallback text logo if image fails
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden items-center space-x-2 text-theme-navy font-jost font-bold text-2xl tracking-tight">
              <BookOpen className="w-7 h-7 text-theme-primary" />
              <span>Edu<span className="text-theme-primary">leb</span></span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navLinks.map((item, index) => {
              const hasChildren = item.sublinks && item.sublinks.length > 0;
              return (
                <div key={index} className="relative group py-2">
                  {hasChildren ? (
                    <div
                      className={`flex items-center space-x-1 cursor-pointer font-jost font-medium text-base transition-colors ${
                        item.sublinks.some(sub => isActive(sub.path))
                          ? 'text-theme-primary font-semibold'
                          : 'text-theme-navy hover:text-theme-primary'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`font-jost font-medium text-base transition-colors ${
                        isActive(item.path)
                          ? 'text-theme-primary font-semibold'
                          : 'text-theme-navy hover:text-theme-primary'
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {hasChildren && (
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="w-52 bg-white rounded-lg shadow-xl border border-slate-100 py-2 overflow-hidden">
                        {item.sublinks.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={sub.path}
                            className={`block px-4 py-2.5 text-sm font-jost transition-colors ${
                              isActive(sub.path)
                                ? 'bg-theme-primary/10 text-theme-primary font-medium'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-theme-primary'
                            }`}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Header Action Buttons (Desktop & Tablet) */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/contact"
              className="text-theme-navy hover:text-theme-primary font-jost font-semibold text-sm xl:text-base px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/contact"
              className="btn-primary text-sm xl:text-base px-6 py-2.5 rounded-md"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Link
              to="/contact"
              className="btn-primary text-xs sm:text-sm px-3.5 py-2 rounded-md sm:hidden"
            >
              Join
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-theme-navy hover:text-theme-primary focus:outline-none rounded-lg border border-slate-200"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Backdrop & Panel */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/assets/img/logo.png" alt="Eduleb" className="h-8 w-auto" />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Menu Navigation Items */}
              <div className="p-4 space-y-1">
                {navLinks.map((item, index) => {
                  const hasChildren = item.sublinks && item.sublinks.length > 0;
                  const isExpanded = expandedMobileDropdowns[index];

                  return (
                    <div key={index} className="border-b border-slate-100 last:border-none">
                      {hasChildren ? (
                        <div>
                          <button
                            onClick={() => toggleMobileDropdown(index)}
                            className="w-full flex items-center justify-between py-3 px-2 text-left font-jost font-semibold text-theme-navy hover:text-theme-primary transition-colors"
                          >
                            <span>{item.title}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-theme-primary' : ''
                              }`}
                            />
                          </button>
                          {isExpanded && (
                            <div className="pl-4 pb-2 space-y-1 bg-slate-50 rounded-md mb-2">
                              {item.sublinks.map((sub, sIdx) => (
                                <Link
                                  key={sIdx}
                                  to={sub.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center space-x-2 py-2 px-3 text-sm font-jost text-slate-600 hover:text-theme-primary transition-colors"
                                >
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{sub.title}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-3 px-2 font-jost font-semibold text-theme-navy hover:text-theme-primary transition-colors"
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Drawer Footer with Sign In & Sign Up */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-outline w-full text-center py-2.5 rounded text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center py-2.5 rounded text-sm"
              >
                Sign Up Now
              </Link>
              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">Need help? support@eduleb.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
