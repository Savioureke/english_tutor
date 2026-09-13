import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 6000);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <PageHeader
        title="Contact ENGtutor"
        subtitle="Get in touch with our English student advisors. Book your free 1-on-1 placement assessment or ask any questions."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <section className="py-16 lg:py-24 bg-[#f8f9fc]">
        <div className="container mx-auto">
          
          {/* Top 4 Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-theme-primary/10 text-theme-primary flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-bold font-jost text-theme-navy text-lg mb-1">London Academy</h4>
              <p className="text-xs sm:text-sm text-slate-500">124 King Street, London, United Kingdom</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-theme-coral/10 text-theme-coral flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="font-bold font-jost text-theme-navy text-lg mb-1">Direct Hotline</h4>
              <p className="text-xs sm:text-sm text-slate-500">+1 (234) 567-890<br />+1 (987) 654-321</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-bold font-jost text-theme-navy text-lg mb-1">Student Support</h4>
              <p className="text-xs sm:text-sm text-slate-500">support@engtutor.com<br />admissions@engtutor.com</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold font-jost text-theme-navy text-lg mb-1">Tutoring Hours</h4>
              <p className="text-xs sm:text-sm text-slate-500">24/7 Global Timezone Availability<br />Live Sessions on Zoom / WebRTC</p>
            </div>
          </div>

          {/* Form and Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Form (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-100">
              <div className="mb-8">
                <span className="section-title-tag">Get Started</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-jost text-theme-navy mt-1">
                  Book a Free Level Assessment or Send an Inquiry
                </h3>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-700 flex items-center space-x-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                  <span>Thank you! We received your message and an English advisor will reach out to you within 24 hours.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold font-jost text-theme-navy uppercase tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Elena Gomez"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-jost text-theme-navy uppercase tracking-wider mb-2">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. elena@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold font-jost text-theme-navy uppercase tracking-wider mb-2">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 555 123 4567"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-jost text-theme-navy uppercase tracking-wider mb-2">
                      Goal / Learning Interest
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. IELTS Exam Prep / Spoken Fluency"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold font-jost text-theme-navy uppercase tracking-wider mb-2">
                    Your Message / Target Goals *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us your current English level and what you want to achieve..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-theme-primary"
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm">
                  <span>Send Message & Book Test</span>
                  <Send className="w-4 h-4 ml-2" />
                </button>
              </form>
            </div>

            {/* Location & Academy Preview (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold font-jost text-theme-navy mb-4">
                  Visit ENGtutor Language Center
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Experience interactive smart classrooms, meet our certified native English instructors in person, and take a free CEFR diagnostic exam.
                </p>
              </div>

              {/* Map Container */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 relative">
                <iframe
                  title="Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.47340051187!2d-0.2416815340636259!3d51.52855824174823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
