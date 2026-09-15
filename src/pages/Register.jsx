import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, Mail, Lock, User, ArrowRight, 
  ShieldCheck, Phone, Star, Users, CheckCircle2 
} from 'lucide-react';

export default function Register() {
  const { register, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    const res = await register({ name, email, password, phone });
    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || 'Registration failed.');
      return;
    }

    navigate('/dashboard');
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
              Learn How to Teach English and Monetize Your Skill
            </h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Register to begin your teaching training. You already speak English — we'll teach you how to teach it and how to get paid for it. Funding your account (minimum $10) unlocks the monetization module and puts you live on the homepage.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">✓</div>
                <span>PPP & TBLT Lesson Plan Blueprints</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">✓</div>
                <span>Friction-Free Error Correction Methods</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">✓</div>
                <span>Direct Client Acquisition & Payment Setup</span>
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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold font-jost text-theme-navy mb-1">
                  Learner Intake Registration
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Register to begin your training. You already speak English — we'll teach you how to teach it and how to get paid for it.
                </p>
              </div>
            </div>

            {/* REQUIRED CLEAR INDICATOR */}
            <div className="mb-6 p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-900 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
              <span>
                <strong>Account Notice:</strong> Signing up creates your learner account. You can upgrade to a teacher after funding your account (minimum $10).
              </span>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs">
                {error}
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-theme-primary hover:bg-theme-navy text-white font-jost font-semibold text-sm rounded-xl transition-all shadow-md shadow-theme-primary/20 flex items-center justify-center space-x-2 mt-2"
              >
                <span>Start Training</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant Dashboard Access</span>
            </div>
            <div>
              Already have an account?{' '}
              <Link to="/login" className="text-theme-primary font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
