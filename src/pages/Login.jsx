import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, Mail, Lock, ArrowRight, Sparkles, CheckCircle2, 
  ShieldCheck, KeyRound, BookOpen, Star, Users 
} from 'lucide-react';
import { demoUsers } from '../data/mockData';

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
      if (user.role === 'teacher') {
        navigate('/dashboard/teacher');
      } else {
        navigate('/dashboard/student');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleQuickLogin = (role) => {
    const loggedUser = loginWithDemo(role);
    if (loggedUser.role === 'teacher') {
      navigate('/dashboard/teacher');
    } else {
      navigate('/dashboard/student');
    }
  };

  const handleCopyCredentials = (demoRole) => {
    const creds = demoRole === 'teacher' ? demoUsers.teacher : demoUsers.student;
    setEmail(creds.email);
    setPassword(demoRole === 'teacher' ? 'teacher123' : 'student123');
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
    if (res.user.role === 'teacher') {
      navigate('/dashboard/teacher');
    } else {
      navigate('/dashboard/student');
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Left Info Panel (LMS Features preview) */}
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
              Access Your English Learning Management System
            </h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              One unified portal for both Students and Certified Tutors. Real-time class bookings, IELTS scoring, video lessons, and speaking evaluations.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  ✓
                </div>
                <span>1-on-1 Speaking Practice with Native Tutors</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  ✓
                </div>
                <span>IELTS & TOEFL Band Score Evaluations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  ✓
                </div>
                <span>Curriculum Management & Homework Grading</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-slate-200 font-medium">4.9 / 5.0 Rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-theme-coral" />
              <span className="text-slate-200">35,000+ Enrolled</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-jost text-theme-navy mb-1">
                LMS Sign In
              </h3>
              <p className="text-sm text-slate-500">
                Enter your credentials or use the 1-click frontend demo cards below.
              </p>
            </div>

            {/* FRONTEND MARKUP DEMO LOGIN SECTION */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-blue-50/60 to-purple-50/80 border border-indigo-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-theme-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-theme-navy font-jost">
                    Frontend Demo Login Info
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold bg-theme-primary/10 text-theme-primary px-2 py-0.5 rounded-full">
                  Quick Access
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3">
                Click a button below for instant dashboard entry, or use the credentials:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Student Demo Box */}
                <div className="p-3 bg-white rounded-xl border border-blue-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-blue-900">👩‍🎓 Student Demo</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded font-mono">B2 Upper</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-600 space-y-0.5 mb-2 bg-slate-50 p-1.5 rounded border border-slate-100">
                      <div><span className="text-slate-400">Email:</span> student@engtutor.com</div>
                      <div><span className="text-slate-400">Pass:</span> student123</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('student')}
                      className="flex-1 py-1.5 px-2 bg-theme-primary hover:bg-theme-navy text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Login as Student</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyCredentials('student')}
                      className="p-1.5 text-xs text-slate-500 hover:text-theme-primary bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      title="Fill into form"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Teacher Demo Box */}
                <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-emerald-900">👨‍🏫 Teacher Demo</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-mono">MA TESOL</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-600 space-y-0.5 mb-2 bg-slate-50 p-1.5 rounded border border-slate-100">
                      <div><span className="text-slate-400">Email:</span> teacher@engtutor.com</div>
                      <div><span className="text-slate-400">Pass:</span> teacher123</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('teacher')}
                      className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Login as Teacher</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyCredentials('teacher')}
                      className="p-1.5 text-xs text-slate-500 hover:text-emerald-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      title="Fill into form"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {copiedRole && (
                <div className="mt-2 text-center text-xs text-emerald-600 font-medium flex items-center justify-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{copiedRole === 'teacher' ? 'Teacher' : 'Student'} credentials populated in fields below!</span>
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
                    placeholder="student@engtutor.com or teacher@engtutor.com"
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
              <span>Frontend Demo Session</span>
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
