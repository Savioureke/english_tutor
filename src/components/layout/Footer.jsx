import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin, Instagram, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#0b104a] text-white/80 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Col 1: About & Info */}
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <img
                src="/assets/img/logo.png"
                alt="Eduleb"
                className="h-10 w-auto brightness-200 contrast-125"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-white font-jost font-bold text-2xl">
                Edu<span className="text-theme-primary">leb</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              Empowering global learners through world-class English tutoring and modern digital skill courses led by certified industry experts.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-theme-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-theme-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-theme-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-theme-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-jost font-semibold text-lg sm:text-xl mb-5 border-l-4 border-theme-primary pl-3">
              Explore Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>About Our Academy</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>Popular Online Courses</span>
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>Certified Instructors</span>
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>Membership Pricing</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>Frequently Asked Questions</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>Contact & Support</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="text-white font-jost font-semibold text-lg sm:text-xl mb-5 border-l-4 border-theme-primary pl-3">
              Top Categories
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/courses" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>Conversational English</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>Business Communication</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>UI/UX & Product Design</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>Full Stack Web Development</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>Digital Marketing & SEO</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-theme-coral transition-colors flex items-center space-x-2">
                  <span>›</span> <span>Financial Analysis</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div>
            <h4 className="text-white font-jost font-semibold text-lg sm:text-xl mb-5 border-l-4 border-theme-primary pl-3">
              Newsletter
            </h4>
            <p className="text-sm text-slate-300 mb-4">
              Subscribe to get exclusive discounts, weekly English study tips, and early course access.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-md py-3 pl-4 pr-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary transition-all"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-3.5 bg-theme-primary hover:bg-theme-coral text-white rounded transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center space-x-2 text-xs text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you for subscribing!</span>
                </div>
              )}
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-theme-primary" />
                <span>124 King Street, London, UK</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-theme-primary" />
                <span>+1 (234) 567-890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Eduleb Education. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
