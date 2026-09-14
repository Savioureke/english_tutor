import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, Mail, Lock, ArrowRight, Sparkles, CheckCircle2, 
  ShieldCheck, KeyRound, Star, Users, ShieldAlert 
} from 'lucide-react';

export default function Login() {
  const { login, loginWithDemo, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copiedRole, setCopiedRole] = useState(null);

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

  const handleQuickLogin = (role) => {
    const loggedUser = loginWithDemo(role);
    if (loggedUser) {
      if (loggedUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleCopyCredentials = (demoRole) => {
    if (demoRole === 'admin') {
      setEmail('admin@engtutor.com');
      setPassword('admin123');
    } else if (demoRole === 'teacher') {
      setEmail('teacher@engtutor.com');
      setPassword('teacher123');
    } else {
      setEmail('student@engtutor.com');
      setPassword('student123');
    }
    setCopiedRole(demoRole);
    setTimeout(() => setCopiedRole(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    const res = login(email, password);
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
                Enter your credentials or click any demo profile below for instant access.
              </p>
            </div>

            {/* Quick Demo Access Grid */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-blue-50/60 to-purple-50/80 border border-indigo-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-theme-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-theme-navy font-jost">
                    Instant Demo Login Shortcuts
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold bg-theme-primary/10 text-theme-primary px-2 py-0.5 rounded-full">
                  1-Click Access
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Learner Demo Box */}
                <div className="p-2.5 bg-white rounded-xl border border-blue-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-xs text-blue-900 mb-1">👩‍🎓 Learner Intake</div>
                    <div className="font-mono text-[10px] text-slate-500 mb-1.5 truncate">student@engtutor.com</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('learner')}
                    className="w-full py-1.5 bg-theme-primary hover:bg-theme-navy text-white text-[11px] font-medium rounded-lg transition-colors"
                  >
                    Login Learner
                  </button>
                </div>

                {/* Teacher Demo Box */}
                <div className="p-2.5 bg-white rounded-xl border border-emerald-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-xs text-emerald-900 mb-1">👨‍🏫 Live Teacher</div>
                    <div className="font-mono text-[10px] text-slate-500 mb-1.5 truncate">teacher@engtutor.com</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('teacher')}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium rounded-lg transition-colors"
                  >
                    Login Teacher
                  </button>
                </div>

                {/* Admin Demo Box */}
                <div className="p-2.5 bg-white rounded-xl border border-red-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-xs text-red-900 mb-1">🛡️ Admin Console</div>
                    <div className="font-mono text-[10px] text-slate-500 mb-1.5 truncate">admin@engtutor.com</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin')}
                    className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-medium rounded-lg transition-colors"
                  >
                    Login Admin
                  </button>
                </div>
              </div>

              {copiedRole && (
                <div className="mt-2 text-center text-xs text-emerald-600 font-medium flex items-center justify-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{copiedRole.toUpperCase()} credentials populated in fields below!</span>
                </div>
              )}
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
