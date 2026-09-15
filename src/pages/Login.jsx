import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, Mail, Lock, ArrowRight, ShieldCheck, Star, Users 
} from 'lucide-react';

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || 'Invalid credentials.');
      return;
    }

    if (res.user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Left Info Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-theme-navy via-[#1b236d] to-theme-primary text-white p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <Link to="/" className="inline-flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/20">
                <GraduationCap className="w-6 h-6 text-theme-coral" />
              </div>
              <span className="text-2xl font-extrabold font-jost text-white tracking-tight">
                ENG<span className="text-theme-coral">tutor</span>
              </span>
            </Link>

            <h2 className="text-2xl sm:text-3xl font-bold font-jost leading-tight mb-4">
              Access Your Teacher Training & Monetization Portal
            </h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              You already speak English. Learn how to teach it with structured methodology, manage paying clients, and track lead fee deductions.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  ✓
                </div>
                <span>PPP & Task-Based Teaching Frameworks</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  ✓
                </div>
                <span>Step-by-Step 45-Minute Lesson Planning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  ✓
                </div>
                <span>Direct Client Acquisition & Payment Channel Setup</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-slate-200 font-medium">98.7% Pass Rate</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-theme-coral" />
              <span className="text-slate-200">1,200+ Trained Teachers</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-jost text-theme-navy mb-1">
                Portal Sign In
              </h3>
              <p className="text-sm text-slate-500">
                Enter your account email and password to access your portal.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs">
                {error}
              </div>
            )}

            {/* Standard Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-theme-primary hover:bg-theme-navy text-white font-jost font-semibold text-sm rounded-xl transition-all shadow-md shadow-theme-primary/20 flex items-center justify-center space-x-2"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant Dashboard Access</span>
            </div>
            <div>
              Don't have an account?{' '}
              <Link to="/register" className="text-theme-primary font-semibold hover:underline">
                Create Account
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
