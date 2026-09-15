import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePortal } from '../../context/PortalContext';
import { 
  Play, Lock, Unlock, CheckCircle2, DollarSign, CreditCard, 
  FileCheck, Globe, ArrowRight, Video, Sparkles, Shield, AlertCircle,
  ExternalLink, ChevronRight, Check
} from 'lucide-react';

export default function LearnerGateDashboard() {
  const { user } = useAuth();
  const { 
    completeVideo1, 
    fundWallet, 
    completeVideo2, 
    updatePaymentChannel, 
    updateHourlyRate,
    acceptTermsAndUpgrade,
    platformSettings 
  } = usePortal();
  const navigate = useNavigate();

  // Modal states for gate actions
  const [video1ModalOpen, setVideo1ModalOpen] = useState(false);
  const [fundingModalOpen, setFundingModalOpen] = useState(false);
  const [video2ModalOpen, setVideo2ModalOpen] = useState(false);
  const [channelModalOpen, setChannelModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // Form states
  const [fundAmount, setFundAmount] = useState('10');
  const [fundSuccess, setFundSuccess] = useState(false);
  const [hourlyRate, setHourlyRate] = useState('25');
  const [channelType, setChannelType] = useState('PayPal');
  const [channelAccount, setChannelAccount] = useState('');
  const [channelSuccess, setChannelSuccess] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  const currentUser = user || {};
  const v1Done = Boolean(currentUser.video_1_watched);
  const balance = currentUser.funded_balance || 0;
  const isFunded = balance >= (platformSettings.min_funding || 10.00);
  const v2Done = Boolean(currentUser.video_2_watched);
  const hasChannel = Boolean(currentUser.payment_channel);
  const termsDone = Boolean(currentUser.terms_accepted);

  const handleWatchVideo1 = async () => {
    await completeVideo1(currentUser.id);
    setVideo1ModalOpen(false);
  };

  const handleDepositFunds = async (e) => {
    e.preventDefault();
    const res = await fundWallet(currentUser.id, fundAmount);
    if (res.success) {
      setFundSuccess(true);
      setTimeout(() => {
        setFundSuccess(false);
        setFundingModalOpen(false);
      }, 1500);
    }
  };

  const handleWatchVideo2 = async () => {
    await completeVideo2(currentUser.id);
    setVideo2ModalOpen(false);
  };

  const handleSavePaymentChannel = async (e) => {
    e.preventDefault();
    if (!channelAccount.trim()) return;
    if (hourlyRate) {
      await updateHourlyRate(currentUser.id, hourlyRate);
    }
    await updatePaymentChannel(currentUser.id, `${channelType} (${channelAccount.trim()})`);
    setChannelSuccess(true);
    setTimeout(() => {
      setChannelSuccess(false);
      setChannelModalOpen(false);
    }, 1500);
  };

  const handleAcceptTermsAndMonetize = async () => {
    if (!termsAgreed) return;
    await acceptTermsAndUpgrade(currentUser.id);
    setUpgradeSuccess(true);
    setTimeout(() => {
      setUpgradeSuccess(false);
      setTermsModalOpen(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Learner Intake Notice / Header */}
        <div className="bg-gradient-to-r from-theme-navy via-[#1b236d] to-theme-primary rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-bold tracking-wider bg-theme-coral/20 text-theme-coral px-3 py-1 rounded-full">
                Learner Intake & Upgrade Path
              </span>
              <span className="text-xs bg-white/10 text-white/90 px-3 py-1 rounded-full font-medium">
                Stage: Training & Verification
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold font-jost text-white">
              Welcome, <span className="text-white font-extrabold">{currentUser.full_name || 'Learner'}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              You already speak English fluently. Complete the 5-step procedure below to master our teaching methodology, fund your wallet (minimum ${platformSettings.min_funding || 10}), and unlock your live listing on the homepage to start receiving direct student inquiries.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-200">
              <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-xl">
                <span>Funded Balance:</span>
                <strong className="text-emerald-300 font-mono text-sm">${balance.toFixed(2)}</strong>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-xl">
                <span>Account Status:</span>
                <strong className="text-amber-300 uppercase">Learner (Upgrade in Progress)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Progression Stepper */}
        <div className="space-y-4">
          
          {/* STEP 1: Video 1 - Intro / Methodology Foundation */}
          <div className={`p-6 rounded-3xl border transition-all ${
            v1Done 
              ? 'bg-white border-emerald-200 shadow-sm' 
              : 'bg-white border-slate-200 shadow-sm ring-2 ring-theme-primary/20'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  v1Done ? 'bg-emerald-100 text-emerald-700' : 'bg-theme-primary/10 text-theme-primary'
                }`}>
                  {v1Done ? <CheckCircle2 className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-400 uppercase font-mono">Step 1</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      v1Done ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {v1Done ? 'Completed' : 'Unlocked'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-jost text-theme-navy">
                    Watch Video 1: Teaching Methodology Foundation
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xl">
                    Master the Presentation–Practice–Production (PPP) model and Task-Based Language Teaching (TBLT) framework for 45-minute lesson delivery.
                  </p>
                  <p className="text-[11px] text-theme-primary font-medium pt-1">
                    {v1Done ? '✓ Methodology verified. Step 2 (Account Funding) is unlocked.' : '→ Watch this 15-minute training video to unlock Step 2.'}
                  </p>
                </div>
              </div>

              <div className="sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => setVideo1ModalOpen(true)}
                  className={`px-5 py-2.5 rounded-xl font-jost font-semibold text-xs transition-all flex items-center space-x-1.5 shadow-sm ${
                    v1Done 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                      : 'btn-primary'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>{v1Done ? 'Rewatch Video 1' : 'Watch Video 1'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* STEP 2: Fund Account - Min $10 */}
          <div className={`p-6 rounded-3xl border transition-all ${
            !v1Done 
              ? 'bg-slate-50 border-slate-200 opacity-60' 
              : isFunded 
                ? 'bg-white border-emerald-200 shadow-sm' 
                : 'bg-white border-slate-200 shadow-sm ring-2 ring-theme-primary/20'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  !v1Done 
                    ? 'bg-slate-200 text-slate-400' 
                    : isFunded 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-amber-100 text-amber-700'
                }`}>
                  {!v1Done ? <Lock className="w-6 h-6" /> : isFunded ? <CheckCircle2 className="w-6 h-6" /> : <DollarSign className="w-6 h-6" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-400 uppercase font-mono">Step 2</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      !v1Done 
                        ? 'bg-slate-200 text-slate-600' 
                        : isFunded 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {!v1Done ? 'Locked' : isFunded ? 'Completed' : 'Unlocked'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-jost text-theme-navy">
                    Fund Your Teacher Wallet (Minimum ${platformSettings.min_funding || 10.00})
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xl">
                    Your funded balance enables your live ad on the homepage. Each student message inquiry deducts the platform lead fee (${(platformSettings.lead_fee || 1.50).toFixed(2)}) directly from this balance.
                  </p>
                  <p className="text-[11px] text-theme-primary font-medium pt-1">
                    {!v1Done 
                      ? '🔒 Locked until Video 1 is watched.' 
                      : isFunded 
                        ? `✓ Account funded with $${balance.toFixed(2)}. Step 3 is unlocked.` 
                        : `→ Deposit at least $${platformSettings.min_funding || 10} to unlock Step 3 (Monetization Video).`}
                  </p>
                </div>
              </div>

              <div className="sm:self-center shrink-0">
                <button
                  type="button"
                  disabled={!v1Done}
                  onClick={() => setFundingModalOpen(true)}
                  className={`px-5 py-2.5 rounded-xl font-jost font-semibold text-xs transition-all flex items-center space-x-1.5 shadow-sm ${
                    !v1Done 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : isFunded 
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                        : 'btn-primary'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>{isFunded ? 'Add More Funds' : `Fund Wallet (Min $${platformSettings.min_funding || 10})`}</span>
                </button>
              </div>
            </div>
          </div>

          {/* STEP 3: Video 2 - Monetization System */}
          <div className={`p-6 rounded-3xl border transition-all ${
            !isFunded 
              ? 'bg-slate-50 border-slate-200 opacity-60' 
              : v2Done 
                ? 'bg-white border-emerald-200 shadow-sm' 
                : 'bg-white border-slate-200 shadow-sm ring-2 ring-theme-primary/20'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  !isFunded 
                    ? 'bg-slate-200 text-slate-400' 
                    : v2Done 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-theme-primary/10 text-theme-primary'
                }`}>
                  {!isFunded ? <Lock className="w-6 h-6" /> : v2Done ? <CheckCircle2 className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-400 uppercase font-mono">Step 3</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      !isFunded 
                        ? 'bg-slate-200 text-slate-600' 
                        : v2Done 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {!isFunded ? 'Locked' : v2Done ? 'Completed' : 'Unlocked'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-jost text-theme-navy">
                    Watch Video 2: Monetization & Student Acquisition
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xl">
                    Learn how to set your hourly rates ($20–$65+/hr), onboard new student leads, manage rebooking pipelines, and handle client communication.
                  </p>
                  <p className="text-[11px] text-theme-primary font-medium pt-1">
                    {!isFunded 
                      ? '🔒 Locked until wallet funding ($10 min) is confirmed.' 
                      : v2Done 
                        ? '✓ Monetization module completed. Step 4 is unlocked.' 
                        : '→ Watch this 20-minute masterclass to unlock Step 4.'}
                  </p>
                </div>
              </div>

              <div className="sm:self-center shrink-0">
                <button
                  type="button"
                  disabled={!isFunded}
                  onClick={() => setVideo2ModalOpen(true)}
                  className={`px-5 py-2.5 rounded-xl font-jost font-semibold text-xs transition-all flex items-center space-x-1.5 shadow-sm ${
                    !isFunded 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : v2Done 
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                        : 'btn-primary'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>{v2Done ? 'Rewatch Video 2' : 'Watch Video 2'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* STEP 4: Set Payment Channel */}
          <div className={`p-6 rounded-3xl border transition-all ${
            !v2Done 
              ? 'bg-slate-50 border-slate-200 opacity-60' 
              : hasChannel 
                ? 'bg-white border-emerald-200 shadow-sm' 
                : 'bg-white border-slate-200 shadow-sm ring-2 ring-theme-primary/20'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  !v2Done 
                    ? 'bg-slate-200 text-slate-400' 
                    : hasChannel 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {!v2Done ? <Lock className="w-6 h-6" /> : hasChannel ? <CheckCircle2 className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-400 uppercase font-mono">Step 4</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      !v2Done 
                        ? 'bg-slate-200 text-slate-600' 
                        : hasChannel 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {!v2Done ? 'Locked' : hasChannel ? 'Completed' : 'Unlocked'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-jost text-theme-navy">
                    Set Your Payout / Receiving Channel
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xl">
                    Configure your payout channel (PayPal, Stripe Connect, Wise, or Direct Bank Wire) where your private students will send their session fees.
                  </p>
                  <p className="text-[11px] text-theme-primary font-medium pt-1">
                    {!v2Done 
                      ? '🔒 Locked until Video 2 is completed.' 
                      : hasChannel 
                        ? `✓ Payout channel set: ${currentUser.payment_channel}. Step 5 unlocked.` 
                        : '→ Configure your payout account to unlock final Step 5.'}
                  </p>
                </div>
              </div>

              <div className="sm:self-center shrink-0">
                <button
                  type="button"
                  disabled={!v2Done}
                  onClick={() => setChannelModalOpen(true)}
                  className={`px-5 py-2.5 rounded-xl font-jost font-semibold text-xs transition-all flex items-center space-x-1.5 shadow-sm ${
                    !v2Done 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : hasChannel 
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                        : 'btn-primary'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{hasChannel ? 'Edit Payout Method' : 'Set Payment Channel'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* STEP 5: Accept T&Cs & Monetize Your Skill */}
          <div className={`p-6 rounded-3xl border transition-all ${
            !hasChannel 
              ? 'bg-slate-50 border-slate-200 opacity-60' 
              : termsDone 
                ? 'bg-white border-emerald-200 shadow-sm' 
                : 'bg-white border-slate-200 shadow-sm ring-2 ring-emerald-500/30'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  !hasChannel 
                    ? 'bg-slate-200 text-slate-400' 
                    : termsDone 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {!hasChannel ? <Lock className="w-6 h-6" /> : <FileCheck className="w-6 h-6" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-400 uppercase font-mono">Step 5</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      !hasChannel 
                        ? 'bg-slate-200 text-slate-600' 
                        : termsDone 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {!hasChannel ? 'Locked' : termsDone ? 'Completed' : 'Ready to Activate'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-jost text-theme-navy">
                    Accept Terms & Conditions & Monetize Your Skill
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xl">
                    Accept the platform terms (${(platformSettings.lead_fee || 1.50).toFixed(2)} lead fee per incoming student message, 100% student fee retention).
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium pt-1">
                    {!hasChannel 
                      ? '🔒 Locked until payout channel is configured.' 
                      : '★ Clicking activate will upgrade your account to Teacher and put your profile live on the homepage!'}
                  </p>
                </div>
              </div>

              <div className="sm:self-center shrink-0">
                <button
                  type="button"
                  disabled={!hasChannel}
                  onClick={() => setTermsModalOpen(true)}
                  className={`px-6 py-3 rounded-xl font-jost font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-md ${
                    !hasChannel 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Monetize Your Skill</span>
                </button>
              </div>
            </div>
          </div>

          {/* STEP 6: Confirmation of Live Status */}
          <div className="p-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-indigo-50/40">
            <div className="flex items-center space-x-3 text-slate-700">
              <Globe className="w-5 h-5 text-theme-primary" />
              <div>
                <h4 className="font-bold font-jost text-sm text-theme-navy">
                  Step 6: Live on Homepage as a Teacher
                </h4>
                <p className="text-xs text-slate-500">
                  Once Step 5 is approved, your verified tutor card appears in the homepage Top Earning Teachers carousel.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL 1: Video 1 Player */}
      {video1ModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 space-y-4">
            <div className="p-4 bg-theme-navy text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4 text-theme-coral" />
                <span className="font-bold text-sm font-jost">Phase 1 Training: Teaching Methodology</span>
              </div>
              <button onClick={() => setVideo1ModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between p-4 text-white shadow-inner">
                {platformSettings.training_video_1_url ? (
                  <iframe
                    src={platformSettings.training_video_1_url}
                    title={platformSettings.training_video_1_title || "Training Video 1"}
                    className="w-full h-full rounded-xl border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="text-center z-10 py-6 m-auto">
                    <div className="w-16 h-16 bg-theme-primary rounded-full mx-auto flex items-center justify-center mb-2 shadow-lg animate-pulse">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <h4 className="font-bold font-jost text-base">{platformSettings.training_video_1_title || "PPP & TBLT Lesson Plan Blueprint"}</h4>
                    <p className="text-xs text-slate-300">Presentation, Practice, and Production Structure</p>
                  </div>
                )}
              </div>

              <div className="bg-indigo-50/80 p-3.5 rounded-xl border border-indigo-100 text-xs text-indigo-950 space-y-1">
                <div className="font-bold text-theme-navy">{platformSettings.training_video_1_title || "Mastering the PPP English Teaching Methodology"}</div>
                <p className="text-slate-600">{platformSettings.training_video_1_description || "Maintain 70% student talking time, avoid abrupt error interruption, and use guided discovery questions."}</p>
              </div>

              <button
                type="button"
                onClick={handleWatchVideo1}
                className="btn-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Mark Video 1 as Completed & Unlock Account Funding ($10)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Account Funding Modal */}
      {fundingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-theme-primary" />
                <h3 className="text-lg font-bold font-jost text-theme-navy">
                  Fund Teacher Wallet ($10 Minimum)
                </h3>
              </div>
              <button onClick={() => setFundingModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            {fundSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Account Funded Successfully!</div>
                <p className="text-xs">Your new balance is ${(balance + parseFloat(fundAmount)).toFixed(2)}. Step 3 (Monetization Masterclass) is unlocked.</p>
              </div>
            ) : (
              <form onSubmit={handleDepositFunds} className="space-y-4">
                <p className="text-xs text-slate-500">
                  Minimum deposit is <strong>${platformSettings.min_funding || 10.00}</strong>. This balance stays in your account and is only deducted (${(platformSettings.lead_fee || 1.50).toFixed(2)}) when a student messages you from your homepage listing.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Select Funding Amount:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10', '15', '25', '50', '100'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setFundAmount(amt)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          fundAmount === amt
                            ? 'border-theme-primary bg-indigo-50 text-theme-primary ring-2 ring-theme-primary/20'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Or Enter Custom Amount ($):
                  </label>
                  <input
                    type="number"
                    min={platformSettings.min_funding || 10}
                    step="1"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Deposit Amount:</span>
                    <strong className="text-theme-navy">${parseFloat(fundAmount || 0).toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Student Inquiries (@ ${(platformSettings.lead_fee || 1.50).toFixed(2)}/inquiry):</span>
                    <strong className="text-emerald-700 font-bold">
                      {Math.floor((parseFloat(fundAmount || 0)) / (platformSettings.lead_fee || 1.50))} Leads
                    </strong>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md"
                >
                  Deposit ${fundAmount}.00 & Continue
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: Video 2 Player */}
      {video2ModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 space-y-4">
            <div className="p-4 bg-[#0b3c2c] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm font-jost">Phase 2: Monetization & Rate Setting</span>
              </div>
              <button onClick={() => setVideo2ModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between p-4 text-white shadow-inner">
                {platformSettings.training_video_2_url ? (
                  <iframe
                    src={platformSettings.training_video_2_url}
                    title={platformSettings.training_video_2_title || "Training Video 2"}
                    className="w-full h-full rounded-xl border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="text-center z-10 py-6 m-auto">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full mx-auto flex items-center justify-center mb-2 shadow-lg animate-pulse">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <h4 className="font-bold font-jost text-base">{platformSettings.training_video_2_title || "Setting Hourly Rates ($20–$65+/hr)"}</h4>
                    <p className="text-xs text-slate-300">Client Onboarding, Trial Conversions & Rebooking Loops</p>
                  </div>
                )}
              </div>

              <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 text-xs text-emerald-950 space-y-1">
                <div className="font-bold text-emerald-900">{platformSettings.training_video_2_title || "Teacher Monetization & Direct Payout Strategy"}</div>
                <p className="text-slate-600">{platformSettings.training_video_2_description || "Charge for monthly packages (4 or 8 sessions) up front rather than single lessons to secure predictable income."}</p>
              </div>

              <button
                type="button"
                onClick={handleWatchVideo2}
                className="btn-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 bg-emerald-700 hover:bg-emerald-800"
              >
                <Check className="w-4 h-4" />
                <span>Mark Video 2 as Watched & Unlock Step 4</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Payment Channel & Hourly Rate Setup */}
      {channelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-theme-primary" />
                <h3 className="text-lg font-bold font-jost text-theme-navy">
                  Configure Payout & Hourly Rate
                </h3>
              </div>
              <button onClick={() => setChannelModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            {channelSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Payout & Hourly Rate Configured!</div>
                <p className="text-xs">Step 5 (Terms & Activation) is now unlocked.</p>
              </div>
            ) : (
              <form onSubmit={handleSavePaymentChannel} className="space-y-4">
                <p className="text-xs text-slate-500">
                  Set how much you charge students per hour and where students will send lesson fees directly to you.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Hourly Teaching Rate ($/hour):
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="5"
                      max="200"
                      step="1"
                      required
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="e.g. 25"
                      className="w-full pl-8 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl font-bold font-mono text-emerald-600 focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Payout Provider:
                  </label>
                  <select
                    value={channelType}
                    onChange={(e) => setChannelType(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white font-medium"
                  >
                    <option value="PayPal">PayPal</option>
                    <option value="Stripe Connect">Stripe Connect</option>
                    <option value="Wise">Wise (TransferWise)</option>
                    <option value="Direct Bank Wire">Direct Bank Wire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Receiving Email / Account Details:
                  </label>
                  <input
                    type="text"
                    required
                    value={channelAccount}
                    onChange={(e) => setChannelAccount(e.target.value)}
                    placeholder="e.g. yourname@paypal.com or IBAN / account #"
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md"
                >
                  Save Rate & Payout Channel
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 5: Accept Terms & Upgrade */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold font-jost text-theme-navy">
                  Activate Live Teacher Profile
                </h3>
              </div>
              <button onClick={() => setTermsModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            {upgradeSuccess ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold font-jost text-emerald-900">Congratulations! You Are Now a Teacher</h4>
                <p className="text-xs leading-relaxed text-emerald-800">
                  You are now a teacher. You are live on the homepage. Students can message you — each message deducts the platform lead fee (${(platformSettings.lead_fee || 1.50).toFixed(2)}) from your funded balance.
                </p>
                <div className="text-xs font-semibold text-emerald-700 pt-2">
                  Redirecting to your Teacher Dashboard...
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 max-h-48 overflow-y-auto">
                  <h5 className="font-bold text-theme-navy uppercase">Platform Teacher Terms & Conditions:</h5>
                  <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-600">
                    <li>I have completed the training methodology and agree to conduct 45-minute structured lessons.</li>
                    <li>I understand that each direct student message inquiry received via my homepage listing deducts ${(platformSettings.lead_fee || 1.50).toFixed(2)} from my funded wallet balance.</li>
                    <li>I retain 100% of all lesson fees charged directly to my students via my configured payout channel.</li>
                    <li>If my wallet balance falls below ${(platformSettings.lead_fee || 1.50).toFixed(2)}, new incoming messages will be paused until topped up.</li>
                  </ul>
                </div>

                <label className="flex items-start space-x-2.5 text-xs text-slate-700 cursor-pointer p-2 rounded-xl hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>
                    I accept all terms, lead fee policies, and agree to start teaching on the platform.
                  </span>
                </label>

                <button
                  type="button"
                  disabled={!termsAgreed}
                  onClick={handleAcceptTermsAndMonetize}
                  className={`w-full py-3.5 rounded-xl font-jost font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 shadow-md ${
                    termsAgreed
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Activate Profile & Monetize My Skill</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
