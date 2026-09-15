import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  X, Send, User, Mail, Phone, MessageSquare, CheckCircle2, 
  AlertCircle, Star, ShieldCheck, Sparkles, DollarSign, Calendar, BookOpen
} from 'lucide-react';

export default function InquiryModal() {
  const { 
    inquiryModalTeacher, 
    setInquiryModalTeacher, 
    createLessonBooking,
    submitStudentInquiry, 
    platformSettings 
  } = usePortal();

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [lessonTopic, setLessonTopic] = useState('1-on-1 Spoken Fluency & Conversation');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!inquiryModalTeacher) return null;

  const teacherRate = inquiryModalTeacher.hourly_rate || 25.00;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim() || !studentEmail.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);

    const res = await createLessonBooking({
      teacher_id: inquiryModalTeacher.id || 'tch-201',
      teacher_name: inquiryModalTeacher.name || inquiryModalTeacher.full_name,
      student_name: studentName,
      student_email: studentEmail,
      student_phone: studentPhone,
      hourly_rate: teacherRate,
      lesson_topic: lessonTopic,
      message,
    });

    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || "This teacher's account cannot receive new messages right now.");
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setInquiryModalTeacher(null);
        setStudentName('');
        setStudentEmail('');
        setStudentPhone('');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-theme-navy via-[#1b236d] to-theme-primary px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={inquiryModalTeacher.image || inquiryModalTeacher.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"}
              alt={inquiryModalTeacher.name || inquiryModalTeacher.full_name}
              className="w-12 h-12 rounded-xl object-cover border border-white/30"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/30 text-emerald-300 px-2 py-0.2 rounded-full">
                  Direct Tutor Inquiry
                </span>
                <span className="text-[10px] text-amber-300 flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-300" /> 4.9+
                </span>
              </div>
              <h3 className="text-lg font-bold font-jost mt-0.5">
                Message {inquiryModalTeacher.name || inquiryModalTeacher.full_name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setInquiryModalTeacher(null)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {success ? (
            <div className="p-6 bg-emerald-50 text-emerald-900 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold font-jost text-emerald-950">Inquiry Sent Successfully!</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Your message has been delivered to <strong>{inquiryModalTeacher.name || inquiryModalTeacher.full_name}</strong>. They will review your goals and reply directly to your email with available lesson slots.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <p className="text-xs text-slate-500">
                Send a direct message to discuss learning goals, custom 1-on-1 schedules, or trial lesson booking.
              </p>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <span className="font-semibold">{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Maria Santos"
                    className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="maria@example.com"
                      className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary"
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
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="+1 555 123 4567"
                      className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Message & Target Goals *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current English level and what you want to focus on (e.g. IELTS Speaking, Pronunciation, Business English)..."
                  className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Inquiry to Teacher'}</span>
              </button>
            </form>
          )}
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Inquiry System</span>
          </div>
          <span>Lead fee deducted automatically</span>
        </div>
      </div>
    </div>
  );
}
