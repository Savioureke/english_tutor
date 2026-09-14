import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  teacherRoster, teacherSubmissionsToGrade, teacherTodaySchedule, 
  studentEnrolledCourses 
} from '../../data/mockData';
import { 
  Users, BookOpen, Calendar, CheckSquare, Star, Clock, 
  Video, Award, Plus, CheckCircle2, MessageSquare, 
  Edit3, ArrowRight, UserCheck, AlertCircle, FileText, 
  BarChart3, Upload, Check, Send, Mic
} from 'lucide-react';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'students' | 'courses' | 'grading' | 'schedule'
  const [submissions, setSubmissions] = useState(teacherSubmissionsToGrade);
  const [selectedSubmission, setSelectedSubmission] = useState(teacherSubmissionsToGrade[0]);
  
  // Grading form state
  const [gradeScore, setGradeScore] = useState('8.0');
  const [feedbackNote, setFeedbackNote] = useState('Great pronunciation and vocabulary range! Keep practicing complex sentence connectors.');
  const [gradeSuccess, setGradeSuccess] = useState(false);

  // Live class launch modal
  const [activeClassModal, setActiveClassModal] = useState(null);

  // Add course module modal
  const [addLessonModalOpen, setAddLessonModalOpen] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [addLessonSuccess, setAddLessonSuccess] = useState(false);

  const handleSaveGrade = (e) => {
    e.preventDefault();
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === selectedSubmission.id
          ? { ...sub, status: 'Graded', currentGrade: `Band ${gradeScore}` }
          : sub
      )
    );
    setGradeSuccess(true);
    setTimeout(() => {
      setGradeSuccess(false);
    }, 2500);
  };

  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;
    setAddLessonSuccess(true);
    setTimeout(() => {
      setAddLessonSuccess(false);
      setAddLessonModalOpen(false);
      setNewLessonTitle('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Teacher LMS Header */}
        <div className="bg-gradient-to-r from-[#0b3c2c] via-[#0f5132] to-[#198754] rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"}
                alt={user?.name || "Teacher"}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/30 shadow-md"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs uppercase font-bold tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full">
                    Teacher & Examiner Portal
                  </span>
                  <span className="text-xs bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-slate-900" />
                    <span>4.98 Rating</span>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-jost mt-1">
                  Instructor Workspace: {user?.name || "Emma Watson"}
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100">
                  {user?.qualifications || "MA TESOL • Cambridge CELTA Certified • British English Specialist"}
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('schedule')}
                className="bg-white text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
              >
                <Video className="w-4 h-4 text-emerald-700" />
                <span>Today's Classes (3)</span>
              </button>
              <button
                onClick={() => setActiveTab('grading')}
                className="bg-emerald-900/60 hover:bg-emerald-900 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors border border-white/20 flex items-center space-x-1.5"
              >
                <CheckSquare className="w-4 h-4 text-amber-300" />
                <span>Grade Submissions (2)</span>
              </button>
            </div>
          </div>

          {/* Quick Teacher Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-xs text-emerald-100">Active Students</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5">142 Learners</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-xs text-emerald-100">Total Hours Taught</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5">320 Hours</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-xs text-emerald-100">Pending Reviews</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5 text-amber-300">2 Essays</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-xs text-emerald-100">Course Modules</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5 text-white">3 Courses</div>
            </div>
          </div>
        </div>

        {/* LMS Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-none space-x-2 border-b border-slate-200 pb-2 mb-6">
          {[
            { id: 'overview', label: 'Teacher Overview', icon: BarChart3 },
            { id: 'students', label: 'Student Roster & Progress', icon: Users, badge: '4 Active' },
            { id: 'grading', label: 'Grade Submissions & Essays', icon: CheckSquare, badge: '2 Pending' },
            { id: 'courses', label: 'Course Curriculum Manager', icon: BookOpen },
            { id: 'schedule', label: 'Live Schedule & Availability', icon: Calendar },
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
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: TEACHER OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Today's Schedule Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold font-jost text-lg text-theme-navy">
                    Today's Live Teaching Schedule
                  </h3>
                </div>
                <span className="text-xs text-slate-400">Sep 15, 2026 (UTC)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {teacherTodaySchedule.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3 hover:border-emerald-500/50 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-md">
                          {slot.time}
                        </span>
                        <span className="text-[10px] text-slate-500">{slot.type}</span>
                      </div>

                      <div className="flex items-center space-x-2.5 mt-3">
                        <img
                          src={slot.studentAvatar}
                          alt={slot.student}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-theme-navy">{slot.student}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{slot.topic}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveClassModal(slot)}
                      className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Launch Classroom</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Recent Submissions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Submissions Requiring Feedback */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-5 h-5 text-amber-500" />
                    <h4 className="font-bold font-jost text-lg text-theme-navy">
                      Submissions Awaiting Grading
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveTab('grading')}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    Open Gradebook ›
                  </button>
                </div>

                <div className="space-y-3">
                  {submissions.slice(0, 3).map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubmission(sub);
                        setActiveTab('grading');
                      }}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={sub.studentAvatar}
                          alt={sub.studentName}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-xs text-theme-navy">{sub.studentName}</span>
                            <span className="text-[10px] text-slate-400">({sub.submittedTime})</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">{sub.title}</p>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                          sub.status === 'Graded'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Progress Watch */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-emerald-700" />
                    <h4 className="font-bold font-jost text-lg text-theme-navy">
                      Student Fluency Levels
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveTab('students')}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    Full Roster ›
                  </button>
                </div>

                <div className="space-y-3">
                  {teacherRoster.map((stu) => (
                    <div
                      key={stu.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={stu.avatar}
                          alt={stu.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-xs text-theme-navy">{stu.name}</div>
                          <div className="text-[11px] text-slate-500">{stu.level}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-700">{stu.progress}% Completed</div>
                        <div className="text-[10px] text-slate-400">Attendance: {stu.attendance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 2: STUDENT ROSTER ================= */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-jost text-theme-navy">
                  Active Student Roster & Tracking
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Monitor student attendance, fluency milestones, exam predictions, and send direct instructor feedback notes.
                </p>
              </div>

              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full self-start sm:self-center">
                4 Students in Current Batch
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teacherRoster.map((stu) => (
                <div
                  key={stu.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">{stu.id}</span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          stu.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {stu.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3.5">
                      <img
                        src={stu.avatar}
                        alt={stu.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold font-jost text-base text-theme-navy">{stu.name}</h4>
                        <p className="text-xs text-slate-500">{stu.email}</p>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-md mt-0.5 inline-block">
                          {stu.level}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Enrolled Course:</span>
                        <span className="font-semibold text-theme-navy">{stu.course}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Attendance Rate:</span>
                        <span className="font-semibold text-emerald-700">{stu.attendance}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Next 1-on-1:</span>
                        <span className="font-semibold text-slate-800">{stu.nextSession}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 text-slate-500 italic">
                        <strong>Instructor Note:</strong> "{stu.lastFeedback}"
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      onClick={() => alert(`Direct message dialog opened for ${stu.name}`)}
                      className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                    <button
                      onClick={() => alert(`Full learning profile opened for ${stu.name}`)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: GRADING & ESSAY EVALUATIONS ================= */}
        {activeTab === 'grading' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Submission List */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-base font-bold font-jost text-theme-navy">
                  Submissions Queue
                </h3>
                <p className="text-xs text-slate-500">
                  Select a student assignment to review text/audio and provide band scores.
                </p>

                <div className="space-y-2.5 pt-2">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubmission(sub)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        selectedSubmission.id === sub.id
                          ? 'bg-emerald-50/80 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-theme-navy">{sub.studentName}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sub.status === 'Graded'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium leading-snug">{sub.title}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                        <span>{sub.type}</span>
                        <span>{sub.submittedTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Evaluation & Grading Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <span className="text-xs font-mono text-slate-400">{selectedSubmission.id}</span>
                    <h3 className="text-xl font-bold font-jost text-theme-navy">{selectedSubmission.title}</h3>
                    <p className="text-xs text-slate-500">
                      Student: <strong>{selectedSubmission.studentName}</strong> • {selectedSubmission.course}
                    </p>
                  </div>
                  <img
                    src={selectedSubmission.studentAvatar}
                    alt={selectedSubmission.studentName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                </div>

                {/* Submitted Content Preview */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Student Submission Content:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "In recent years, artificial intelligence has revolutionized classroom pedagogy. While critics argue it diminishes teacher-student rapport, I believe AI platforms provide customized adaptive repetition that accelerates vocabulary acquisition..."
                  </p>
                </div>
              </div>

              {gradeSuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center space-x-2 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Grade and feedback sent to student's LMS dashboard successfully!</span>
                </div>
              )}

              {/* Grading Form */}
              <form onSubmit={handleSaveGrade} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Assigned Score / Band
                    </label>
                    <select
                      value={gradeScore}
                      onChange={(e) => setGradeScore(e.target.value)}
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white font-bold text-emerald-800"
                    >
                      <option value="9.0">Band 9.0 (Expert)</option>
                      <option value="8.5">Band 8.5 (Very Good)</option>
                      <option value="8.0">Band 8.0 (Very Good)</option>
                      <option value="7.5">Band 7.5 (Good)</option>
                      <option value="7.0">Band 7.0 (Good)</option>
                      <option value="6.5">Band 6.5 (Competent)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CEFR Equivalent
                    </label>
                    <input
                      type="text"
                      disabled
                      value={parseFloat(gradeScore) >= 8.0 ? 'C1 Advanced' : 'B2 Upper-Intermediate'}
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-slate-100 text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Line-by-Line Feedback & Examiner Guidance
                  </label>
                  <textarea
                    rows={4}
                    value={feedbackNote}
                    onChange={(e) => setFeedbackNote(e.target.value)}
                    required
                    className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Evaluation & Notify Student</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= TAB 4: COURSE CURRICULUM MANAGER ================= */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-jost text-theme-navy">
                  Course Management & Syllabus Editor
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Update syllabus modules, upload downloadable PDF handouts, and add new video lessons.
                </p>
              </div>

              <button
                onClick={() => setAddLessonModalOpen(true)}
                className="btn-primary text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md flex items-center space-x-2 self-start sm:self-center bg-emerald-700 hover:bg-emerald-800"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Lesson Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studentEnrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-36 rounded-2xl object-cover"
                    />
                    <div className="text-xs font-bold text-emerald-700">{course.category}</div>
                    <h4 className="font-bold font-jost text-base text-theme-navy leading-snug">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-500">Total Lessons: {course.totalLessons} Modules</p>
                  </div>

                  <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setAddLessonModalOpen(true)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Lessons</span>
                    </button>
                    <button
                      onClick={() => alert(`Analytics for ${course.title} opened`)}
                      className="px-3 py-2 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl"
                    >
                      Stats
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: SCHEDULE & AVAILABILITY ================= */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-jost text-theme-navy">
                  Instructor Schedule & Calendar Availability
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Set open tutoring slots for international students and launch live classroom meeting rooms.
                </p>
              </div>

              <button
                onClick={() => alert("Availability calendar updated with open 1-on-1 slots.")}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors"
              >
                + Open New Time Slot
              </button>
            </div>

            <div className="space-y-4">
              {teacherTodaySchedule.map((slot) => (
                <div
                  key={slot.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={slot.studentAvatar}
                      alt={slot.student}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold font-jost text-base text-theme-navy">{slot.student}</span>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          {slot.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">Topic: {slot.topic}</p>
                      <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{slot.time} • {slot.type}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveClassModal(slot)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-1.5 self-start sm:self-center"
                  >
                    <Video className="w-4 h-4" />
                    <span>Launch Live Meeting</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* TEACHER CLASSROOM MODAL */}
      {activeClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-3xl bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="p-4 bg-slate-800 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <span className="font-bold text-sm font-jost">
                  Live Classroom: {activeClassModal.student}
                </span>
              </div>
              <button
                onClick={() => setActiveClassModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative aspect-video rounded-2xl bg-slate-800 overflow-hidden border border-slate-700 flex items-center justify-center">
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"}
                    alt="Instructor"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">
                    You ({user?.name || "Instructor Emma"})
                  </div>
                </div>

                <div className="relative aspect-video rounded-2xl bg-slate-800 overflow-hidden border border-slate-700 flex items-center justify-center">
                  <img
                    src={activeClassModal.studentAvatar}
                    alt={activeClassModal.student}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">
                    {activeClassModal.student}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl text-xs space-y-1 text-slate-300">
                <div className="font-semibold text-white">Lesson Subject:</div>
                <p>"{activeClassModal.topic}"</p>
              </div>

              <div className="flex items-center justify-center space-x-4 pt-2">
                <button
                  onClick={() => alert("Microphone toggled")}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={() => alert("Camera toggled")}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white"
                >
                  <Video className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveClassModal(null)}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold text-xs transition-colors"
                >
                  End Classroom Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD LESSON MODAL */}
      {addLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-jost text-theme-navy">
                Add Lesson Video / Handout
              </h3>
              <button onClick={() => setAddLessonModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            {addLessonSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Lesson Added to Curriculum!</div>
                <p className="text-xs">Students enrolled in this course can now access this video and worksheet.</p>
              </div>
            ) : (
              <form onSubmit={handleAddLesson} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Course</label>
                  <select className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white">
                    <option>Conversational English Fluency</option>
                    <option>IELTS Academic Band 7.5+ Masterclass</option>
                    <option>Executive Business English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Lesson Title</label>
                  <input
                    type="text"
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="e.g. 2.4 Mastering Natural Fillers and Transition Words"
                    required
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Video Stream URL / Embed</label>
                  <input
                    type="text"
                    defaultValue="https://www.youtube.com/embed/sample"
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  Publish Lesson to Course
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
