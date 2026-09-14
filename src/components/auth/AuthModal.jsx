import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  X, Mail, Lock, User, GraduationCap, BookOpen, CheckCircle2, 
  ArrowRight, ShieldCheck, Sparkles, KeyRound 
} from 'lucide-react';
import { demoUsers } from '../../data/mockData';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    openAuthModal, 
    login, 
    loginWithDemo, 
    register 
  } = useAuth();
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [targetGoal, setTargetGoal] = useState('Conversational Fluency');
  const [error, setError] = useState('');
  const [copiedRole, setCopiedRole] = useState(null);

  if (!isAuthModalOpen) return null;

  const handleQuickLogin = (selectedRole) => {
    const user = loginWithDemo(selectedRole);
    if (user.role === 'teacher') {
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

    if (authModalMode === 'login') {
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
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      const res = register({ name, email, password, role, targetGoal });
      if (res.user.role === 'teacher') {
        navigate('/dashboard/teacher');
      } else {
        navigate('/dashboard/student');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title & Close */}
        <div className="bg-gradient-to-r from-theme-navy via-[#1e2570] to-theme-primary px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/20">
              <GraduationCap className="w-6 h-6 text-theme-coral" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-jost tracking-tight">
                {authModalMode === 'login' ? 'Welcome Back to Teacher Portal' : 'Register to Begin Teacher Training'}
              </h3>
              <p className="text-xs text-white/80">
                {authModalMode === 'login' 
                  ? 'Sign in to access your teaching modules, client bookings, and monetization dashboard' 
                  : "You already speak English — we'll teach you how to teach it and how to get paid for it."}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 pt-3">
          <button
            onClick={() => { setError(''); openAuthModal('login'); }}
            className={`pb-3 px-4 font-jost font-semibold text-sm transition-all border-b-2 ${
              authModalMode === 'login'
                ? 'border-theme-primary text-theme-primary'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setError(''); openAuthModal('register'); }}
            className={`pb-3 px-4 font-jost font-semibold text-sm transition-all border-b-2 ${
              authModalMode === 'register'
                ? 'border-theme-primary text-theme-primary'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* FRONTEND MARKUP DEMO LOGIN SECTION */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-blue-50/60 to-purple-50/80 p-4 rounded-xl border border-indigo-100/80 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-theme-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-theme-navy font-jost">
                  Frontend Demo Markup & 1-Click Login
                </span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-theme-primary/10 text-theme-primary font-medium">
                Instant LMS Access
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              Click either role below for <strong>instant 1-click login</strong> or copy credentials into the form:
            </p>

            {/* Quick Demo Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Student Demo Box */}
              <div className="p-3 bg-white rounded-lg border border-blue-200 hover:border-theme-primary transition-all shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-blue-900 flex items-center gap-1.5">
                      👩‍🎓 Student Demo
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded font-mono">B2 Upper Int</span>
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
                    className="flex-1 py-1.5 px-2 bg-theme-primary hover:bg-theme-navy text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Login as Student</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyCredentials('student')}
                    className="p-1.5 text-xs text-slate-500 hover:text-theme-primary bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                    title="Fill into form"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Teacher Demo Box */}
              <div className="p-3 bg-white rounded-lg border border-emerald-200 hover:border-emerald-600 transition-all shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-emerald-900 flex items-center gap-1.5">
                      👨‍🏫 Teacher / Tutor Demo
                    </span>
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
                    className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Login as Teacher</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyCredentials('teacher')}
                    className="p-1.5 text-xs text-slate-500 hover:text-emerald-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
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
                <span>{copiedRole === 'teacher' ? 'Teacher' : 'Student'} credentials filled into the form below!</span>
              </div>
            )}
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-xs font-medium text-slate-400 uppercase">
              Or {authModalMode === 'login' ? 'Sign In Manually' : 'Sign Up Custom User'}
            </span>
            <div className="border-t border-slate-200 w-full"></div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Your Role in the LMS *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`p-2.5 rounded-lg border text-left flex items-center space-x-2 transition-all ${
                        role === 'student'
                          ? 'border-theme-primary bg-indigo-50/50 ring-2 ring-theme-primary/20 text-theme-primary font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-xs">I am a Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('teacher')}
                      className={`p-2.5 rounded-lg border text-left flex items-center space-x-2 transition-all ${
                        role === 'teacher'
                          ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 text-emerald-700 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span className="text-xs">I am a Teacher / Tutor</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"
                    />
                  </div>
                </div>

                {role === 'student' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Learning Goal
                    </label>
                    <select
                      value={targetGoal}
                      onChange={(e) => setTargetGoal(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary bg-white text-slate-700"
                    >
                      <option value="Conversational Fluency">Conversational English Fluency</option>
                      <option value="IELTS Exam Preparation (Band 7.5+)">IELTS Exam Preparation (Band 7.5+)</option>
                      <option value="Executive Business English">Executive Business English</option>
                      <option value="Accent Reduction & Pronunciation">Accent Reduction & Pronunciation</option>
                      <option value="TOEFL iBT (100+ Score)">TOEFL iBT (100+ Score)</option>
                    </select>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Tip: Emails containing "teacher" automatically route to Teacher LMS!
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-theme-primary hover:bg-theme-navy text-white font-jost font-semibold text-sm rounded-lg transition-all shadow-md shadow-theme-primary/20 flex items-center justify-center space-x-2"
            >
              <span>{authModalMode === 'login' ? 'Sign In to Dashboard' : 'Start Training'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Frontend LMS Session</span>
          </div>
          <div>
            {authModalMode === 'login' ? (
              <span>Don't have an account? <button type="button" onClick={() => openAuthModal('register')} className="text-theme-primary font-semibold hover:underline">Sign up</button></span>
            ) : (
              <span>Already registered? <button type="button" onClick={() => openAuthModal('login')} className="text-theme-primary font-semibold hover:underline">Log in</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
