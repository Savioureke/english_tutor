import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, ChevronRight, Phone, Mail, GraduationCap, 
  LogOut, User, BookOpen, Calendar, Award, LayoutDashboard 
} from 'lucide-react';
import { navLinks } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileDropdowns, setExpandedMobileDropdowns] = useState({});
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

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

  // Close mobile drawer and dropdown when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const toggleMobileDropdown = (index) => {
    setExpandedMobileDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && path !== '#' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const dashboardPath = user?.role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student';

  return (
    <>
      {/* Top Bar for contact info & placement test banner */}
      <div className="bg-[#0b104a] text-white/80 text-xs sm:text-sm py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+1234567890" className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-theme-primary" />
              <span>+1 (234) 567-890</span>
            </a>
            <a href="mailto:support@engtutor.com" className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-theme-primary" />
              <span>support@engtutor.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white/60">Teacher Training & Monetization Portal</span>
            <span className="text-theme-coral font-medium">Turn Your Fluency Into An Income</span>
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
          {/* Brand Logo: ENGtutor */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-theme-primary flex items-center justify-center text-white shadow-md shadow-theme-primary/30">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold font-jost text-theme-navy tracking-tight">
              ENG<span className="text-theme-primary">tutor</span>
            </span>
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

          {/* Header Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated && user ? (
              /* User Profile & Dashboard Menu */
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <Link
                    to={dashboardPath}
                    className="flex items-center space-x-2 py-1.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    <img
                      src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover border border-slate-300"
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold text-theme-navy font-jost leading-tight">
                        {user.name.split(' ')[0]}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'teacher' ? 'text-emerald-700' : 'text-theme-primary'
                      }`}>
                        {user.role === 'teacher' ? 'Teacher' : 'Student'}
                      </span>
                    </div>
                  </Link>

                  <Link
                    to={dashboardPath}
                    className={`text-xs font-bold font-jost px-4 py-2.5 rounded-xl shadow-sm text-white flex items-center space-x-1.5 transition-all ${
                      user.role === 'teacher'
                        ? 'bg-emerald-700 hover:bg-emerald-800'
                        : 'btn-primary'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>LMS Dashboard</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Logged Out: Sign In & Sign Up buttons */
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="text-theme-navy hover:text-theme-primary font-jost font-semibold text-sm xl:text-base px-3 py-2 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="btn-primary text-sm xl:text-base px-6 py-2.5 rounded-md shadow-md cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="flex items-center space-x-3 lg:hidden">
            {isAuthenticated ? (
              <Link
                to={dashboardPath}
                className="btn-primary text-xs px-3 py-1.5 rounded-lg"
              >
                Dashboard
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="btn-primary text-xs sm:text-sm px-3.5 py-2 rounded-md sm:hidden"
              >
                Sign In
              </button>
            )}

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

      {/* Mobile Navigation Drawer */}
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
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-theme-primary flex items-center justify-center text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-extrabold font-jost text-theme-navy">
                    ENG<span className="text-theme-primary">tutor</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile User Profile Section if logged in */}
              {isAuthenticated && user && (
                <div className="p-4 bg-gradient-to-r from-theme-navy to-theme-primary text-white">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl object-cover border border-white/30"
                    />
                    <div>
                      <div className="font-bold text-sm font-jost">{user.name}</div>
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                        {user.role === 'teacher' ? 'Instructor LMS' : 'Student LMS'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Menu Items */}
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

            {/* Mobile Drawer Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to={dashboardPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full text-center py-2.5 rounded-xl text-sm shadow-md block"
                  >
                    Go to LMS Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-center py-2 text-xs text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="btn-outline w-full text-center py-2.5 rounded-xl text-sm block"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('register');
                    }}
                    className="btn-primary w-full text-center py-2.5 rounded-xl text-sm block"
                  >
                    Sign Up Now
                  </button>
                </>
              )}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">Need help? support@engtutor.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
