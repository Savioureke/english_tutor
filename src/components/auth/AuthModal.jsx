import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  X, Mail, Lock, User, GraduationCap, Phone, CheckCircle2, 
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
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [copiedRole, setCopiedRole] = useState(null);

  if (!isAuthModalOpen) return null;

  const handleQuickLogin = (selectedRole) => {
    const user = loginWithDemo(selectedRole);
    if (user) {
      if (user.role === 'admin') {
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

    if (authModalMode === 'login') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password.');
        return;
      }
      const res = login(email, password);
      if (!res.success) {
        setError(res.error || 'Login failed.');
        return;
      }
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      const res = register({ name, email, password, phone });
      if (!res.success) {
        setError(res.error || 'Registration failed.');
        return;
      }
      navigate('/dashboard');
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
                {authModalMode === 'login' ? 'Sign In to Portal' : 'Register for Teacher Training'}
              </h3>
              <p className="text-xs text-white/80">
                {authModalMode === 'login' 
                  ? 'Sign in to access your training modules, wallet, and teacher workspace' 
                  : "You already speak English — we'll teach you how to teach it and get paid for it."}
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

        <div className="p-6 overflow-y-auto space-y-4">
          {/* Quick Demo Access Grid */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-blue-50/60 to-purple-50/80 p-4 rounded-xl border border-indigo-100/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-theme-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-theme-navy font-jost">
                  1-Click Demo Accounts
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-theme-primary/10 text-theme-primary font-medium">
                Instant Portal Access
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Learner Demo */}
              <div className="p-2.5 bg-white rounded-lg border border-blue-200 hover:border-theme-primary transition-all shadow-xs flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-xs text-blue-900 mb-1">👩‍🎓 Learner Intake</div>
                  <div className="font-mono text-[10px] text-slate-600 mb-1.5">student@engtutor.com</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('learner')}
                  className="w-full py-1 bg-theme-primary hover:bg-theme-navy text-white text-[11px] font-medium rounded transition-colors"
                >
                  Login Learner
                </button>
              </div>

              {/* Teacher Demo */}
              <div className="p-2.5 bg-white rounded-lg border border-emerald-200 hover:border-emerald-600 transition-all shadow-xs flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-xs text-emerald-900 mb-1">👨‍🏫 Live Teacher</div>
                  <div className="font-mono text-[10px] text-slate-600 mb-1.5">teacher@engtutor.com</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('teacher')}
                  className="w-full py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium rounded transition-colors"
                >
                  Login Teacher
                </button>
              </div>

              {/* Admin Demo */}
              <div className="p-2.5 bg-white rounded-lg border border-red-200 hover:border-red-600 transition-all shadow-xs flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-xs text-red-900 mb-1">🛡️ Admin Console</div>
                  <div className="font-mono text-[10px] text-slate-600 mb-1.5">admin@engtutor.com</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="w-full py-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-medium rounded transition-colors"
                >
                  Login Admin
                </button>
              </div>
            </div>
          </div>

          {/* Account notice on register */}
          {authModalMode === 'register' && (
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
              <span>
                <strong>Account Notice:</strong> Signing up creates your learner account. You can upgrade to a teacher after funding your account (minimum $10).
              </span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalMode === 'register' && (
              <>
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
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"
                    />
                  </div>
                </div>
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
            <span>Encrypted LMS Session</span>
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
