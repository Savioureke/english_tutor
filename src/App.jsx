import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PortalProvider } from './context/PortalContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import AuthModal from './components/auth/AuthModal';
import InquiryModal from './components/common/InquiryModal';
import EnglishChatbot from './components/common/EnglishChatbot';

// Pages
import Home from './pages/Home';
import HomeTwo from './pages/HomeTwo';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Instructors from './pages/Instructors';
import InstructorDetails from './pages/InstructorDetails';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Dashboard from './pages/dashboard/Dashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';

export default function App() {
  return (
    <PortalProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home-2" element={<HomeTwo />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/instructor/:id" element={<InstructorDetails />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Authentication & LMS Dashboard routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                
                {/* Backward-compatible dashboard aliases */}
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
                <Route path="/student-dashboard" element={<Navigate to="/dashboard" replace />} />
                <Route path="/teacher-dashboard" element={<Navigate to="/dashboard" replace />} />

                {/* Redirect any unknown routes to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Global Auth Modal, Student Inquiry Modal & AI Chatbot */}
            <AuthModal />
            <InquiryModal />
            <EnglishChatbot />
          </div>
        </Router>
      </AuthProvider>
    </PortalProvider>
  );
}
