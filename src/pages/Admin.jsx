import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePortal } from '../context/PortalContext';
import { 
  ShieldCheck, Users, DollarSign, MessageSquare, Settings, 
  ToggleLeft, ToggleRight, ArrowUpRight, ArrowDownRight, 
  Search, Lock, Mail, CheckCircle2, AlertCircle, Save, Plus, Edit2, KeyRound
} from 'lucide-react';

export default function Admin() {
  const { user, login, loginWithDemo, logout, isAdmin } = useAuth();
  const {
    enrollment,
    platformSettings,
    teacherMessages,
    deductionLogs,
    updateLeadFee,
    adjustTeacherWallet,
    toggleTeacherLiveStatus,
    changeUserRole,
  } = usePortal();

  // Admin login states
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState('enrollment'); // 'enrollment' | 'messages' | 'settings' | 'adjustments' | 'logs'
  const [searchQuery, setSearchQuery] = useState('');

  // Lead fee form state
  const [feeInput, setFeeInput] = useState(platformSettings.lead_fee.toString());
  const [feeSaved, setFeeSaved] = useState(false);

  // Manual Adjustment form state
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [adjustType, setAdjustType] = useState('credit'); // 'credit' | 'debit'
  const [adjustAmount, setAdjustAmount] = useState('15');
  const [adjustReason, setAdjustReason] = useState('Promotional bonus credit');
  const [adjustSuccess, setAdjustSuccess] = useState(false);

  // Handle Admin Login
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!adminEmail.trim() || !adminPassword.trim()) {
      setLoginError('Please enter admin credentials.');
      return;
    }

    const res = login(adminEmail, adminPassword);
    if (!res.success) {
      setLoginError(res.error || 'Invalid credentials.');
      return;
    }

    if (res.user.role !== 'admin') {
      setLoginError('Access denied: This account does not have administrator privileges.');
    }
  };

  const handleQuickAdminDemo = () => {
    loginWithDemo('admin');
  };

  const handleSaveLeadFee = (e) => {
    e.preventDefault();
    const ok = updateLeadFee(feeInput);
    if (ok) {
      setFeeSaved(true);
      setTimeout(() => setFeeSaved(false), 2000);
    }
  };

  const handleWalletAdjustment = (e) => {
    e.preventDefault();
    if (!selectedTeacherId) return;
    const res = adjustTeacherWallet(selectedTeacherId, adjustType, adjustAmount, adjustReason);
    if (res.success) {
      setAdjustSuccess(true);
      setTimeout(() => {
        setAdjustSuccess(false);
        setAdjustAmount('');
        setAdjustReason('');
      }, 2000);
    }
  };

  // If not logged in as Admin, show Admin Login View
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[85vh] bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl text-white space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-jost">Platform Admin Portal</h2>
            <p className="text-xs text-slate-400">
              Authorized personnel only. Access master enrollment tables, lead deductions, and wallet adjustments.
            </p>
          </div>

          {/* Quick Demo Bypass */}
          <div className="p-3.5 bg-slate-700/60 rounded-2xl border border-slate-600 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-300 flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5" /> 1-Click Admin Demo Login:
              </span>
              <button
                type="button"
                onClick={handleQuickAdminDemo}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Login as Admin
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-400">
              admin@engtutor.com • pass: admin123
            </div>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@engtutor.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-jost font-bold text-sm rounded-xl transition-colors shadow-lg shadow-red-600/30"
            >
              Authenticate as Administrator
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-500">
            Encrypted Admin Console Session • No Supabase Auth Dependency
          </div>
        </div>
      </div>
    );
  }

  // Filter users by search query
  const filteredEnrollment = enrollment.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTeachers = enrollment.filter((u) => u.role === 'teacher').length;
  const liveTeachersCount = enrollment.filter((u) => u.role === 'teacher' && u.is_live_on_homepage).length;
  const totalLearners = enrollment.filter((u) => u.role === 'learner').length;
  const totalDeductionsSum = deductionLogs
    .filter((d) => d.type === 'lead_fee_deduction')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Admin Header */}
        <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-bold tracking-wider bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full">
                  Root Admin Console
                </span>
                <span className="text-xs text-slate-400">
                  Logged in as: <strong>{user.full_name}</strong> ({user.email})
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-jost mt-1 text-white">
                Platform Operations & Lead Audit
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={logout}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-xs font-bold rounded-xl transition-colors text-slate-300"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Global Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <div className="text-xs text-slate-400">Total Enrolled Users</div>
            <div className="text-2xl font-bold font-jost text-white mt-1">{enrollment.length} Users</div>
            <div className="text-[11px] text-slate-500 mt-1">{totalLearners} Learners • {totalTeachers} Teachers</div>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <div className="text-xs text-slate-400">Live on Homepage</div>
            <div className="text-2xl font-bold font-jost text-emerald-400 mt-1">{liveTeachersCount} Teachers</div>
            <div className="text-[11px] text-slate-500 mt-1">Receiving inquiries</div>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <div className="text-xs text-slate-400">Student Inquiries Sent</div>
            <div className="text-2xl font-bold font-jost text-blue-400 mt-1">{teacherMessages.length} Messages</div>
            <div className="text-[11px] text-slate-500 mt-1">From homepage listings</div>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <div className="text-xs text-slate-400">Lead Fees Collected</div>
            <div className="text-2xl font-bold font-jost text-amber-400 mt-1">
              ${totalDeductionsSum.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">@ ${platformSettings.lead_fee.toFixed(2)} per message</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-none space-x-2 border-b border-slate-700 pb-3 mb-6">
          {[
            { id: 'enrollment', label: 'Enrollment Master Table', icon: Users, count: enrollment.length },
            { id: 'messages', label: 'Student Message Audit Log', icon: MessageSquare, count: teacherMessages.length },
            { id: 'settings', label: 'Lead Fee Configuration', icon: Settings },
            { id: 'adjustments', label: 'Manual Wallet Adjustment', icon: DollarSign },
            { id: 'logs', label: 'Deduction & Deposit Logs', icon: ShieldCheck, count: deductionLogs.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-jost font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: ENROLLMENT MASTER TABLE ================= */}
        {activeTab === 'enrollment' && (
          <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-jost text-white">
                  Enrollment Master Table ({enrollment.length} Total Users)
                </h3>
                <p className="text-xs text-slate-400">
                  Manage roles, monitor video training gate progression, inspect funded balances, and toggle homepage live status.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search user, email, role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 font-jost font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">User & Contact</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Gate Progress</th>
                    <th className="py-3 px-3">Funded Balance</th>
                    <th className="py-3 px-3">Payment Channel</th>
                    <th className="py-3 px-3 text-center">Live on Homepage</th>
                    <th className="py-3 px-3 text-right">Role Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredEnrollment.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-750 transition-colors">
                      {/* Name & Contact */}
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                            alt={u.full_name}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-bold text-white font-jost">{u.full_name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : u.role === 'teacher'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      {/* Gate Progress */}
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1 text-[11px]">
                          <span title="Video 1" className={`px-1.5 py-0.5 rounded ${u.video_1_watched ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-700 text-slate-500'}`}>
                            V1
                          </span>
                          <span title="Funded $10+" className={`px-1.5 py-0.5 rounded ${(u.funded_balance || 0) >= 10 ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-700 text-slate-500'}`}>
                            $10+
                          </span>
                          <span title="Video 2" className={`px-1.5 py-0.5 rounded ${u.video_2_watched ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-700 text-slate-500'}`}>
                            V2
                          </span>
                          <span title="Payout Channel" className={`px-1.5 py-0.5 rounded ${u.payment_channel ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-700 text-slate-500'}`}>
                            Pay
                          </span>
                          <span title="Terms Accepted" className={`px-1.5 py-0.5 rounded ${u.terms_accepted ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-700 text-slate-500'}`}>
                            T&C
                          </span>
                        </div>
                      </td>

                      {/* Funded Balance */}
                      <td className="py-3 px-3 font-mono font-bold">
                        <span className={(u.funded_balance || 0) > 0 ? 'text-emerald-400' : 'text-slate-400'}>
                          ${(u.funded_balance || 0).toFixed(2)}
                        </span>
                      </td>

                      {/* Payment Channel */}
                      <td className="py-3 px-3 text-slate-400 text-[11px] max-w-xs truncate">
                        {u.payment_channel || 'Not configured'}
                      </td>

                      {/* Live Status Toggle */}
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => toggleTeacherLiveStatus(u.id)}
                          className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                            u.is_live_on_homepage
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {u.is_live_on_homepage ? '● Live' : '○ Paused'}
                        </button>
                      </td>

                      {/* Role Actions */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {u.role !== 'teacher' && (
                            <button
                              onClick={() => changeUserRole(u.id, 'teacher')}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold"
                              title="Promote to Teacher"
                            >
                              Make Teacher
                            </button>
                          )}
                          {u.role !== 'learner' && (
                            <button
                              onClick={() => changeUserRole(u.id, 'learner')}
                              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-[10px] font-bold"
                              title="Demote to Learner"
                            >
                              Make Learner
                            </button>
                          )}
                          {u.role !== 'admin' && (
                            <button
                              onClick={() => changeUserRole(u.id, 'admin')}
                              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold"
                              title="Grant Admin"
                            >
                              Grant Admin
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 2: STUDENT MESSAGE AUDIT LOG ================= */}
        {activeTab === 'messages' && (
          <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-xl font-bold font-jost text-white">
                  Student Message Audit Log ({teacherMessages.length} Messages)
                </h3>
                <p className="text-xs text-slate-400">
                  Full trail of every student inquiry submitted on the platform, target teacher, and lead fee deductions.
                </p>
              </div>

              <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
                Lead Fee: ${platformSettings.lead_fee.toFixed(2)}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 font-jost font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">Message ID</th>
                    <th className="py-3 px-3">Target Teacher</th>
                    <th className="py-3 px-3">Student Name & Contact</th>
                    <th className="py-3 px-3">Inquiry Message Content</th>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3 text-right">Fee Deducted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {teacherMessages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-750 transition-colors">
                      <td className="py-3 px-3 font-mono text-slate-400">{msg.id}</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">{msg.teacher_name}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-white">{msg.student_name}</div>
                        <div className="text-[11px] text-slate-400">{msg.student_email}</div>
                        {msg.student_phone && <div className="text-[10px] text-slate-500">{msg.student_phone}</div>}
                      </td>
                      <td className="py-3 px-3 text-slate-300 max-w-sm italic">
                        "{msg.message}"
                      </td>
                      <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{msg.timestamp}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-amber-300">
                        -${(msg.lead_fee_deducted || 1.50).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: LEAD FEE CONFIGURATION ================= */}
        {activeTab === 'settings' && (
          <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl max-w-2xl space-y-6">
            <div>
              <h3 className="text-xl font-bold font-jost text-white">
                Platform Lead Fee Configuration
              </h3>
              <p className="text-xs text-slate-400">
                Adjust the per-message fee automatically deducted from a teacher's funded wallet whenever a student sends an inquiry.
              </p>
            </div>

            {feeSaved && (
              <div className="p-4 bg-emerald-900/50 border border-emerald-600 rounded-2xl text-emerald-200 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Lead fee configuration updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveLeadFee} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Per-Message Lead Fee ($):
                </label>
                <input
                  type="number"
                  step="0.10"
                  min="0"
                  value={feeInput}
                  onChange={(e) => setFeeInput(e.target.value)}
                  required
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl font-mono text-lg font-bold text-emerald-400 focus:outline-none focus:border-red-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Default: $1.50 per student message inquiry.
                </p>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 text-xs text-slate-400 space-y-1.5">
                <div className="font-bold text-white">How This Setting Operates:</div>
                <p>1. When a student clicks "Message & Book" on the homepage, the system checks if the teacher has at least this fee in their wallet.</p>
                <p>2. If sufficient, the exact amount configured here is debited and recorded in the audit log.</p>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-jost font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Lead Fee Settings</span>
              </button>
            </form>
          </div>
        )}

        {/* ================= TAB 4: MANUAL WALLET ADJUSTMENT ================= */}
        {activeTab === 'adjustments' && (
          <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl max-w-2xl space-y-6">
            <div>
              <h3 className="text-xl font-bold font-jost text-white">
                Manual Teacher Wallet Adjustment
              </h3>
              <p className="text-xs text-slate-400">
                Credit or debit a teacher's funded wallet directly with full audit log tracking.
              </p>
            </div>

            {adjustSuccess && (
              <div className="p-4 bg-emerald-900/50 border border-emerald-600 rounded-2xl text-emerald-200 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Wallet balance adjusted and logged successfully!</span>
              </div>
            )}

            <form onSubmit={handleWalletAdjustment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Teacher:
                </label>
                <select
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  required
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="">-- Choose a teacher --</option>
                  {enrollment.filter((u) => u.role === 'teacher').map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.full_name} ({t.email}) — Current Balance: ${t.funded_balance.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Adjustment Type:
                  </label>
                  <select
                    value={adjustType}
                    onChange={(e) => setAdjustType(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="credit">Credit (Add Funds +)</option>
                    <option value="debit">Debit (Deduct Funds -)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Amount ($):
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(e.target.value)}
                    required
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold font-mono text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Reason / Audit Note:
                </label>
                <input
                  type="text"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="e.g. Promotional credit grant / manual refund"
                  required
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-jost font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-md"
              >
                Apply Wallet Adjustment
              </button>
            </form>
          </div>
        )}

        {/* ================= TAB 5: DEDUCTION & DEPOSIT LOGS ================= */}
        {activeTab === 'logs' && (
          <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold font-jost text-white">
                Complete Financial & Lead Deduction Audit Trail
              </h3>
              <p className="text-xs text-slate-400">
                Every wallet deposit, student inquiry deduction, and admin manual adjustment logged in real-time.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 font-jost font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">Log ID</th>
                    <th className="py-3 px-3">Teacher</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Description</th>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3 text-right">Amount</th>
                    <th className="py-3 px-3 text-right">Bal After</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {deductionLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-750 transition-colors">
                      <td className="py-3 px-3 font-mono text-slate-400">{log.id}</td>
                      <td className="py-3 px-3 font-bold text-white">{log.teacher_name}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.type === 'wallet_fund' || log.type === 'manual_credit'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {log.type.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{log.description}</td>
                      <td className="py-3 px-3 text-slate-400">{log.timestamp}</td>
                      <td className={`py-3 px-3 text-right font-mono font-bold ${
                        log.type === 'wallet_fund' || log.type === 'manual_credit'
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}>
                        {log.type === 'wallet_fund' || log.type === 'manual_credit' ? '+' : '-'}
                        ${log.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-200">
                        ${log.balance_after.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
