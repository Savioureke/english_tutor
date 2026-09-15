import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePortal } from '../../context/PortalContext';
import { 
  Globe, DollarSign, Mail, MessageSquare, CreditCard, Star, 
  Users, CheckCircle2, AlertCircle, ArrowUpRight, Plus, 
  Calendar, Video, BookOpen, Clock, ShieldCheck, Phone, CheckSquare, Edit3
} from 'lucide-react';

export default function TeacherMonetizationDashboard() {
  const { user } = useAuth();
  const { 
    teacherMessages, 
    deductionLogs, 
    lessonBookings,
    platformSettings, 
    fundWallet, 
    updatePaymentChannel,
    confirmLessonBooking,
    payLessonBooking,
    completeLessonBooking,
  } = usePortal();

  const [activeTab, setActiveTab] = useState('monetization'); // 'monetization' | 'bookings' | 'inbox' | 'wallet' | 'classes'
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('25');
  const [topUpSuccess, setTopUpSuccess] = useState(false);

  const [editChannelModalOpen, setEditChannelModalOpen] = useState(false);
  const [newChannelText, setNewChannelText] = useState(user?.payment_channel || 'PayPal (emma.watson@payments.com)');
  const [channelEditSuccess, setChannelEditSuccess] = useState(false);

  const [completionNotesModalOpen, setCompletionNotesModalOpen] = useState(false);
  const [selectedBookingForCompletion, setSelectedBookingForCompletion] = useState(null);
  const [completionNotes, setCompletionNotes] = useState('');
  const [completionSuccess, setCompletionSuccess] = useState(false);

  // Filter messages & deductions & bookings for this specific teacher
  const myMessages = teacherMessages.filter(
    (m) => m.teacher_id === user?.id || m.teacher_name === user?.full_name || m.teacher_name === 'Emma Watson'
  );

  const myBookings = (lessonBookings || []).filter(
    (b) => b.teacher_id === user?.id || b.teacher_name === user?.full_name || b.teacher_name === 'Emma Watson'
  );

  const myDeductions = deductionLogs.filter(
    (d) => d.teacher_id === user?.id || d.teacher_name === user?.full_name || d.teacher_name === 'Emma Watson'
  );

  const balance = user?.funded_balance || 0;
  const isBalanceLow = balance < (platformSettings?.lead_fee || 1.50);

  const handleTopUp = (e) => {
    e.preventDefault();
    if (user?.id) {
      fundWallet(user.id, topUpAmount);
      setTopUpSuccess(true);
      setTimeout(() => {
        setTopUpSuccess(false);
        setTopUpModalOpen(false);
      }, 1500);
    }
  };

  const handleUpdateChannel = (e) => {
    e.preventDefault();
    if (user?.id && newChannelText.trim()) {
      updatePaymentChannel(user.id, newChannelText.trim());
      setChannelEditSuccess(true);
      setTimeout(() => {
        setChannelEditSuccess(false);
        setEditChannelModalOpen(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Profile Live Confirmation Banner */}
        <div className="bg-gradient-to-r from-[#0b3c2c] via-[#0f5132] to-[#198754] rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"}
                alt={user?.full_name || "Teacher"}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/30 shadow-md"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                    <span>Live on Homepage</span>
                  </span>
                  <span className="text-xs bg-amber-400 text-slate-900 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-slate-900" />
                    <span>{user?.rating || '4.98'} Rating</span>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-jost mt-1">
                  Teacher Workspace: {user?.full_name || "Emma Watson"}
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100">
                  {user?.qualifications || "Certified Native English Coach • PPP & TBLT Specialist"}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setTopUpModalOpen(true)}
                className="bg-white text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4 text-emerald-700" />
                <span>Add Wallet Funds</span>
              </button>
              <button
                onClick={() => setActiveTab('inbox')}
                className="bg-emerald-900/60 hover:bg-emerald-900 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors border border-white/20 flex items-center space-x-1.5"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>Student Leads ({myMessages.length})</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-xs text-emerald-100">Funded Balance</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5 text-emerald-200">
                ${balance.toFixed(2)}
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-xs text-emerald-100">Student Inquiries</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5 text-white">
                {myMessages.length} Leads
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-xs text-emerald-100">Lead Fee Rate</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5 text-amber-300">
                ${(platformSettings?.lead_fee || 1.50).toFixed(2)} / lead
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-xs text-emerald-100">Total Students Coached</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5 text-white">
                {user?.total_students || 142} Learners
              </div>
            </div>
          </div>
        </div>

        {/* Low balance warning */}
        {isBalanceLow && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                <strong>Your funded balance is low (${balance.toFixed(2)}).</strong> Each incoming message requires ${(platformSettings?.lead_fee || 1.50).toFixed(2)}. Please top up your wallet so new students can continue messaging you.
              </span>
            </div>
            <button
              onClick={() => setTopUpModalOpen(true)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shrink-0 shadow-xs"
            >
              Top Up Now
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-none space-x-2 border-b border-slate-200 pb-2 mb-6">
          {[
            { id: 'monetization', label: 'Monetization & Lead Overview', icon: Globe },
            { id: 'bookings', label: 'Bookings & Live Lessons', icon: BookOpen, badge: `${myBookings.length} Bookings` },
            { id: 'inbox', label: 'Student Message Inbox', icon: MessageSquare, badge: `${myMessages.length} Leads` },
            { id: 'wallet', label: 'Wallet & Deduction History', icon: DollarSign },
            { id: 'classes', label: 'Live Schedule & Curriculum', icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-jost font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: MONETIZATION & OVERVIEW ================= */}
        {activeTab === 'monetization' && (
          <div className="space-y-8">
            {/* Live Profile Confirmation Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">
                      Verified & Active Listing
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-jost text-theme-navy">
                    "Your profile is live on the homepage"
                  </h3>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Students browsing the homepage or teacher directory can view your bio, rating, hourly rate, and send direct inquiry messages to book sessions with you.
                  </p>
                </div>

                <Link
                  to="/instructors"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 self-start sm:self-center"
                >
                  <Globe className="w-4 h-4 text-emerald-700" />
                  <span>View Public Listing</span>
                </Link>
              </div>

              {/* Payment Channel Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Payout Receiving Channel</div>
                    <div className="text-sm font-bold text-theme-navy">
                      {user?.payment_channel || 'PayPal (emma.watson@payments.com)'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setEditChannelModalOpen(true)}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 self-start sm:self-center"
                >
                  Edit Payout Details
                </button>
              </div>
            </div>

            {/* Two Column Grid: Recent Inquiries & Recent Deductions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Student Messages */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold font-jost text-lg text-theme-navy">
                      Recent Student Inquiries
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveTab('inbox')}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    View All Leads ({myMessages.length}) ›
                  </button>
                </div>

                <div className="space-y-3">
                  {myMessages.slice(0, 3).map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-emerald-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-theme-navy">{msg.student_name}</span>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 italic">"{msg.message}"</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                        <span>Email: {msg.student_email}</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          -${(msg.lead_fee_deducted || 1.50).toFixed(2)} Lead Fee
                        </span>
                      </div>
                    </div>
                  ))}
                  {myMessages.length === 0 && (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No incoming student messages yet. As students visit the homepage, new inquiries will appear here.
                    </div>
                  )}
                </div>
              </div>

              {/* Wallet Deduction History */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold font-jost text-lg text-theme-navy">
                      Wallet & Lead Fee History
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveTab('wallet')}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    Full Audit Log ›
                  </button>
                </div>

                <div className="space-y-3">
                  {myDeductions.slice(0, 4).map((ded) => (
                    <div
                      key={ded.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-theme-navy">{ded.description}</div>
                        <div className="text-[10px] text-slate-400">{ded.timestamp}</div>
                      </div>

                      <div className="text-right">
                        <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                          ded.type === 'wallet_fund' || ded.type === 'manual_credit'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {ded.type === 'wallet_fund' || ded.type === 'manual_credit' ? '+' : '-'}
                          ${ded.amount.toFixed(2)}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Bal: ${ded.balance_after.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {myDeductions.length === 0 && (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No deduction transactions recorded yet.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB: BOOKINGS & LIVE LESSONS ================= */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold font-jost text-theme-navy">
                  Student Lesson Bookings ({myBookings.length} Total)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Manage incoming student bookings, accept lessons, verify direct payments, and mark classes as completed.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  My Rate: ${user?.hourly_rate || 25}/hr
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {myBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-emerald-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-slate-400">{b.id}</span>
                        <h4 className="font-bold font-jost text-base text-theme-navy">{b.student_name}</h4>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{b.lesson_topic}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Payment Badge */}
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        b.payment_status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.payment_status === 'paid' ? `Paid: $${b.amount_paid?.toFixed(2) || b.hourly_rate?.toFixed(2)}` : `Unpaid ($${b.hourly_rate?.toFixed(2) || '25.00'})`}
                      </span>

                      {/* Status Badge */}
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        b.lesson_status === 'completed'
                          ? 'bg-purple-100 text-purple-800'
                          : b.lesson_status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800 animate-pulse'
                          : b.lesson_status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}>
                        {b.lesson_status === 'completed' ? '✓ Completed' : b.lesson_status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {b.session_notes && (
                    <div className="p-3 bg-white rounded-2xl border border-slate-100 text-xs text-slate-700 italic">
                      Note from student: "{b.session_notes}"
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
                    <div className="flex flex-wrap items-center gap-4 text-slate-600">
                      <div className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-theme-primary" />
                        <a href={`mailto:${b.student_email}`} className="text-theme-primary font-semibold hover:underline">
                          {b.student_email}
                        </a>
                      </div>
                      {b.student_phone && (
                        <div className="flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{b.student_phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(b.created_at || Date.now()).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Teacher Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {b.lesson_status === 'inquiry' && (
                        <button
                          onClick={() => confirmLessonBooking(b.id)}
                          className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirm Booking</span>
                        </button>
                      )}

                      {b.payment_status === 'pending' && (
                        <button
                          onClick={() => payLessonBooking(b.id, b.hourly_rate || 25.00)}
                          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                        >
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>Verify Student Payment (${(b.hourly_rate || 25).toFixed(2)})</span>
                        </button>
                      )}

                      {b.lesson_status !== 'completed' && (
                        <button
                          onClick={() => {
                            setSelectedBookingForCompletion(b);
                            setCompletionNotes(b.session_notes || '');
                            setCompletionNotesModalOpen(true);
                          }}
                          className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                        >
                          <CheckSquare className="w-3.5 h-3.5" />
                          <span>Mark Lesson Completed</span>
                        </button>
                      )}

                      {b.lesson_status === 'completed' && (
                        <div className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
                          Lesson Delivered & Completed {b.completed_at ? `on ${new Date(b.completed_at).toLocaleDateString()}` : ''}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {myBookings.length === 0 && (
                <div className="p-12 text-center text-xs text-slate-400 space-y-2">
                  <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
                  <p>No lesson bookings yet. When students book a 1-on-1 session with you, they will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: STUDENT MESSAGE INBOX ================= */}
        {activeTab === 'inbox' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold font-jost text-theme-navy">
                  Student Message Inbox ({myMessages.length} Total Leads)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Each student inquiry is a pre-qualified lead who submitted a message via your homepage ad. Contact them directly to schedule lessons and send your payment link.
                </p>
              </div>

              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full self-start sm:self-center">
                Platform Lead Fee: ${(platformSettings?.lead_fee || 1.50).toFixed(2)} / message
              </span>
            </div>

            <div className="space-y-4">
              {myMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs text-slate-400">{msg.id}</span>
                      <h4 className="font-bold font-jost text-base text-theme-navy">{msg.student_name}</h4>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-slate-400">
                      <span>{msg.timestamp}</span>
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-mono">
                        -${(msg.lead_fee_deducted || 1.50).toFixed(2)} Fee Deducted
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{msg.message}"
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                    <div className="flex flex-wrap items-center gap-4 text-slate-600">
                      <div className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-theme-primary" />
                        <a href={`mailto:${msg.student_email}`} className="text-theme-primary font-semibold hover:underline">
                          {msg.student_email}
                        </a>
                      </div>
                      {msg.student_phone && (
                        <div className="flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{msg.student_phone}</span>
                        </div>
                      )}
                    </div>

                    <a
                      href={`mailto:${msg.student_email}?subject=English Lesson Inquiry with ${user?.full_name || 'Your Coach'}`}
                      className="btn-primary text-xs px-4 py-2 rounded-xl shadow-xs"
                    >
                      Reply to Student Lead
                    </a>
                  </div>
                </div>
              ))}

              {myMessages.length === 0 && (
                <div className="p-12 text-center text-xs text-slate-400 space-y-2">
                  <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                  <p>Your inbox is waiting for incoming inquiries.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: WALLET & DEDUCTIONS ================= */}
        {activeTab === 'wallet' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold font-jost text-theme-navy">
                  Teacher Wallet & Lead Deduction Ledger
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Transparent real-time audit ledger showing all deposits, student inquiry deductions, and account credits.
                </p>
              </div>

              <button
                onClick={() => setTopUpModalOpen(true)}
                className="btn-primary text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md flex items-center space-x-1.5 self-start sm:self-center"
              >
                <Plus className="w-4 h-4" />
                <span>Add Wallet Funds</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-jost font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-right">Balance After</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myDeductions.map((ded) => (
                    <tr key={ded.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400">{ded.id}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          ded.type === 'wallet_fund' || ded.type === 'manual_credit'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ded.type.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700">{ded.description}</td>
                      <td className="py-3 px-4 text-slate-400">{ded.timestamp}</td>
                      <td className={`py-3 px-4 text-right font-bold font-mono ${
                        ded.type === 'wallet_fund' || ded.type === 'manual_credit'
                          ? 'text-emerald-600'
                          : 'text-red-600'
                      }`}>
                        {ded.type === 'wallet_fund' || ded.type === 'manual_credit' ? '+' : '-'}
                        ${ded.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-bold font-mono text-theme-navy">
                        ${ded.balance_after.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: SCHEDULE & CURRICULUM ================= */}
        {activeTab === 'classes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-xl font-bold font-jost text-theme-navy">
                    Live 1-on-1 Sessions & Scheduled Lessons ({myBookings.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Real-time student lesson roster and active practice sessions.
                  </p>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full self-start sm:self-center">
                  {myBookings.filter(b => b.lesson_status === 'confirmed' || b.lesson_status === 'in_progress').length} Active Sessions
                </span>
              </div>

              {myBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myBookings.map((slot) => (
                    <div key={slot.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-emerald-300 transition-all">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className={`px-2 py-0.5 rounded-md ${
                          slot.lesson_status === 'completed'
                            ? 'bg-purple-100 text-purple-800'
                            : slot.lesson_status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {slot.lesson_status.toUpperCase()}
                        </span>
                        <span className="text-slate-500 font-mono text-[11px]">${(slot.hourly_rate || 25).toFixed(2)}/hr</span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-sm text-theme-navy">{slot.student_name}</div>
                        <div className="text-xs text-slate-600 line-clamp-2">{slot.lesson_topic}</div>
                      </div>
                      <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span>{slot.student_email}</span>
                        <span>{new Date(slot.created_at || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-xs text-slate-400 space-y-2">
                  <Calendar className="w-8 h-8 mx-auto text-slate-300" />
                  <p>No active 1-on-1 sessions scheduled yet. When students book lessons with you, they will appear in your live schedule.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* MODAL: Add Wallet Funds */}
      {topUpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-jost text-theme-navy">
                Top Up Teacher Wallet
              </h3>
              <button onClick={() => setTopUpModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            {topUpSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Wallet Topped Up!</div>
                <p className="text-xs">Your new balance is ${(balance + parseFloat(topUpAmount)).toFixed(2)}.</p>
              </div>
            ) : (
              <form onSubmit={handleTopUp} className="space-y-4">
                <p className="text-xs text-slate-500">
                  Deposit funds to keep your homepage teacher listing active. Each student inquiry deducts ${(platformSettings?.lead_fee || 1.50).toFixed(2)}.
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {['15', '25', '50', '100'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        topUpAmount === amt
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Custom Amount ($):
                  </label>
                  <input
                    type="number"
                    min="5"
                    step="1"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    required
                    className="w-full p-2.5 text-sm border border-slate-200 rounded-xl font-bold text-theme-navy focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md"
                >
                  Deposit ${parseFloat(topUpAmount || 0).toFixed(2)}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Edit Payout Channel */}
      {editChannelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-jost text-theme-navy">
                Update Payout Details
              </h3>
              <button onClick={() => setEditChannelModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            {channelEditSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Payout Details Updated!</div>
              </div>
            ) : (
              <form onSubmit={handleUpdateChannel} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Payout Channel & Account:
                  </label>
                  <input
                    type="text"
                    required
                    value={newChannelText}
                    onChange={(e) => setNewChannelText(e.target.value)}
                    placeholder="e.g. PayPal (yourname@gmail.com)"
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Complete Lesson with Notes */}
      {completionNotesModalOpen && selectedBookingForCompletion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-jost text-theme-navy">
                Complete Lesson Session
              </h3>
              <button onClick={() => setCompletionNotesModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            {completionSuccess ? (
              <div className="p-4 bg-purple-50 text-purple-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-purple-600 mx-auto" />
                <div className="font-bold text-sm">Lesson Completed!</div>
                <p className="text-xs">The lesson status has been updated and recorded in the database.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  completeLessonBooking(selectedBookingForCompletion.id, completionNotes);
                  setCompletionSuccess(true);
                  setTimeout(() => {
                    setCompletionSuccess(false);
                    setCompletionNotesModalOpen(false);
                    setSelectedBookingForCompletion(null);
                  }, 1500);
                }}
                className="space-y-4"
              >
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-theme-navy">{selectedBookingForCompletion.student_name}</div>
                  <div className="text-slate-500">{selectedBookingForCompletion.lesson_topic}</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lesson Feedback & Tutor Notes:
                  </label>
                  <textarea
                    rows="3"
                    value={completionNotes}
                    onChange={(e) => setCompletionNotes(e.target.value)}
                    placeholder="Enter notes on student progress, pronunciation drills completed, homework assigned..."
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md"
                >
                  Confirm Lesson Completion
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
