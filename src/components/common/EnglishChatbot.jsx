import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, 
  Bot, User, CheckCircle2, Clock, Calendar, HelpCircle, FileText, 
  ChevronDown, ExternalLink, Headphones, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function EnglishChatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'requests'
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [droppedRequests, setDroppedRequests] = useState([
    {
      id: "REQ-1092",
      title: "1-on-1 IELTS Mock Speaking Session Request",
      tutor: "Emma Watson",
      time: "Today at 09:30 AM",
      status: "Confirmed",
      category: "Tutoring Booking",
      note: "Scheduled for Tomorrow at 10:00 AM UTC"
    },
    {
      id: "REQ-1088",
      title: "Grammar Review for Subjunctive Conditionals",
      tutor: "Academic Support Team",
      time: "Yesterday",
      status: "Resolved",
      category: "Grammar Help",
      note: "Answered with practice worksheet."
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'there'}! 👋 I'm your AI English Tutor & LMS Assistant. How can I help you today? You can type or click the microphone to speak your request verbally.`,
      time: 'Just now',
      quickSuggestions: [
        "Book a 1-on-1 speaking session",
        "Explain Present Perfect vs Past Simple",
        "How do IELTS band scores work?",
        "Drop a request for my tutor",
        "Where can I find my course certificates?"
      ]
    }
  ]);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition if supported in browser
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

  // Text to speech helper
  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // stop previous
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const handleSendMessage = (textToSend = inputText) => {
    const query = textToSend.trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent AI response based on query keywords
    setTimeout(() => {
      let botReply = '';
      let isDropRequest = false;
      const lower = query.toLowerCase();

      if (lower.includes('book') || lower.includes('session') || lower.includes('schedule') || lower.includes('lesson')) {
        botReply = `I've logged a 1-on-1 tutoring booking request for you with native tutor Emma Watson! You can check the "Dropped Requests" tab or go to your Live Tutoring section to join tomorrow's session at 10:00 AM UTC.`;
        isDropRequest = true;
        setDroppedRequests((prev) => [
          {
            id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
            title: `Tutoring Session Booking: ${query.slice(0, 40)}...`,
            tutor: "Emma Watson",
            time: "Just now",
            status: "Confirmed",
            category: "Tutoring Booking",
            note: "Slot reserved in your LMS Live Schedule"
          },
          ...prev
        ]);
      } else if (lower.includes('present perfect') || lower.includes('past simple') || lower.includes('grammar') || lower.includes('tense')) {
        botReply = `Great grammar question! 🌟 The **Present Perfect** (*"I have lived here for 2 years"*) connects a past action to the present moment, whereas the **Past Simple** (*"I lived here in 2020"*) refers to a completed action at a specific finished time. Check out Module 1 in your Conversational English course for interactive exercises!`;
      } else if (lower.includes('ielts') || lower.includes('toefl') || lower.includes('band') || lower.includes('score')) {
        botReply = `Our IELTS Band 7.5+ Masterclass assesses you across four key criteria: 1) Task Achievement, 2) Coherence & Cohesion, 3) Lexical Resource, and 4) Grammatical Range. Your recent submitted essay scored a strong **Band 7.5**! Would you like me to book a mock speaking interview?`;
      } else if (lower.includes('certificate') || lower.includes('degree') || lower.includes('cefr')) {
        botReply = `Your official CEFR B2 Distinction certificate (Credential ID: ENG-B2-2026-98144) is available in your LMS Dashboard under the "Certificates" tab. You can download it as PDF or add it directly to LinkedIn!`;
      } else if (lower.includes('request') || lower.includes('help') || lower.includes('tutor') || lower.includes('teacher')) {
        botReply = `Your custom request has been recorded and dispatched to our Senior Tutoring Board. We will review your prompt and respond directly through your LMS message inbox.`;
        isDropRequest = true;
        setDroppedRequests((prev) => [
          {
            id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
            title: `Student Support Request: ${query.slice(0, 45)}...`,
            tutor: "Lead Academic Advisor",
            time: "Just now",
            status: "In Review",
            category: "General Inquiry",
            note: "Advisor assigned"
          },
          ...prev
        ]);
      } else {
        botReply = `Thank you for sharing: "${query}". I have noted your learning query. Feel free to explore your LMS modules, book a live speaking drill, or drop additional questions at any time!`;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Speak response if voice enabled
      if (voiceEnabled) {
        speakText(botReply.replace(/[*#]/g, ''));
      }
    }, 600);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-3 bg-gradient-to-r from-theme-primary to-theme-navy text-white px-4 py-3.5 rounded-full shadow-2xl hover:shadow-theme-primary/40 hover:scale-105 transition-all duration-300 border-2 border-white/20"
            aria-label="Open English AI Assistant"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-theme-coral animate-bounce" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-theme-navy"></span>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold font-jost uppercase tracking-wider">
                English AI Tutor & Requests
              </div>
              <div className="text-[10px] text-white/80 flex items-center gap-1">
                <span>Text & Voice Speech</span>
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Chatbot Window Modal/Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-theme-navy via-[#1c246f] to-theme-primary text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-6 h-6 text-theme-coral" />
                <span className="absolute 0 bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-theme-navy"></span>
              </div>
              <div>
                <h3 className="font-bold font-jost text-sm sm:text-base leading-tight">
                  ENGtutor AI Assistant
                </h3>
                <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Online • Voice & Text Active
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {/* Voice toggle */}
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  voiceEnabled ? 'bg-white/20 text-white' : 'text-white/60 hover:bg-white/10'
                }`}
                title={voiceEnabled ? 'Voice Responses Enabled' : 'Voice Muted'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub Navigation: Chat vs Dropped Requests */}
          <div className="flex border-b border-slate-100 bg-slate-50 px-3 pt-2 text-xs font-jost font-semibold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Interactive Chat & Speech</span>
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'requests'
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dropped Requests ({droppedRequests.length})</span>
            </button>
          </div>

          {/* Body Content */}
          {activeTab === 'chat' ? (
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50/50">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-start space-x-2 max-w-[85%]">
                      {msg.sender === 'bot' && (
                        <div className="w-7 h-7 rounded-lg bg-theme-navy text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4 text-theme-coral" />
                        </div>
                      )}
                      <div>
                        <div
                          className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-theme-primary text-white rounded-tr-xs shadow-xs'
                              : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>
                        </div>
                        <div className="flex items-center justify-between mt-1 px-1 text-[10px] text-slate-400">
                          <span>{msg.time}</span>
                          {msg.sender === 'bot' && (
                            <button
                              onClick={() => speakText(msg.text.replace(/[*#]/g, ''))}
                              className="hover:text-theme-primary transition-colors flex items-center gap-0.5"
                              title="Listen to native voice"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Listen</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick suggestion pills */}
                    {msg.quickSuggestions && (
                      <div className="mt-2 space-y-1.5 pl-9 w-full">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Suggested Requests:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.quickSuggestions.map((sug, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(sug)}
                              className="text-[11px] px-2.5 py-1 bg-white hover:bg-theme-primary hover:text-white text-slate-700 rounded-full border border-slate-200 shadow-xs transition-colors text-left"
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isListening && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 animate-pulse">
                    <Mic className="w-4 h-4 text-red-600 animate-bounce" />
                    <span>Listening to your speech... Speak clearly in English!</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center space-x-2"
                >
                  <button
                    type="button"
                    onClick={toggleMic}
                    className={`p-2.5 rounded-xl transition-all ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                    title={isListening ? 'Stop Listening' : 'Speak verbally'}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or speak a request..."
                    className="flex-1 py-2 px-3.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className={`p-2.5 rounded-xl transition-colors ${
                      inputText.trim()
                        ? 'bg-theme-primary hover:bg-theme-navy text-white shadow-md shadow-theme-primary/20'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 px-1">
                  <span>💡 Tip: Click mic to speak your request verbally</span>
                  <span>AI Powered LMS</span>
                </div>
              </div>
            </div>
          ) : (
            /* Dropped Requests List Tab */
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 font-jost">
                    Your Active Learning Requests
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Requests submitted via voice or text are tracked here
                  </p>
                </div>
                <span className="text-xs bg-theme-primary/10 text-theme-primary font-bold px-2 py-0.5 rounded-full">
                  {droppedRequests.length} Total
                </span>
              </div>

              {droppedRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400">{req.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        req.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'Resolved'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <h5 className="font-bold text-xs text-theme-navy leading-snug">
                    {req.title}
                  </h5>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{req.tutor}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{req.time}</span>
                    </div>
                  </div>

                  {req.note && (
                    <div className="bg-slate-50 p-2 rounded-lg text-[11px] text-slate-600">
                      {req.note}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => {
                  setActiveTab('chat');
                  setInputText('I would like to request a new 1-on-1 session with a tutor');
                }}
                className="w-full py-2.5 bg-theme-primary hover:bg-theme-navy text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>+ Drop New Verbal or Text Request</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
