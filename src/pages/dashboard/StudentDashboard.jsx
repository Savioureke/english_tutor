import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  studentEnrolledCourses, upcomingLiveSessions, studentAssignments, 
  vocabularyCards, studentCertificates 
} from '../../data/mockData';
import { 
  BookOpen, Calendar, Video, Award, CheckCircle2, Clock, 
  Flame, Play, ChevronRight, FileText, Volume2, Mic, 
  Sparkles, ExternalLink, Plus, Star, BarChart3, User, 
  ArrowRight, Download, MessageSquare, AlertCircle, Check
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'courses' | 'tutoring' | 'assignments' | 'vocab' | 'certificates'
  const [selectedCourse, setSelectedCourse] = useState(studentEnrolledCourses[0]);
  const [activeLesson, setActiveLesson] = useState(studentEnrolledCourses[0].modules[1].lessons[2]);
  const [completedLessonIds, setCompletedLessonIds] = useState([101, 102, 103, 104, 105, 201, 202, 203]);
  const [vocabIndex, setVocabIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Live session modal state
  const [liveModalSession, setLiveModalSession] = useState(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [newBooking, setNewBooking] = useState({
    tutor: 'Emma Watson',
    date: 'Sep 19, 2026',
    time: '11:00 AM (UTC)',
    topic: 'Conversational Fluency & Idioms',
  });

  // Assignment submission state
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [newAssignmentText, setNewAssignmentText] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Speech practice recorder state
  const [isRecordingPractice, setIsRecordingPractice] = useState(false);
  const [practiceTimer, setPracticeTimer] = useState(0);

  const toggleLessonCompleted = (lessonId) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleSpeakWord = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleBookSession = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookModalOpen(false);
    }, 2000);
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setSubmitModalOpen(false);
      setNewAssignmentText('');
    }, 2000);
  };

  const currentVocab = vocabularyCards[vocabIndex];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Student LMS Header */}
        <div className="bg-gradient-to-r from-theme-navy via-[#1b236d] to-theme-primary rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                alt={user?.name || "Student"}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/30 shadow-md"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs uppercase font-bold tracking-wider bg-theme-coral/20 text-theme-coral px-2.5 py-0.5 rounded-full">
                    Student LMS Portal
                  </span>
                  <span className="text-xs bg-white/10 text-white/90 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>14 Day Streak</span>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-jost mt-1">
                  Welcome back, {user?.name || "Alex Morgan"}!
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Target: {user?.targetExam || "IELTS Band 7.5+"} • Level: {user?.level || "B2 Upper Intermediate"}
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setBookModalOpen(true)}
                className="btn-primary text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md flex items-center space-x-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 1-on-1 Lesson</span>
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors border border-white/20 flex items-center space-x-1.5"
              >
                <Play className="w-4 h-4" />
                <span>Resume Learning</span>
              </button>
            </div>
          </div>

          {/* Quick LMS Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-xs text-slate-300">Enrolled Courses</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5">3 Active</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-xs text-slate-300">Speaking Practice</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5">38.5 Hours</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-xs text-slate-300">Fluency Score</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5 text-emerald-300">78% (B2+)</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-xs text-slate-300">Certificates Earned</div>
              <div className="text-xl sm:text-2xl font-bold font-jost mt-0.5 text-amber-300">2 CEFR</div>
            </div>
          </div>
        </div>

        {/* LMS Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-none space-x-2 border-b border-slate-200 pb-2 mb-6">
          {[
            { id: 'overview', label: 'Overview & Goals', icon: BarChart3 },
            { id: 'courses', label: 'My Courses & Lessons', icon: BookOpen },
            { id: 'tutoring', label: 'Live 1-on-1 Tutoring', icon: Video, badge: 'Next: Tomorrow' },
            { id: 'assignments', label: 'Assignments & IELTS Scoring', icon: FileText },
            { id: 'vocab', label: 'Speaking & Vocab Lab', icon: Mic },
            { id: 'certificates', label: 'Certificates & Badges', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-jost font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-theme-primary text-white shadow-md shadow-theme-primary/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Active Course Continue Banner */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center space-x-2 text-xs text-theme-primary font-semibold">
                  <span className="w-2 h-2 rounded-full bg-theme-primary animate-ping"></span>
                  <span>Currently In Progress</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-jost text-theme-navy">
                  Conversational English Fluency: Speak Naturally in 30 Days
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Up next: <strong>Lesson 18: Eliminating Accent Blockers (Th, R, L sounds)</strong> with Tutor Emma Watson.
                </p>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Overall Course Completion</span>
                    <span className="font-bold text-theme-primary">72% (17/24 Lessons)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-theme-primary h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <div className="w-12 h-12 rounded-full bg-theme-primary/10 text-theme-primary flex items-center justify-center mb-2">
                  <Play className="w-6 h-6 ml-0.5" />
                </div>
                <button
                  onClick={() => {
                    setSelectedCourse(studentEnrolledCourses[0]);
                    setActiveTab('courses');
                  }}
                  className="btn-primary w-full py-2.5 rounded-xl text-xs sm:text-sm shadow-md"
                >
                  Resume Video Lesson
                </button>
                <span className="text-[11px] text-slate-400 mt-1.5">Estimated duration: 35 mins</span>
              </div>
            </div>

            {/* Two-Column Grid: Live Classes & Assignments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Upcoming Live Sessions Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-theme-coral" />
                    <h4 className="font-bold font-jost text-lg text-theme-navy">
                      Upcoming 1-on-1 Tutoring
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveTab('tutoring')}
                    className="text-xs font-semibold text-theme-primary hover:underline flex items-center"
                  >
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {upcomingLiveSessions.slice(0, 2).map((session) => (
                    <div
                      key={session.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-theme-primary/40 transition-all"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={session.tutorAvatar}
                          alt={session.tutor}
                          className="w-11 h-11 rounded-xl object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-xs sm:text-sm text-theme-navy">{session.tutor}</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.2 rounded-full">
                              {session.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium mt-0.5">{session.title}</p>
                          <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{session.date} • {session.time}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setLiveModalSession(session)}
                        className="btn-primary text-xs px-3.5 py-2 rounded-lg self-start sm:self-center shadow-xs"
                      >
                        Join Room
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignments & Quizzes Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-theme-primary" />
                    <h4 className="font-bold font-jost text-lg text-theme-navy">
                      Recent Task & IELTS Scores
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveTab('assignments')}
                    className="text-xs font-semibold text-theme-primary hover:underline flex items-center"
                  >
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {studentAssignments.map((asg) => (
                    <div
                      key={asg.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <h5 className="font-bold text-xs sm:text-sm text-theme-navy">{asg.title}</h5>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{asg.course}</p>
                        <span className="text-[10px] text-slate-400">Due: {asg.dueDate}</span>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                            asg.status === 'Graded'
                              ? 'bg-emerald-100 text-emerald-800'
                              : asg.status === 'Submitted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {asg.score !== '--' ? asg.score : asg.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 2: MY COURSES & LESSON PLAYER ================= */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Video Player & Active Lesson Notes */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                {/* Simulated Lesson Video Player */}
                <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden shadow-lg flex flex-col justify-between p-6 text-white group">
                  <div className="flex justify-between items-center z-10">
                    <span className="bg-theme-coral px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Module 2 • Lesson 2.3
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono">
                      35:00 Mins
                    </span>
                  </div>

                  {/* Big Play Button Overlay */}
                  <div className="flex flex-col items-center justify-center space-y-3 z-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-theme-primary/90 text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-xl border-4 border-white/20">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <span className="text-sm font-semibold tracking-wide drop-shadow">
                      Click to Play: {activeLesson?.title || "Eliminating Accent Blockers"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 z-10">
                    <span>Instructor: {selectedCourse.instructor}</span>
                    <span>HD 1080p • Interactive Transcript Enabled</span>
                  </div>

                  {/* Background decoration */}
                  <img
                    src={selectedCourse.thumbnail}
                    alt={selectedCourse.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Lesson Header & Mark Completed Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div>
                    <h3 className="text-xl font-bold font-jost text-theme-navy">
                      {activeLesson?.title || "2.3 Eliminating Accent Blockers (Th, R, L sounds)"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Course: {selectedCourse.title}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleLessonCompleted(activeLesson?.id || 106)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                      completedLessonIds.includes(activeLesson?.id || 106)
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>
                      {completedLessonIds.includes(activeLesson?.id || 106)
                        ? 'Completed ✓'
                        : 'Mark as Completed'}
                    </span>
                  </button>
                </div>

                {/* Lesson Notes & Downloadables */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h4 className="font-bold text-sm text-theme-navy">Lesson Notes & Key Takeaways:</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
                    <li>Place tongue between teeth lightly for the unvoiced /θ/ sound (e.g. *think, through, thought*).</li>
                    <li>Avoid substituting 'd' or 'z' for the voiced /ð/ sound (*this, that, these*).</li>
                    <li>Download the British Pronunciation phonetic drill sheet below for daily mouth exercises.</li>
                  </ul>

                  <div className="flex items-center space-x-3 pt-2">
                    <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Worksheet</span>
                    </button>
                    <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors">
                      <Volume2 className="w-3.5 h-3.5 text-theme-primary" />
                      <span>Audio Practice MP3</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Course Curriculum Syllabus */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div>
                  <span className="text-[11px] uppercase font-bold text-theme-primary font-jost">Course Curriculum</span>
                  <h4 className="font-bold font-jost text-base text-theme-navy leading-tight mt-0.5">
                    {selectedCourse.title}
                  </h4>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-theme-primary h-2 rounded-full"
                      style={{ width: `${selectedCourse.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Module Syllabus List */}
                <div className="space-y-4">
                  {selectedCourse.modules ? (
                    selectedCourse.modules.map((mod, mIdx) => (
                      <div key={mIdx} className="space-y-2">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {mod.title}
                        </div>
                        <div className="space-y-1.5">
                          {mod.lessons.map((les) => {
                            const isDone = completedLessonIds.includes(les.id);
                            const isCur = activeLesson?.id === les.id;
                            return (
                              <button
                                key={les.id}
                                onClick={() => setActiveLesson(les)}
                                className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                                  isCur
                                    ? 'bg-theme-primary text-white font-semibold shadow-xs'
                                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleLessonCompleted(les.id);
                                    }}
                                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] cursor-pointer ${
                                      isDone
                                        ? isCur ? 'bg-white text-theme-primary' : 'bg-emerald-600 text-white'
                                        : 'border border-slate-400'
                                    }`}
                                  >
                                    {isDone && '✓'}
                                  </div>
                                  <span className="line-clamp-1">{les.title}</span>
                                </div>
                                <span className={`text-[10px] ml-2 ${isCur ? 'text-white/80' : 'text-slate-400'}`}>
                                  {les.duration}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500">Modules loaded for selected course.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: LIVE 1-ON-1 TUTORING ================= */}
        {activeTab === 'tutoring' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-xl font-bold font-jost text-theme-navy">
                  1-on-1 Live Tutoring Classroom
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Connect live via high-definition video with certified native English speakers for intensive dialogues and exam mock tests.
                </p>
              </div>

              <button
                onClick={() => setBookModalOpen(true)}
                className="btn-primary text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md flex items-center space-x-2 self-start sm:self-center"
              >
                <Plus className="w-4 h-4" />
                <span>Book New Tutoring Session</span>
              </button>
            </div>

            {/* Sessions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingLiveSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                        {session.status}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">45 Mins</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <img
                        src={session.tutorAvatar}
                        alt={session.tutor}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold font-jost text-base text-theme-navy">{session.tutor}</h4>
                        <p className="text-xs text-slate-500">Native British Specialist</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
                      <div className="font-semibold text-theme-navy">{session.title}</div>
                      <div className="text-slate-500 italic">Topic: "{session.topic}"</div>
                      <div className="flex items-center space-x-1.5 text-slate-500 pt-1">
                        <Clock className="w-3.5 h-3.5 text-theme-primary" />
                        <span>{session.date} • {session.time}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setLiveModalSession(session)}
                    className="btn-primary w-full py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <Video className="w-4 h-4" />
                    <span>Enter Live Classroom</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: ASSIGNMENTS & IELTS GRADING ================= */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-xl font-bold font-jost text-theme-navy">
                  IELTS & English Writing/Speaking Evaluations
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Submit practice essays and audio recordings to receive line-by-line feedback and official CEFR/IELTS band score breakdowns.
                </p>
              </div>

              <button
                onClick={() => setSubmitModalOpen(true)}
                className="btn-primary text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md flex items-center space-x-2 self-start sm:self-center"
              >
                <Plus className="w-4 h-4" />
                <span>Submit New Task</span>
              </button>
            </div>

            <div className="space-y-4">
              {studentAssignments.map((asg) => (
                <div
                  key={asg.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-slate-400">{asg.id}</span>
                        <h4 className="font-bold font-jost text-base sm:text-lg text-theme-navy">{asg.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500">{asg.course}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">Due: {asg.dueDate}</span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-xl ${
                          asg.status === 'Graded'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {asg.status} {asg.score !== '--' && `(${asg.score})`}
                      </span>
                    </div>
                  </div>

                  {/* Feedback Box */}
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                    <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                      <MessageSquare className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
                      <div>
                        <strong>Tutor Assessment & Examiner Notes:</strong>
                        <p className="text-slate-600 mt-0.5">{asg.feedback}</p>
                      </div>
                    </div>

                    {/* Band breakdown if available */}
                    {asg.criteria && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200">
                        {asg.criteria.map((cr, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-center">
                            <div className="text-[11px] text-slate-500 line-clamp-1">{cr.name}</div>
                            <div className="text-sm font-bold text-theme-primary font-jost mt-0.5">
                              Band {cr.score}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: VOCAB & SPEAKING LAB ================= */}
        {activeTab === 'vocab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Interactive Flashcard Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-theme-primary" />
                    <h3 className="font-bold font-jost text-lg text-theme-navy">
                      Vocabulary & Speech Practice Lab
                    </h3>
                  </div>
                  <span className="text-xs bg-theme-primary/10 text-theme-primary font-bold px-2.5 py-0.5 rounded-full">
                    Card {vocabIndex + 1} of {vocabularyCards.length}
                  </span>
                </div>

                {/* 3D Flashcard Box */}
                <div
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="w-full min-h-[240px] bg-gradient-to-br from-indigo-50/90 via-blue-50/60 to-purple-50/80 rounded-2xl p-6 border border-indigo-100 cursor-pointer shadow-inner flex flex-col justify-between transition-transform hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-full border border-indigo-100">
                      {currentVocab.level}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakWord(currentVocab.word);
                      }}
                      className="p-2 rounded-full bg-white text-theme-primary hover:bg-theme-primary hover:text-white transition-colors shadow-xs"
                      title="Pronounce Word"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-center py-4">
                    <h2 className="text-3xl font-extrabold font-jost text-theme-navy">
                      {currentVocab.word}
                    </h2>
                    <p className="text-sm font-mono text-slate-500 mt-1">
                      {currentVocab.phonetic} • <span className="italic">{currentVocab.partOfSpeech}</span>
                    </p>
                    <p className="text-sm text-slate-700 mt-3 max-w-md mx-auto leading-relaxed">
                      "{currentVocab.definition}"
                    </p>
                  </div>

                  <div className="text-center text-xs text-indigo-600 font-medium bg-white/80 p-2 rounded-xl border border-indigo-50">
                    <strong>Example:</strong> "{currentVocab.example}"
                  </div>
                </div>
              </div>

              {/* Flashcard navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setVocabIndex((prev) => (prev > 0 ? prev - 1 : vocabularyCards.length - 1));
                    setIsCardFlipped(false);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  ‹ Previous Word
                </button>
                <button
                  onClick={() => {
                    handleSpeakWord(`${currentVocab.word}. ${currentVocab.example}`);
                  }}
                  className="btn-outline px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen Full Sentence</span>
                </button>
                <button
                  onClick={() => {
                    setVocabIndex((prev) => (prev < vocabularyCards.length - 1 ? prev + 1 : 0));
                    setIsCardFlipped(false);
                  }}
                  className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold shadow-md"
                >
                  Next Word ›
                </button>
              </div>
            </div>

            {/* Speaking Recorder Simulation */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-bold font-jost text-lg text-theme-navy mb-1">
                  Spontaneous Fluency Recorder
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Practice speaking on random IELTS topics. The audio evaluator simulates tone, speed, and filler word detection.
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-2">
                  <span className="font-bold text-theme-navy">Today's Topic Prompt:</span>
                  <p className="text-slate-700 italic">
                    "Describe a memorable journey you took with friends or family. Where did you go, who was with you, and why was it special?"
                  </p>
                </div>
              </div>

              {/* Mic action & audio wave animation */}
              <div className="flex flex-col items-center justify-center py-6 space-y-3">
                <button
                  onClick={() => {
                    if (!isRecordingPractice) {
                      setIsRecordingPractice(true);
                      setPracticeTimer(0);
                    } else {
                      setIsRecordingPractice(false);
                    }
                  }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-xl ${
                    isRecordingPractice
                      ? 'bg-red-500 animate-pulse ring-8 ring-red-100'
                      : 'bg-theme-primary hover:bg-theme-navy'
                  }`}
                >
                  <Mic className="w-8 h-8" />
                </button>

                <span className="text-xs font-semibold text-slate-700">
                  {isRecordingPractice ? 'Recording in progress... Speak now!' : 'Click Microphone to Start Speaking'}
                </span>

                {isRecordingPractice && (
                  <div className="flex items-center space-x-1 pt-2">
                    <span className="w-1.5 h-6 bg-red-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-10 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-4 bg-red-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    <span className="w-1.5 h-8 bg-red-600 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                  </div>
                )}
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Audio is analyzed directly in the browser with instant playback.</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: CERTIFICATES ================= */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h3 className="text-xl font-bold font-jost text-theme-navy">
                Accredited English Language Certificates
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                All certificates are issued under international CEFR guidelines with unique verifiable credential IDs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md relative overflow-hidden flex flex-col justify-between space-y-4"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/40 to-transparent rounded-bl-full pointer-events-none"></div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-amber-600">
                      <Award className="w-6 h-6" />
                      <span className="text-xs font-bold uppercase tracking-wider font-jost">Official Certificate</span>
                    </div>

                    <h4 className="text-lg font-bold font-jost text-theme-navy">{cert.title}</h4>
                    <p className="text-xs text-slate-500">{cert.issuedBy}</p>

                    <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-xs text-slate-600 font-mono">
                      <div><span className="text-slate-400">Credential ID:</span> {cert.credentialId}</div>
                      <div><span className="text-slate-400">Awarded:</span> {cert.date} • {cert.grade}</div>
                      <div><span className="text-slate-400">Signatory:</span> {cert.tutor}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={() => alert(`Certificate ${cert.credentialId} downloaded successfully as PDF!`)}
                      className="btn-primary text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                    <button
                      onClick={() => alert(`Credential ${cert.credentialId} verified on CEFR Registry.`)}
                      className="btn-outline text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Credential</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* LIVE CLASSROOM VIDEO MODAL */}
      {liveModalSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-3xl bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="p-4 bg-slate-800 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <span className="font-bold text-sm font-jost">{liveModalSession.title}</span>
              </div>
              <button
                onClick={() => setLiveModalSession(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tutor Video Mock */}
                <div className="relative aspect-video rounded-2xl bg-slate-800 overflow-hidden border border-slate-700 flex items-center justify-center">
                  <img
                    src={liveModalSession.tutorAvatar}
                    alt={liveModalSession.tutor}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">
                    {liveModalSession.tutor} (Native Tutor)
                  </div>
                </div>

                {/* Student Video Mock */}
                <div className="relative aspect-video rounded-2xl bg-slate-800 overflow-hidden border border-slate-700 flex items-center justify-center">
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">
                    You ({user?.name || "Student"})
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl text-xs space-y-1 text-slate-300">
                <div className="font-semibold text-white">Live Discussion Agenda:</div>
                <p>"{liveModalSession.topic}"</p>
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
                  onClick={() => setLiveModalSession(null)}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold text-xs transition-colors"
                >
                  Leave Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOK 1-ON-1 LESSON MODAL */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-jost text-theme-navy">
                Book 1-on-1 English Session
              </h3>
              <button onClick={() => setBookModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Session Booked Successfully!</div>
                <p className="text-xs">Your lesson slot has been confirmed in your Live Tutoring schedule.</p>
              </div>
            ) : (
              <form onSubmit={handleBookSession} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Certified Tutor</label>
                  <select
                    value={newBooking.tutor}
                    onChange={(e) => setNewBooking({ ...newBooking, tutor: e.target.value })}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="Emma Watson">Emma Watson (British Pronunciation & Fluency)</option>
                    <option value="Michael Davies">Michael Davies (IELTS Senior Examiner)</option>
                    <option value="Sophia Rodriguez">Sophia Rodriguez (Executive Business English)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                    <input
                      type="text"
                      value={newBooking.date}
                      onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                    <select
                      value={newBooking.time}
                      onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                    >
                      <option value="10:00 AM (UTC)">10:00 AM (UTC)</option>
                      <option value="02:00 PM (UTC)">02:00 PM (UTC)</option>
                      <option value="04:30 PM (UTC)">04:30 PM (UTC)</option>
                      <option value="07:00 PM (UTC)">07:00 PM (UTC)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Practice Focus / Topic</label>
                  <input
                    type="text"
                    value={newBooking.topic}
                    onChange={(e) => setNewBooking({ ...newBooking, topic: e.target.value })}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-theme-primary hover:bg-theme-navy text-white text-xs font-bold rounded-xl shadow-md transition-colors mt-2"
                >
                  Confirm 1-on-1 Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SUBMIT ASSIGNMENT MODAL */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-jost text-theme-navy">
                Submit IELTS / Writing Task
              </h3>
              <button onClick={() => setSubmitModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            {submittedSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Assignment Submitted for Grading!</div>
                <p className="text-xs">Your instructor will evaluate your essay and provide detailed band criteria feedback.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitAssignment} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Assignment Title</label>
                  <input
                    type="text"
                    defaultValue="IELTS Writing Task 2: Technology in Remote Learning"
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Paste Your Essay Content (250+ Words)</label>
                  <textarea
                    rows={5}
                    value={newAssignmentText}
                    onChange={(e) => setNewAssignmentText(e.target.value)}
                    placeholder="Write or paste your essay here..."
                    required
                    className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-theme-primary hover:bg-theme-navy text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  Submit for Examiner Evaluation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
